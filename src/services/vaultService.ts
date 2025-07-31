// src/services/VaultService.ts
import { 
  PublicKey, 
  Connection 
} from '@solana/web3.js';

import type { 
  Program 
} from '@coral-xyz/anchor';

import type { 
  Vault, 
  VaultMetrics, 
  PoolMetrics, 
  PoolState 
} from '../types';

import type { 
  AccountService
} from './accountService';

import { 
  debugLog, 
  errorLog 
} from '../config/logging';

import { 
  Cybergold 
} from '../types/idl/cybergold';

import * as wasm from '../../wasm/pkg/cybergold_wasm.js';


/**
 * Service to manage Vault PDAs and on-chain Vault accounts.
 */
export class VaultService {
  private _vaultsData?: Map<PublicKey, Vault>;
  private _vaultsMetricsCache: Map<PublicKey, VaultMetrics> = new Map();

  constructor(
    private readonly program: Program<Cybergold>,
    private readonly connection: Connection,
    private readonly accountService: AccountService,
    private readonly getPoolMetrics: () => Promise<PoolMetrics>,
    private readonly readPoolState: () => Promise<PoolState>,
  ) {}

  /**
   * Derive the user's Vault PDA from their public key,
   * via the shared AccountService.
   */
  public getUserVaultAddr(userPubkey: PublicKey): PublicKey {
    const vaultAddr = this.accountService.getUserVaultPda(userPubkey);
    return vaultAddr;
  }

  /**
   * Scan and decode *all* Vault PDAs for this program.
   */
  public async getAllVaults(): Promise<Map<PublicKey, Vault>> {
    if (!this._vaultsData || this._vaultsData.size === 0) {
      // fetch all vault accounts via Anchor
      const rawAccounts = await (this.program as any).account.vault.all();
      this._vaultsData = new Map<PublicKey, Vault>();
      for (const { publicKey, account } of rawAccounts as { publicKey: PublicKey; account: Vault }[]) {
        this._vaultsData.set(publicKey, account);
      }
    }
    return this._vaultsData;
  }

  /**
   * Check whether a Vault account has been initialized on-chain.
   */
  public async isVaultInitialized(vaultAddr: PublicKey): Promise<boolean> {
    try {
      const info = await this.connection.getAccountInfo(vaultAddr);
      const exists = info !== null;
      debugLog('VAULT', `Vault ${vaultAddr.toBase58()} exists:`, exists);
      return exists;
    } catch (err: any) {
      errorLog('VAULT', 'Error checking vault initialization:', err);
      return false;
    }
  }

  /**
   * Fetch & decode the on-chain Vault account (caching if we already have it).
   */
  public async readVaultData(vaultAddr: PublicKey): Promise<Vault> {
    if (this._vaultsData?.has(vaultAddr)) {
      return this._vaultsData.get(vaultAddr)!;
    }
    const account = await this.program.account.vault.fetch(vaultAddr);
    return account as Vault;
  }


  /**
   * Compute & cache vault-level metrics for a given vault address.
   */
  public async getVaultMetrics(vaultAddr: PublicKey): Promise<VaultMetrics> {
    if (this._vaultsMetricsCache.has(vaultAddr)) {
      return this._vaultsMetricsCache.get(vaultAddr)!;
    }
    debugLog('METRICS', `Computing Metrics for Vault ${vaultAddr.toBase58()}...`);

    // 1) fetch raw vault data
    const vd = await this.readVaultData(vaultAddr);

    // 2) get pool metrics & state
    const poolM = await this.getPoolMetrics();
    const ps    = await this.readPoolState();

    // 3) unwrap to BigInt
    const vaultSharesBI        = BigInt(vd.shares.toString());
    const vaultEntryPnlAccumBI = BigInt(vd.entryPnlAccum.toString());
    const vaultEntryEquityBI   = BigInt(vd.entryEquity.toString());
    const poolSharesBI         = BigInt(ps.shares.toString());
    const poolLiabilitiesBI    = poolM.liabilities;
    const poolEquityBI         = poolM.equity;
    const poolFreeCollatBI     = poolM.freeCollateral;

    // a) compute PnL accumulator
    const pnlAccum = wasm.compute_pnl_accum(
      BigInt(ps.totalRealizedEquity.toString()),
      poolSharesBI,
      poolEquityBI,
    );

    // b) vault PnL since entry
    const vaultPnl = wasm.compute_vault_pnl(
      vaultSharesBI,
      vaultEntryPnlAccumBI,
      pnlAccum,
    );

    // c) vault equity
    const vaultEquity = wasm.compute_vault_equity(
      vaultEntryEquityBI,
      vaultPnl,
    );

    // d) collateral ratio
    let collateralRatio: bigint | undefined;
    try {
      collateralRatio = wasm.compute_vault_cr(
        vaultSharesBI,
        poolSharesBI,
        poolLiabilitiesBI,
        vaultEquity,
      );
    } catch (err: any) {
      errorLog('METRICS', 'Error computing collateral ratio:', err);
      collateralRatio = undefined;
    }

    // e) withdrawable collateral
    const withdrawableCollateral = wasm.compute_vault_withdrawable_collat(
      poolFreeCollatBI,
      vaultEquity,
    );

    // 4) assemble & cache
    const metrics: VaultMetrics = {
      withdrawableCollateral,
      collateralRatio,
      pnl: vaultPnl,
      equity: vaultEquity,
    };
    this._vaultsMetricsCache.set(vaultAddr, metrics);
    debugLog('METRICS', 'Computed Vault Metrics:', metrics);
    return metrics;
  }

    /**
     * Clears both the raw vault data and its metrics from cache for a single vault.
     */
    public invalidateVaultCache(vaultAddr: PublicKey): void {
        // raw vault cache
        this._vaultsData?.delete(vaultAddr);
        // metrics cache
        this._vaultsMetricsCache.delete(vaultAddr);
        debugLog('VAULT', `Invalidated cache for vault ${vaultAddr.toBase58()}`);
    }

}
