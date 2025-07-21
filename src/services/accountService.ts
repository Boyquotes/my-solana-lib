// src/services/AccountService.ts
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { debugLog, errorLog } from '../config/constants';
import {
  SYNTH_MINT_ID,
  COLLAT_MINT_ID,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from '../config/constants';

/**
 * Encapsulates PDA/ATA derivations and caches them.
 */
export class AccountService {
    private _vaultPdaCache = new Map<string, PublicKey>();
    private _adminPda?:                 PublicKey;
    private _poolStatePda?:             PublicKey;
    private _poolParamsPda?:            PublicKey;
    private _synthMintAddr?:            PublicKey;
    private _collatMintAddr?:           PublicKey;
    private _collatTokenProgramAddr?:   PublicKey;
    private _synthTokenProgramAddr?:    PublicKey;

    constructor(
        private readonly programId:         PublicKey,
        private readonly userPublicKey?:    PublicKey, // optional: for user-specific PDAs
    ) {}



    // ========================================================================================
    // PROGRAM DERIVATED ACCOUNTS (PDA)
    // ========================================================================================

    /** Derive & cache the Admin PDA */
    public getAdminPda(): PublicKey {
        if (!this._adminPda) {
            const seeds = [
                Buffer.from('admin'),
            ];
            this._adminPda = PublicKey.findProgramAddressSync(seeds, this.programId)[0];
            debugLog('ACCOUNTS', 'Derived Admin PDA:', this._adminPda.toBase58());
        }
        return this._adminPda;
    }

    /** Derive & cache the PoolState PDA */
    public getPoolStatePda(): PublicKey {
        if (!this._poolStatePda) {
            const seeds = [
                Buffer.from('pool_state'),
                this.getSynthMint().toBytes(),
                this.getCollatMint().toBytes(),
            ];
            this._poolStatePda = PublicKey.findProgramAddressSync(seeds, this.programId)[0];
            debugLog('ACCOUNTS', 'Derived PoolState PDA:', this._poolStatePda.toBase58());
        }
        return this._poolStatePda;
    }

    /** Derive & cache the PoolParams PDA */
    public getPoolParamsPda(): PublicKey {
        if (!this._poolParamsPda) {
            const seeds = [
                Buffer.from('pool_params'),
                this.getSynthMint().toBytes(),
                this.getCollatMint().toBytes(),
            ];
            this._poolParamsPda = PublicKey.findProgramAddressSync(seeds, this.programId)[0];
            debugLog('ACCOUNTS', 'Derived PoolParams PDA:', this._poolParamsPda.toBase58());
        }
        return this._poolParamsPda;
    }


    /**
     * Derive & cache a user-specific vault PDA.
     * If `userPublicKey` was provided in the constructor, uses that by default.
     */
    public getUserVaultPda(userPk?: PublicKey): PublicKey {
        const key = (userPk ?? this.userPublicKey)!.toBase58();
        if (!this._vaultPdaCache.has(key)) {
            const poolState = this.getPoolStatePda();
            const seeds = [
                Buffer.from('vault'),
                (userPk ?? this.userPublicKey)!.toBuffer(),
                poolState.toBuffer(),
            ];
            const vaultPda = PublicKey.findProgramAddressSync(seeds, this.programId)[0];
            debugLog('ACCOUNTS', `Derived Vault PDA for ${key}:`, vaultPda.toBase58());
            this._vaultPdaCache.set(key, vaultPda);
        }
        return this._vaultPdaCache.get(key)!;
    }

    // ========================================================================================
    // MINTS
    // ========================================================================================


    /** Derive & cache the Synth mint address */
    public getSynthMint(): PublicKey {
        if (!this._synthMintAddr) {
            this._synthMintAddr = new PublicKey(SYNTH_MINT_ID);
        }
        return this._synthMintAddr;
    }

    /** Derive & cache the Collat mint address */
    public getCollatMint(): PublicKey {
        if (!this._collatMintAddr) {
            this._collatMintAddr = new PublicKey(COLLAT_MINT_ID);
        }
        return this._collatMintAddr;
    }

    // ========================================================================================
    // TOKEN PROGRAM
    // ========================================================================================


    /** Derive & cache the SPL Token program address */
    public getCollatTokenProgram(): PublicKey {
        if (!this._collatTokenProgramAddr) {
            this._collatTokenProgramAddr = new PublicKey(TOKEN_PROGRAM_ID);
        }
        return this._collatTokenProgramAddr;
    }

    /** Derive & cache the SPL Token 2022 program address */
    public getSynthTokenProgram(): PublicKey {
        if (!this._synthTokenProgramAddr) {
            this._synthTokenProgramAddr = new PublicKey(TOKEN_2022_PROGRAM_ID);
        }
        return this._synthTokenProgramAddr;
    }

    // ========================================================================================
    // ASSOCIATED TOKEN ACCOUNTS (ATA)
    // ========================================================================================


    /**
     * Compute the associated token account for any mint/owner.
     */
    public getAta(mint: PublicKey, owner: PublicKey, allowOwnerOffCurve = true): PublicKey {
        // no need to cache ATAs globally—cheap to compute, but you could add a cache map if desired.
        return getAssociatedTokenAddressSync(
            mint,
            owner,
            allowOwnerOffCurve,
            this.getCollatTokenProgram()
        );
    }

    public getCollatATA(userPublicKey: PublicKey): PublicKey {
        const collatATA = getAssociatedTokenAddressSync(
            this.getCollatMint(),
            userPublicKey,
            true,                         // allowOwnerOffCurve
            this.getCollatTokenProgram(),  // Default SPL for collat
        );
        // console.log("signer_collat_token_account:", signerCollatATA.toBase58());
        debugLog('ACCOUNTS', 'Collateral ATA:', collatATA);
        return collatATA;
    }

    public getSynthATA(userPublicKey: PublicKey): PublicKey {
        const synthATA = getAssociatedTokenAddressSync(
            this.getSynthMint(),
            userPublicKey,
            true,                           // allowOwnerOffCurve
            this.getSynthTokenProgram(),  // Default SPL for collat
        );
        // console.log("signer_collat_token_account:", signerCollatATA.toBase58());
        debugLog('ACCOUNTS', 'Synthetic (CYG) ATA:', synthATA);
        return synthATA;
    }

}
