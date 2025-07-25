// src/services/TransactionService.ts
import {
    Transaction,
    TransactionInstruction,
    TransactionSignature,
    PublicKey,
    Keypair,
    Signer,
} from '@solana/web3.js';

import      { AnchorProvider, BN }  from '@coral-xyz/anchor';
import type { SigningWallet }       from '../types';
import CyberGoldSDK                 from 'CyberGoldSDK';

/**
 * Encapsulates transaction preparation and sending logic.
 */
export class TransactionService {
    constructor(
        private readonly sdk:  CyberGoldSDK,
    ) {}


    public async prepare(
        ixs: TransactionInstruction[],
        feePayer: PublicKey,
        extraSigners: Keypair[] = []
    ): Promise<{ tx: Transaction; signers: Keypair[] }> {
        const tx = new Transaction().add(...ixs);
        tx.feePayer = feePayer;

        const { blockhash, lastValidBlockHeight } =
        await this.sdk.connection.getLatestBlockhash('confirmed');
        tx.recentBlockhash = blockhash;

        return { tx, signers: extraSigners };
    }

    /**
     * Send a prepared Transaction using the SDK's provider
     */
    public async send(
        tx: Transaction,
        signers: Keypair[] = []
    ): Promise<TransactionSignature> {
        // ── Raw web3.js + SigningWallet path ──
        if (
            'wallet' in this.sdk.provider &&
            // narrow on the *property* rather than the interface
            typeof (this.sdk.provider.wallet as any).signTransaction === 'function'
        ) {
            const { connection } = this.sdk.provider;
            // now TS still thinks wallet is unknown, so cast:
            const wallet = this.sdk.provider.wallet as SigningWallet;
        
            // 1) have the wallet sign
            const signedTx = await wallet.signTransaction(tx);
        
            // 2) any extra Keypair signers?
            if (signers.length > 0 && 'partialSign' in signedTx) {
                signedTx.partialSign(...signers);
            }
        
            // 3) send + confirm
            const raw = signedTx.serialize();
            const sig = await connection.sendRawTransaction(raw);
        
            const { blockhash, lastValidBlockHeight } =
                await connection.getLatestBlockhash('confirmed');
            await connection.confirmTransaction(
                { signature: sig, blockhash, lastValidBlockHeight },
                'confirmed'
            );
            // this.emitter?.emit('transactionSent', signature);
            return sig;
        }
    
        // ── AnchorProvider path ──
        // .sendAndConfirm() will use anchorProvider.wallet.payer under the hood
        // this.emitter?.emit('transactionSent', signature);
        return await (this.sdk.provider as AnchorProvider).sendAndConfirm(tx, signers);
    }


    public async depositFromSol(
        lamports:   bigint,
    ): Promise<TransactionSignature> {

        // A) Grab signer pubkey
        const maybePk = this.sdk.provider.wallet.publicKey;
        if (!maybePk) {
            throw new Error('Wallet not connected – publicKey is null');
        }
        const feePayer = maybePk;

        // B) Build the stake→jitoSOL instructions for exactly `targetLst` tokens:
        const { instructions: stakeIxs, signers: stakeSigners } =
        await this.sdk.buildStakeSolToJitoIxs(Number(lamports));
        
        // C) Conditionally build the openVault instruction (only if not yet initialized):
        const vaultPda = this.sdk.getUserVaultAddr(feePayer);
        const isInit = await this.sdk.isVaultInitialized(vaultPda);
        let openIxs: TransactionInstruction[] = [];
        let openSigners: Signer[] = [];
        if (!isInit) {
            const res = await this.sdk.buildOpenVaultIxs(/* maxExposurePct = */ 250);
            openIxs = res.instructions;
            openSigners = res.signers;
        }
    
        // D) Build the deposit-jitoSOL-into-vault instructions:
        const collatAmount = await this.sdk.convertSolToLst(lamports);
        const { instructions: depositIxs, signers: depositSigners } =
            await this.sdk.buildDepositIxs(new BN(collatAmount.toString()));
        
        // E) Bundle all instructions into one transaction:
        const allIxs = [
            ...stakeIxs,
            ...openIxs,
            ...depositIxs,
        ];
        const allSigners = [
            ...stakeSigners,
            ...openSigners,
            ...depositSigners,
        ].filter((s): s is Keypair => s instanceof Keypair);
        
        // F) Prepare & send the single “stake + open + deposit” tx:
        const { tx, signers } = await this.prepare(
            allIxs,
            feePayer,
            allSigners
        );

        return await this.send(tx, signers);
    }


