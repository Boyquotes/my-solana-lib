// src/services/stakePoolService.ts
import { Connection, PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import type { PoolParams, StakePoolData } from '../types';
import { debugLog } from '../config/logging';

/**
 * Service to derive and fetch on-chain Stake Pool data (e.g. Jito/LST stake pool).
 */
export class StakePoolService {
  private _stakePoolAddr?: PublicKey;
  private _stakePoolData?: StakePoolData;

  constructor(
    private readonly connection: Connection,
    private readonly getPoolParams: () => Promise<PoolParams>,
  ) {}

  /**
   * Derive & cache the PDA for the Jito/LST stake pool based on PoolParams.lstStakePool.
   */
  public async getStakePoolAddr(): Promise<PublicKey> {
    if (!this._stakePoolAddr) {
      const params = await this.getPoolParams();
      this._stakePoolAddr = new PublicKey(params.lstStakePool);
      debugLog('STAKEPOOL', 'Derived LST StakePool address:', this._stakePoolAddr.toBase58());
    }
    return this._stakePoolAddr;
  }

  /**
   * Fetch & cache the on-chain StakePool account’s total lamports and pool-token supply.
   */
  public async readStakePoolState(): Promise<StakePoolData> {
    if (this._stakePoolData) {
      return this._stakePoolData;
    }

    // 1) Ensure PDA is derived
    const stakePoolAddr = await this.getStakePoolAddr();

    // 2) Fetch raw account data
    const info = await this.connection.getAccountInfo(stakePoolAddr);
    if (!info) {
      throw new Error(`StakePool account not found: ${stakePoolAddr.toBase58()}`);
    }
    const data = info.data;

    // 3) Parse u64 fields at known offsets
    //    Per spl_stake_pool::state::StakePool:
    //    total_lamports at byte 258, pool_token_supply at byte 266
    const totalLamports   = data.readBigUInt64LE(258);
    const poolTokenSupply = data.readBigUInt64LE(266);

    // 4) Cache and return
    this._stakePoolData = {
      totalLamports:   new BN(totalLamports.toString()),
      poolTokenSupply: new BN(poolTokenSupply.toString()),
    };
    debugLog('STAKEPOOL', 'Fetched stake-pool data:', this._stakePoolData);
    return this._stakePoolData;
  }
}
