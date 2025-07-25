// src/services/InstructionService.ts

import {
    _buildStakeSolToJitoIxs,
    _buildOpenVaultIxs,
    _buildDepositIxs,
    _buildWithdrawIxs,
    _buildMintIxs,
    _buildBurnIxs,
    _buildLiquidateIxs,
} from '../instructions';

import type { 
    TransactionInstruction, 
    Signer 
} from '@solana/web3.js';

import type { 
    BN
} from '@coral-xyz/anchor';

import CyberGoldSDK from '../CyberGoldSDK';

/**
 * Wraps all of the SDK’s instruction-builder free functions
 * so that callers only ever need one shared service.
 */
export class InstructionService {
    // simply re-export each builder:
    public buildDepositIxs        = _buildDepositIxs;
    public buildOpenVaultIxs      = _buildOpenVaultIxs;
    public buildStakeSolToJitoIxs = _buildStakeSolToJitoIxs;
    public buildWithdrawIxs       = _buildWithdrawIxs;
    public buildMintIxs           = _buildMintIxs;
    public buildBurnIxs           = _buildBurnIxs;
    public buildLiquidateIxs      = _buildLiquidateIxs;

    public async buildStakeSolToExactJitoIxs(
        sdk: CyberGoldSDK,
        targetLst: BN
    ): Promise<{ instructions: TransactionInstruction[]; signers: Signer[] }> {
        // compute required SOL in lamports
        const requiredLamports = await sdk.convertLstToSol(BigInt(targetLst.toString()));
        // build the standard stakeSol flow with that exact amount
        return this.buildStakeSolToJitoIxs(sdk, Number(requiredLamports));
    }
    
}