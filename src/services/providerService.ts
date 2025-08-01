// src/services/ProviderService.ts
import { Connection, Keypair, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { AnchorProvider, Wallet as AnchorWallet } from '@coral-xyz/anchor';
// Remove direct NodeWallet import to avoid browser issues
// import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import type { CyberGoldSdkOptions, AnyProvider, SigningWallet } from '../types';
import { DEFAULT_RPC_URL } from '../config/constants';

// Define interfaces for browser wallet types
interface BrowserWalletAdapter {
    publicKey: PublicKey;
    isConnected: boolean;
    signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]>;
    connect(): Promise<{ publicKey: PublicKey }>;
    disconnect(): Promise<void>;
}

// Extend Window interface to include solana property
declare global {
    interface Window {
        solana?: BrowserWalletAdapter;
    }
}


export class ProviderService {
    private _connection!: Connection;
    private _provider!: AnyProvider;
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
            
            // Handle wallet creation conditionally for environment compatibility
            if (typeof window !== 'undefined') {
                // Browser environment - check for browser wallet
                this._detectBrowserWallet(opts);
            } else {
                // Node.js environment - initialize with placeholder, then create NodeWallet
                this._provider = { connection: this._connection, wallet: undefined as any };
                this._wallet = undefined;
                this._createNodeWallet();
            }
        }
    }

    /**
     * Attempts to detect and use an available browser wallet
     * @param opts SDK options that may contain wallet configuration
     */
    private _detectBrowserWallet(opts: CyberGoldSdkOptions) {
        // Initialize with minimal provider as fallback
        this._provider = { connection: this._connection, wallet: undefined as any };
        this._wallet = undefined;
        
        // Check if window.solana exists (Phantom, Solflare, etc.)
        if (typeof window !== 'undefined' && window.solana) {
            try {
                // Use the first available wallet adapter
                const adapter = window.solana;
                
                if (adapter.publicKey) {
                    // Create a browser wallet adapter wrapper compatible with our SDK
                    const browserWallet: SigningWallet = {
                        publicKey: adapter.publicKey,
                        // Add required properties for compatibility with NodeWallet interface
                        payer: undefined as unknown as Keypair, // This is required by type but not used in browser context
                        signTransaction: async (tx) => adapter.signTransaction(tx),
                        signAllTransactions: async (txs) => adapter.signAllTransactions(txs)
                    };
                    
                    this._wallet = browserWallet;
                    
                    // Update the provider with the browser wallet
                    this._provider = {
                        connection: this._connection,
                        wallet: this._wallet
                    };
                    
                    console.log('Browser wallet detected and configured');
                } else {
                    console.log('Browser wallet detected but not connected');
                }
            } catch (error) {
                console.warn('Browser wallet detection failed:', error);
                // Keep using the default minimal provider
            }
        } else {
            console.log('No browser wallet detected, running in read-only mode');
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
    
    /**
     * Connects to a browser wallet if available
     * @returns The public key of the connected wallet, or undefined if not available
     */
    public async connectWallet(): Promise<PublicKey | undefined> {
        if (typeof window !== 'undefined' && window.solana) {
            try {
                // Prompt user to connect wallet
                const result = await window.solana.connect();
                
                if (result.publicKey) {
                    // Update the wallet and provider
                    const browserWallet: SigningWallet = {
                        publicKey: result.publicKey,
                        payer: undefined as unknown as Keypair,
                        signTransaction: async (tx) => window.solana!.signTransaction(tx),
                        signAllTransactions: async (txs) => window.solana!.signAllTransactions(txs)
                    };
                    
                    this._wallet = browserWallet;
                    this._provider = {
                        connection: this._connection,
                        wallet: this._wallet
                    };
                    
                    console.log('Connected to wallet:', result.publicKey.toString());
                    return result.publicKey;
                }
            } catch (error) {
                console.error('Failed to connect to wallet:', error);
            }
        } else {
            console.warn('No browser wallet available');
        }
        
        return undefined;
    }
    
    /**
     * Disconnects from the current browser wallet
     */
    public async disconnectWallet(): Promise<void> {
        if (typeof window !== 'undefined' && window.solana && this._wallet) {
            try {
                await window.solana.disconnect();
                
                // Reset wallet and provider
                this._wallet = undefined;
                this._provider = { 
                    connection: this._connection, 
                    wallet: undefined as any 
                };
                
                console.log('Disconnected from wallet');
            } catch (error) {
                console.error('Failed to disconnect wallet:', error);
            }
        }
    }
    
    /**
     * Checks if a wallet is connected
     */
    public isWalletConnected(): boolean {
        return !!this._wallet?.publicKey;
    }
}