    public async withdraw(
        lamports:   bigint,
    ): Promise<TransactionSignature> {

        // A) Grab signer pubkey
        const maybePk = this.sdk.provider.wallet.publicKey;
        if (!maybePk) {
            throw new Error('Wallet not connected – publicKey is null');
        }
        const feePayer = maybePk;

        // Build withdraw instruction
        const { instructions: withIxs } = await this.sdk.buildWithdrawIxs(new BN(lamports.toString()));
        const { tx: withTx, signers: withSigners } = 
            await this.prepare(
                withIxs,
                feePayer,
                [] // withdraw doesn't need extra keypairs
            );

        // Send the withdraw transaction
        return await this.send(withTx, withSigners);
    }

    public async mintFromSol(
        synthAmount:   bigint,
    ): Promise<TransactionSignature> {

        // A) Grab signer pubkey
        const maybePk = this.sdk.provider.wallet.publicKey;
        if (!maybePk) {
            throw new Error('Wallet not connected – publicKey is null');
        }
        const feePayer = maybePk;

        // Compututing the exact amount of jitoSOL needed to mint the synth
        const collatAmount = await this.sdk.convertSynthToCollat(synthAmount);
    
        // B) Get instructions to stake SOL to get exact jitoSOL
        const { instructions: stakeIxs, signers: stakeSigs } = 
            await this.sdk.buildStakeSolToExactJitoIxs(new BN(collatAmount.toString()));
    
        // C) Get instruction to mint exact synth against that collateral
        const { instructions: mintIxs, signers: mintSigs } = 
            await this.sdk.buildMintIxs(new BN(synthAmount.toString()));
    
        // F) bundle all ixs & signers
        const allIxs     = [...stakeIxs, ...mintIxs];
        const allSigners = [...stakeSigs, ...mintSigs].filter((s): s is Keypair => s instanceof Keypair);
    
        // G) Prepare
        const { tx, signers } = await this.sdk.prepareTransaction(
            allIxs,
            feePayer,
            allSigners
        );

        // H) Send the transaction and return the signature
        return await this.sdk.sendTransaction(tx, signers);

    }

    public async redeem(
        synthAmount:   bigint,
    ): Promise<TransactionSignature> {

        // A) Grab signer pubkey
        const maybePk = this.sdk.provider.wallet.publicKey;
        if (!maybePk) {
            throw new Error('Wallet not connected – publicKey is null');
        }
        const feePayer = maybePk;

        // B) Burn synth transaction
        const { instructions: burnIxs,   signers: burnSigs } = 
            await this.sdk.buildBurnIxs(new BN(synthAmount.toString()));
        const { tx: burnTx, signers: burnSigners } = await this.sdk.prepareTransaction(
            burnIxs,
            feePayer,
            burnSigs.filter((s): s is Keypair => s instanceof Keypair)
        );

        // C) Send the transaction and return the signature
        return this.sdk.sendTransaction(burnTx, burnSigners);

    }

    public async liquidate(
        amount: bigint,
        vault: PublicKey,
    ): Promise<TransactionSignature> {

        // A) Grab signer pubkey
        const maybePk = this.sdk.provider.wallet.publicKey;
        if (!maybePk) {
            throw new Error('Wallet not connected – publicKey is null');
        }
        const feePayer = maybePk;

        // B) Build instruction and prepare transaction
        const { instructions: liquidateIxs,   signers: liquidateSigs } = 
            await this.sdk.buildLiquidateIxs(new BN(amount.toString()), vault);

        const { tx: liquidateTx, signers: liquidateSigners } = await this.sdk.prepareTransaction(
            liquidateIxs,
            feePayer,
            liquidateSigs.filter((s): s is Keypair => s instanceof Keypair)
        );

        // C) Send the transaction and return the signature
        return this.sdk.sendTransaction(liquidateTx, liquidateSigners);

    }


}