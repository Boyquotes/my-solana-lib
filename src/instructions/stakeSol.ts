// stakeSolToJito.ts

import {
  getStakePoolAccount, 
  updateStakePool,
  depositSol,
} from '@solana/spl-stake-pool';

import {
  TransactionInstruction,
  Signer,
} from '@solana/web3.js';

import CyberGoldSDK from '../CyberGoldSDK';


/**
 * Build and return the TransactionInstruction to deposit SOL
 * into Jito’s stake pool in exchange for jitoSOL.
 */
export async function _buildStakeSolToJitoIxs(
  sdk: CyberGoldSDK,
  amountLamports: number,
): Promise<{
  instructions: TransactionInstruction[];
  signers: Signer[];
}> {


  const stakePoolAddress = await sdk.getStakePoolAddr();
    
  // 1) Load the stake pool account data
  const stakePoolAccount = await getStakePoolAccount(
      sdk.connection,
      stakePoolAddress
  );

  // 2) Generate both sets of update instructions
  const { updateListInstructions, finalInstructions } = await updateStakePool(
      sdk.connection,
      stakePoolAccount,
      /* noMerge = */ false
  );

  // Get the signer publicKey if provided
  const maybePk = sdk.provider.wallet.publicKey;
  if (!maybePk) {
    throw new Error('Wallet not connected – publicKey is null');
  }
  const signer = maybePk;  // now typed as PublicKey

  // Construct the deposit instruction
  const { instructions: depositInstructions, signers } = await depositSol(
    sdk.connection,                     // RPC connection
    stakePoolAddress,                   // stake pool address
    signer,                             // source SOL owner
    amountLamports,                     // amount to deposit
    // userJitoAta.address,             // destination jitoSOL ATA
    // undefined,                       // no referral account
    // payer.publicKey                  // deposit authority
  );

  // 4) Return flat instructions + empty signers
  return {
    instructions: [
        ...updateListInstructions,
        ...finalInstructions,
        ...depositInstructions,          // the deposit instruction
    ],
    signers: signers,
  };

}
