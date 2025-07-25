// src/instructions/deposit.ts

import {
    TransactionInstruction,
    Signer,
} from '@solana/web3.js';

import { 
    BN,
} from '@coral-xyz/anchor';

import CyberGoldSDK from '../CyberGoldSDK';


export async function _buildDepositIxs(
    sdk:        CyberGoldSDK,
    amount:     BN,
): Promise<{
  instructions: TransactionInstruction[];
  signers:      Signer[];
}> {

    // Get the signer publicKey if provided
    const maybePk = sdk.provider.wallet.publicKey;
    if (!maybePk) {
        throw new Error('Wallet not connected – publicKey is null');
    }
    const signer = maybePk;

    // Get all accounts addresses
    const program                   = sdk.program;
    const synthMint                 = sdk.synthMintAddr;
    const collatMint                = sdk.collatMintAddr;
    const poolParams                = sdk.poolParamsAddr;
    const poolState                 = sdk.poolStateAddr;
    const vaultPDA                  = sdk.getUserVaultAddr(signer);
    const refPriceUpdate            = await sdk.getRefPriceFeedAddr();
    const collatPriceUpdate         = await sdk.getCollatPriceFeedAddr();
    const collatTokenProgram        = sdk.collatTokenProgramAddr;
    const signerCollatTokenAccount  = sdk.getCollatATA(signer);
    const poolCollatAta             = sdk.getCollatATA(poolState);
    const stakePool                 = await sdk.getStakePoolAddr();
    const rewardVault               = sdk.getCollatATA(poolParams);


    // Build the transaction instruction with shared accounts.
    const ix = await program.methods
        .deposit(amount)
        .accountsStrict({
            signer:                     signer,                             //  1.
            collatMint:                 collatMint,                         //  2.
            synthMint:                  synthMint,                          //  3.
            vault:                      vaultPDA,                           //  4.
            poolParams:                 poolParams,                         //  5.
            signerCollatTokenAccount:   signerCollatTokenAccount,           //  6.
            refPriceUpdate:             refPriceUpdate,                     //  7.
            collatPriceUpdate:          collatPriceUpdate,                  //  8.
            collatTokenProgram:         collatTokenProgram,                 //  9.
            stakePool:                  stakePool,                          // 10.

            rewardExtractorCtx: {
                poolState:            poolState,            // PDA for PoolState
                poolParams:           poolParams,           // same as pool_params
                stakePool:            stakePool,            // same as Jito stake‐pool
                poolCollatAta:        poolCollatAta,        // your ATA for LST collateral
                rewardVault:          rewardVault,          // your ATA for rewards
                collatTokenProgram:   collatTokenProgram,   // TOKEN_PROGRAM_ID
                collatMint:           collatMint,           // same as collat_mint
                synthMint:            synthMint,            // same as synth_mint
            },

            poolMetricsCtx: {
                poolCollatAta:              poolCollatAta,             //  8.
                collatTokenProgram:         collatTokenProgram,        // 11.
                readPriceCtx: {
                    poolState:          poolState,          // PDA for PoolState
                    poolParams:         poolParams,         // PDA for PoolParams
                    collatMint:         collatMint,         // same as collat_mint
                    synthMint:          synthMint,          // same as synth_mint
                    refPriceUpdate:     refPriceUpdate,     // same as ref_price_update
                    collatPriceUpdate:  collatPriceUpdate,  // same as collat_price_update
                    stakePool:          stakePool,          // same as Jito stake‐pool
                },
            },

        })
        .instruction();
    
    return {
        instructions: [ix],
        signers: [],      // no extra keypairs needed
    };

}