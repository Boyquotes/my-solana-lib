// src/instructions/openVault.ts

import {
  TransactionInstruction,
  Signer,
} from '@solana/web3.js';

import CyberGoldSDK from '../CyberGoldSDK';

/**
 * Build the `openVault` instruction using the SDK’s already-initialized Anchor Program.
 *
 * @param sdk             your SDK instance, which holds `._program` and all PDA getters
 * @param maxExposurePct  optional exposure (as bigint), or undefined for default
 */
export async function _buildOpenVaultIxs(
  sdk:            CyberGoldSDK,
  maxExposurePct: number = 300, // default to 300% exposure
): Promise<{
  instructions: TransactionInstruction[];
  signers: Signer[];
}> {
  const program = sdk.program;

  // Get the signer publicKey if provided
  const maybePk = sdk.provider.wallet.publicKey;
  if (!maybePk) {
    throw new Error('Wallet not connected – publicKey is null');
  }
  const signer = maybePk;  // now typed as PublicKey

  const ix = await program.methods
    .openVault(maxExposurePct)
    .accounts({
      signer:     signer,
      collatMint: sdk.collatMintAddr,
      synthMint:  sdk.synthMintAddr,
    })
    .instruction();

    return {
      instructions: [ix],
      signers: [],      // no extra keypairs needed
    };
  
}