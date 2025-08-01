// src/types/eventTypes.ts

import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';

/**
 * Mirrors the `#[event] pub struct CollateralDeposited { ... }` in your IDL
 */
export interface CollateralDeposited {
    /** the vault PDA that got collateral */
    vault: PublicKey;
    /** the user who owns the vault */
    owner: PublicKey;
    /** how much collateral was deposited (u64) */
    amount: BN;
}


/**
 * Emitted by the program whenever collateral is withdrawn from a vault.
 */
export interface CollateralWithdrawn {
    /** the vault PDA from which collateral was withdrawn */
    vault: PublicKey;
    /** the user who owns that vault */
    owner: PublicKey;
    /** how much collateral was withdrawn (u64) */
    amount: BN;
    /** how many shares were burned/withdrawn (u128) */
    shares: BN;
}

/**
 * Fired whenever your program emits `PurchaseExecuted`.
 */
export interface PurchaseExecuted {
    /** the user who paid collateral and received synths */
    signer: PublicKey;
    /** how many synth tokens were purchased (u64) */
    synthAmount: BN;
    /** how much collateral was spent (u64) */
    collatAmount: BN;
  }

  export interface RedeemExecuted {
    /** the user who redeemed synth and received collateral */
    signer: PublicKey;
    /** how many synth tokens were redeemed (u64) */
    synthAmount: BN;
    /** how much collateral was send back (u64) */
    collatAmount: BN;
  }

  export interface LiquidationTriggered {
    pool:               PublicKey;
    liquidator:         PublicKey;
    synthAmount:        BN;
    fairCollatAmount:   BN;
    rewardCollaAmount:  BN;
  }
