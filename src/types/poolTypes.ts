// src/types/poolTypes.ts

import type BN from 'bn.js';


// Mirror of on-chain PoolState (from your IDL)
// export interface PoolState { [field: string]: any; }
export interface PoolState {
  // version byte
  version: number;
  // total shares (u128)
  shares: BN;
  // total synth supply (u64)
  supply: BN;
  // total realized equity (u64)
  totalRealizedEquity: BN;
  // max exposure percent (fixed-point, 9 decimals)
  maxExposurePctFp9: BN;
  // liquid-staking token supply (u64)
  lstSupply: BN;
  // stake-pool lamports (u64)
  stakePoolLamports: BN;
}


export interface PoolParams {
  // automatically inferred from IDL
  [field: string]: any;
}


export interface StakePoolData {
  totalLamports: BN;
  poolTokenSupply: BN;
}

export interface PoolMetrics {
  assets: bigint;
  liabilities: bigint;
  equity: bigint;
  backingCapacity: bigint;
  backableSynth: bigint;
  mintableSynth: bigint;
  utilizationRatio: bigint;
  freeCollateral: bigint;
  stakingRewards: bigint;
  pnlAccum: bigint;
}

