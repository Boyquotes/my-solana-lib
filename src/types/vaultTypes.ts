// src/types/vaultTypes.ts

export interface Vault {
  // automatically inferred from IDL
  [field: string]: any;
}

export interface VaultMetrics {
  // how much collateral the vault can withdraw, given current pool excess
  withdrawableCollateral: bigint;
  // vault’s collateralization ratio (fixed-point FP?): vault_cr
  collateralRatio?: bigint;
  // vault’s own PnL since entry
  pnl: bigint;
  // vault’s own equity = entry_equity + pnl
  equity: bigint;
}