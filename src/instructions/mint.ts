// src/instructions/mint.ts

import {
    TransactionInstruction,
    Signer,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';

import CyberGoldSDK from '../CyberGoldSDK';

export async function _buildMintIxs(
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
    const signerCollatTokenAccount  = sdk.getCollatATA(signer);
    const signerSynthAta            = sdk.getSynthATA(signer);
    const collatTokenProgram        = sdk.collatTokenProgramAddr;
    const synthTokenProgram         = sdk.synthTokenProgramAddr;
    const stakePool                 = await sdk.getStakePoolAddr();
    const rewardVault               = sdk.getCollatATA(poolParams);
    const poolCollatAta             = sdk.getCollatATA(poolState);
    const admin                     = sdk.adminAddr;
    const associatedTokenProgram    = ASSOCIATED_TOKEN_PROGRAM_ID;
    const systemProgram             = SystemProgram.programId;
    const rent                      = SYSVAR_RENT_PUBKEY;

    // 3) Build the mint instruction
    const ix = await program.methods
        .mint(synthAmount)
        .accountsStrict({
            // top‐level accounts
            refPriceUpdate,
            collatPriceUpdate,
            poolParams,
            signer,
            signerCollatTokenAccount,
            signerSynthAta,
            collatMint,
            synthMint,
            admin,
            collatTokenProgram,
            synthTokenProgram,
            associatedTokenProgram,
            systemProgram,
            rent,

            // Nested “rewardExtractorCtx”
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

            // Nested “poolMetricsCtx”
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
