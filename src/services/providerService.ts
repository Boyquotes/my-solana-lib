// src/services/ProviderService.ts
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Wallet as AnchorWallet } from '@coral-xyz/anchor';
// Remove direct NodeWallet import to avoid browser issues
// import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import type { CyberGoldSdkOptions, AnyProvider, SigningWallet } from '../types';
import { DEFAULT_RPC_URL } from '../config/constants';


export class ProviderService {
    private _connection: Connection;
    private _provider: AnyProvider;
    private _wallet: SigningWallet | undefined;

    constructor(opts: CyberGoldSdkOptions) {

        if (opts.provider) {
            // Anchor path
            this._provider      = opts.provider;
            this._connection    = opts.provider.connection;
            this._wallet        = (opts.provider as AnchorProvider).wallet as SigningWallet;
        } else if (opts.rawProvider) {
            // raw-web3 path, now wallet can be NodeWallet or any WalletAdapter
            this._provider      = opts.rawProvider;
            this._connection    = opts.rawProvider.connection;
            this._wallet        = opts.rawProvider.wallet;
        } else {
            // Default connection setup
            const rpc = opts.rpcUrl ?? DEFAULT_RPC_URL;
            this._connection = new Connection(rpc, { commitment: 'confirmed' });
            
            // Handle NodeWallet creation conditionally for browser compatibility
            if (typeof window !== 'undefined') {
                // Browser environment - create a minimal provider without wallet
                this._provider = { connection: this._connection, wallet: undefined as any };
                this._wallet = undefined;
            } else {
                // Node.js environment - initialize with placeholder, then create NodeWallet
                this._provider = { connection: this._connection, wallet: undefined as any };
                this._wallet = undefined;
                this._createNodeWallet();
            }
        }
    }

    private async _createNodeWallet() {
        try {
            // Dynamic import to avoid bundling issues in browser
            const NodeWallet = (await import("@coral-xyz/anchor/dist/cjs/nodewallet")).default;
            const wallet = new NodeWallet(Keypair.generate());
            this._provider = { connection: this._connection, wallet };
            this._wallet = wallet;
        } catch (error) {
            console.warn('NodeWallet creation failed, running in read-only mode:', error);
            this._provider = { connection: this._connection, wallet: undefined as any };
            this._wallet = undefined;
        }
    }

    /** The connection to use throughout the SDK */
    public getConnection(): Connection {
        return this._connection;
    }

    /** The provider (AnchorProvider or raw-web3) */
    public getProvider(): AnyProvider {
        return this._provider;
    }

    /**
     * Returns the wallet if one was provided, or undefined otherwise.
     */
    public getWallet(): SigningWallet | undefined {
        return this._wallet;
    }

    public getAnchorWallet(): AnchorWallet | undefined {
        const rawWallet: SigningWallet | undefined = this.getWallet();

        // runtime type guard: must have `payer: Keypair` and a signTransaction method
        const looksLikeAnchorWallet =
            rawWallet !== undefined &&
            'payer' in rawWallet &&
            typeof (rawWallet as any).signTransaction === 'function';

        if (looksLikeAnchorWallet) {
            return rawWallet as AnchorWallet;
        }

        // fallback: return undefined
        return undefined;
    }

    public async getAnchorProvider(): Promise<AnchorProvider> {
        let anchorWallet = this.getAnchorWallet();
        if (!anchorWallet) {
            // Fallback: Create NodeWallet if in Node.js environment
            if (typeof window === 'undefined') {
                try {
                    const NodeWallet = (await import("@coral-xyz/anchor/dist/cjs/nodewallet")).default;
                    anchorWallet = new NodeWallet(Keypair.generate());
                } catch (error) {
                    throw new Error('Cannot create AnchorProvider: No wallet available and NodeWallet creation failed');
                }
            } else {
                throw new Error('Cannot create AnchorProvider: No wallet available in browser environment');
            }
        }
        // Wrap in an AnchorProvider
        const anchorOpts = AnchorProvider.defaultOptions();
        return new AnchorProvider(
            this._connection, 
            anchorWallet,
            anchorOpts
        );
    }

    public getUserPk(): PublicKey | undefined {
        // If the wallet is not set, return undefined
        return this._wallet?.publicKey ?? undefined;
    }

}
