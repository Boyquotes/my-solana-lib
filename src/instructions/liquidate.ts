// src/instructions/liquidate.ts

import {
    PublicKey,
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

export async function _buildLiquidateIxs(
    sdk:    CyberGoldSDK,
    amount: BN,
    vault:  PublicKey,
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
    const refPriceUpdate            = await sdk.getRefPriceFeedAddr();
    const collatPriceUpdate         = await sdk.getCollatPriceFeedAddr();
    const collatTokenProgram        = sdk.collatTokenProgramAddr;
    const synthTokenProgram         = sdk.synthTokenProgramAddr;
    const signerCollatTokenAccount  = sdk.getCollatATA(signer);
    const signerSynthTokenAccount   = sdk.getSynthATA(signer);
    const poolCollatAta             = sdk.getCollatATA(poolState);
    const stakePool                 = await sdk.getStakePoolAddr();
    const rewardVault               = sdk.getCollatATA(poolParams);
    const admin                     = sdk.adminAddr;
    const associatedTokenProgram    = ASSOCIATED_TOKEN_PROGRAM_ID;
    const systemProgram             = SystemProgram.programId;
    const rent                      = SYSVAR_RENT_PUBKEY;

    // 3) Build the withdraw instruction
    const ix = await program.methods
        .liquidate(amount)
        .accountsStrict({
            // top‐level accounts
            vault,
            synthMint,
            admin,
            collatMint,
            poolParams,
            signer,
            refPriceUpdate,
            collatPriceUpdate,
            signerSynthTokenAccount,
            signerCollatTokenAccount,
            collatTokenProgram,
            synthTokenProgram,
            associatedTokenProgram,
            systemProgram,
            rent,

            rewardExtractorCtx: {
                poolState,      // Mutable
                poolParams,     
                stakePool,      
                poolCollatAta,  // Mutable
                rewardVault,     // Mutable
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
