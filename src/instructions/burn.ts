// src/instructions/burn.ts

import {
    TransactionInstruction,
    Signer,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';

import CyberGoldSDK from '../CyberGoldSDK';


export async function _buildBurnIxs(
    sdk: CyberGoldSDK,
    synthAmount: BN,
): Promise<{
    instructions: TransactionInstruction[];
    signers: Signer[];
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
    const signerCollatAta           = sdk.getCollatATA(signer);
    const signerSynthTokenAccount   = sdk.getSynthATA(signer);
    const collatTokenProgram        = sdk.collatTokenProgramAddr;
    const synthTokenProgram         = sdk.synthTokenProgramAddr;
    const stakePool                 = await sdk.getStakePoolAddr();
    const rewardVault               = sdk.getCollatATA(poolParams);
    const poolCollatAta             = sdk.getCollatATA(poolState);
    const admin                     = sdk.adminAddr;
    const associatedTokenProgram    = ASSOCIATED_TOKEN_PROGRAM_ID;
    const systemProgram             = SystemProgram.programId;
    const rent                      = SYSVAR_RENT_PUBKEY;

    // 3) Build the Burn instruction
    const ix = await program.methods
        .burn(synthAmount)
        .accountsStrict({
            refPriceUpdate,
            collatPriceUpdate,
            poolParams,
            signer,
            signerCollatAta,
            collatMint,
            signerSynthTokenAccount,
            synthMint,
            admin,
            collatTokenProgram,
            synthTokenProgram,
            associatedTokenProgram,
            systemProgram,
            rent,

            rewardExtractorCtx: {
                poolState,          // Mutable
                poolParams,     
                stakePool,      
                poolCollatAta,      // Mutable
                rewardVault,        // Mutable
                collatTokenProgram,
                collatMint,
                synthMint,
            },

            poolMetricsCtx: {
                poolCollatAta,             //  8.
                collatTokenProgram,        // 11.
                readPriceCtx: {
                    poolState,          // PDA for PoolState
                    poolParams,         // PDA for PoolParams
                    collatMint,         // same as collat_mint
                    synthMint,          // same as synth_mint
                    refPriceUpdate,     // same as ref_price_update
                    collatPriceUpdate,  // same as collat_price_update
                    stakePool,          // same as Jito stake‐pool
                },
            },
        })
    .instruction();

    return {
        instructions: [ix],
        signers:      [],  // no extra Keypairs needed
    };
}
