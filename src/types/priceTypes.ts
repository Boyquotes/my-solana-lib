// src/types/priceTypes.ts

import type BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';

// SDK price data structures
// --------------------------------------

export interface PriceData {
    mantissa: bigint;
    conf:     bigint;
    expo:     number;
}


// Pyth on-chain PriceUpdateV2 structures
// --------------------------------------

export interface PriceFeedMessage {
  feedId: number[];
  price: BN;
  conf: BN;
  exponent: number;
  publishTime: BN;
}

// Anchor maps Rust enums → JS as discriminated objects
export type VerificationLevel =
  | { full: {} }
  | { partial: { numSignatures: number } };


export interface PriceUpdateV2 {
  writeAuthority: PublicKey;
  /** Discriminated object for the enum variants */
  verificationLevel: VerificationLevel;
  priceMessage: PriceFeedMessage;
  postedSlot: BN;
}
