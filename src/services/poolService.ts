// src/services/poolService.ts
import { PublicKey, Connection } from '@solana/web3.js';
import type { Program, BN } from '@coral-xyz/anchor';
import type { PoolState, PoolParams, PoolMetrics, PriceData } from '../types';
import { debugLog, errorLog } from '../config/logging';
import type { Cybergold } from '../types/idl/cybergold';
import type { AccountService } from './accountService';

// require the wasm glue-code
import * as wasm from '../../wasm/pkg/cybergold_wasm.js';
import { CybergoldWasmInitializer } from '../index';

/**
 * Service to derive and fetch on-chain PoolState and PoolParams data.
 */
export class PoolService {
  private _poolStateData?: PoolState;
  private _poolParamsData?: PoolParams;
  private _poolMetricsCache?: PoolMetrics;

  constructor(
    private readonly program: Program<Cybergold>,
    private readonly connection: Connection,
    private readonly accountService: AccountService,
    private readonly readStakePoolState: () => Promise<{ totalLamports: BN; poolTokenSupply: BN }>,
    private readonly getPriceData:       () => Promise<PriceData>,
  ) {}

  /**
   * Derive & cache the PDA for PoolState based on synth and collateral mints.
   * TODO: use the accountService function
   */
  public getPoolStateAddr(): PublicKey {
    return this.accountService.getPoolStatePda();
  }

  /**
    * Get the cached-or-derived PoolParams PDA via AccountService
    */
  public getPoolParamsAddr(): PublicKey {
    return this.accountService.getPoolParamsPda();
  }


  /**
   * Fetch & cache decoded PoolState account using Anchor.
   */
  public async readPoolState(): Promise<PoolState> {
    if (this._poolStateData) return this._poolStateData;
    try {
      const addr = this.getPoolStateAddr();
      debugLog('POOL', 'Fetching raw PoolState account at', addr.toBase58());
      const account = await this.program.account.poolState.fetch(addr);
      debugLog('POOL', 'Decoded PoolState:', account);
      this._poolStateData = account as PoolState;
      return this._poolStateData;
    } catch (err: any) {
      errorLog('POOL', 'readPoolState error:', err);
      throw err;
    }
  }


  /**
   * Fetch & cache decoded PoolParams account using Anchor.
   */
  public async readPoolParams(): Promise<PoolParams> {
    if (this._poolParamsData) return this._poolParamsData;
    try {
      const addr = this.getPoolParamsAddr();
      debugLog('POOL', 'Fetching raw PoolParams account at', addr.toBase58());
      const account = await this.program.account.poolParams.fetch(addr);
      debugLog('POOL', 'Decoded PoolParams:', account);
      this._poolParamsData = account as PoolParams;
      return this._poolParamsData;
    } catch (err: any) {
      errorLog('POOL', 'readPoolParams error:', err);
      throw err;
    }
  }

   /**
   * Compute & cache a full suite of pool-level metrics:
   * { assets, liabilities, equity, backingCapacity, backableSynth, mintableSynth,
   * utilizationRatio, freeCollateral, stakingRewards, pnlAccum }
   */
   public async getPoolMetrics(): Promise<PoolMetrics> {
    if (this._poolMetricsCache) {
      return this._poolMetricsCache;
    }

    // fetch all inputs
    const priceData      = await this.getPriceData();
    const poolState      = await this.readPoolState();
    const poolParams     = await this.readPoolParams();
    const stakeData      = await this.readStakePoolState();

    // collateral ATA for pool
    const poolStateAddr = this.getPoolStateAddr();
    const poolCollatAta = this.accountService.getCollatATA(poolStateAddr);

    const ataBalance = await this.connection.getTokenAccountBalance(poolCollatAta);
    const poolCollatAmount = BigInt(ataBalance.value.amount);

    // unwrap to BigInt
    const supplyBI      = BigInt(poolState.supply.toString());
    const sharesBI      = BigInt(poolState.shares.toString());
    const maxExpFp9BI   = BigInt(poolState.maxExposurePctFp9.toString());
    const eqRealizedBI  = BigInt(poolState.totalRealizedEquity.toString());
    const lstSupplyBI   = BigInt(poolState.lstSupply.toString());
    const stakeLamBI    = BigInt(stakeData.totalLamports.toString());
    const stakeSupBI    = BigInt(stakeData.poolTokenSupply.toString());

    // Ensure WASM is initialized before using WASM functions
    await CybergoldWasmInitializer.getInstance().ensureInitialized();
    
    // core computations
    const liabilities     = wasm.compute_pool_liabilities(supplyBI, priceData.mantissa, priceData.conf, priceData.expo);
    const equity          = wasm.compute_pool_equity(poolCollatAmount, liabilities);
    const backingCapacity = wasm.compute_pool_backing_capacity(equity, maxExpFp9BI);
    const backableSynth   = wasm.compute_pool_backable_synth(backingCapacity, priceData.mantissa, priceData.conf, priceData.expo);
    const mintableSynth   = wasm.compute_pool_mintable_synth(supplyBI, backableSynth);
    const utilizationRatio= wasm.compute_pool_ur(backingCapacity, liabilities);
    const freeCollateral  = wasm.compute_pool_free_collat(poolCollatAmount, maxExpFp9BI, liabilities);
    const stakingRewards  = wasm.compute_staking_rewards(lstSupplyBI, stakeLamBI, poolCollatAmount, stakeLamBI, stakeSupBI);
    const pnlAccum        = wasm.compute_pnl_accum(eqRealizedBI, sharesBI, equity);

    const metrics: PoolMetrics = { assets: poolCollatAmount,
      liabilities, equity, backingCapacity, backableSynth,
      mintableSynth, utilizationRatio, freeCollateral,
      stakingRewards, pnlAccum };

    this._poolMetricsCache = metrics;
    debugLog('POOL', 'Computed PoolMetrics:', metrics);
    return metrics;
  }


}
