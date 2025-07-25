// src/instructions/withdraw.ts

import {
    TransactionInstruction,
    Signer,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
  
import {
    BN,
} from '@coral-xyz/anchor';

import { 
    ASSOCIATED_TOKEN_PROGRAM_ID 
} from "@solana/spl-token";

  
import CyberGoldSDK from '../CyberGoldSDK';
  
  
export async function _buildWithdrawIxs(
    sdk:    CyberGoldSDK,
    amount: BN,
): Promise<{
    instructions: TransactionInstruction[];
    signers:      Signer[];
}> {
    // 1) Grab signer pubkey
    const maybePk = sdk.provider.wallet.publicKey;
    if (!maybePk) {
        throw new Error('Wallet not connected – publicKey is null');
    }
    const signer = maybePk;
  
    // 2) Fetch all the accounts via SDK getters
    const program                   = sdk.program;
    const synthMint                 = sdk.synthMintAddr;
    const collatMint                = sdk.collatMintAddr;
    const poolParams                = sdk.poolParamsAddr;
    const poolState                 = sdk.poolStateAddr;
    const vault                     = sdk.getUserVaultAddr(signer);
    const refPriceUpdate            = await sdk.getRefPriceFeedAddr();
    const collatPriceUpdate         = await sdk.getCollatPriceFeedAddr();
    const collatTokenProgram        = sdk.collatTokenProgramAddr;
    const signerCollatTokenAccount  = sdk.getCollatATA(signer);
    const poolCollatAta             = sdk.getCollatATA(poolState);
    const stakePool                 = await sdk.getStakePoolAddr();
    const rewardVault               = sdk.getCollatATA(poolParams);

  
    // 3) Build the withdraw instruction
    const ix = await program.methods
        .withdraw(amount)
        .accountsStrict({
            // top‐level accounts
            synthMint,
            collatMint,
            poolParams,
            signer,
            vault,
            refPriceUpdate,
            collatPriceUpdate,
            signerCollatTokenAccount,
            collatTokenProgram,
            associatedTokenProgram:     ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram:              SystemProgram.programId,
            rent:                       SYSVAR_RENT_PUBKEY,
            // Nested contexts mirror the IDL structure
            rewardExtractorCtx: {
            poolState,
            poolParams,
            stakePool,
            poolCollatAta,
            rewardVault,
            collatTokenProgram,
            collatMint,
            synthMint,
            },
            poolMetricsCtx: {
            poolCollatAta,
            collatTokenProgram,
            readPriceCtx: {
                poolState,
                poolParams,
                collatMint,
                synthMint,
                refPriceUpdate,
                collatPriceUpdate,
                stakePool,
            },
            },
        })
        .instruction();
  
    return {
        instructions: [ix],
        signers:      [],  // no extra Keypairs needed
    };
}