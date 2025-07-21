import { Connection }                   from '@solana/web3.js';
import type { AnchorProvider }          from '@coral-xyz/anchor';
import type { BaseSignerWalletAdapter } from '@solana/wallet-adapter-base';
import type { Wallet as AnchorWallet }  from '@coral-xyz/anchor';


export * from './eventTypes';
export * from './priceTypes';
export * from './vaultTypes';
export * from './poolTypes';


export interface CyberGoldSdkOptions {
  /** for Anchor-based apps */
  provider?: AnchorProvider;
  /** raw-web3 users must pass a wallet that can really sign TXs */
  rawProvider?: {
    connection: Connection;
    wallet: SigningWallet;
  };
  rpcUrl?: string;
  programId?: string;
}

// A wallet that *can* sign transactions is either:
//  • a BaseSignerWalletAdapter (Phantom, Solflare, Backpack, etc.), or
//  • an AnchorWallet (NodeWallet)
export type SigningWallet = BaseSignerWalletAdapter | AnchorWallet;

export type AnyProvider =
  | AnchorProvider
  | { connection: Connection; wallet: SigningWallet };
