import { PublicKey, Connection } from '@solana/web3.js';
import { getAccount, getMint } from '@solana/spl-token';
import { BN, Program, Idl, Provider } from '@coral-xyz/anchor';

// Import WASM modules
import init, { add } from '../wasm-add/wasm-add-pkg/wasm_add.js';
import initCybergold from '../wasm/pkg/cybergold_wasm.js';

// Import constants and types
import { DEFAULT_PROGRAM_ID } from "./config/constants";
import idlData from './types/idl/cybergold.json';
export { idlData as cybergoldIdl };
import type { Cybergold } from "./types/idl/cybergold";
import { CyberGoldSdkOptions, AnyProvider } from './types/index.js';


import { AccountService }       from './services/accountService';
import { PriceService }         from './services/priceService';
import { StakePoolService }     from './services/stakePoolService';
import { PoolService }          from './services/poolService';
import { VaultService }         from './services/vaultService';
// import { InstructionService }   from './services/instructionService';
import { TransactionService }   from './services/transactionService';
import { ProviderService }      from './services/providerService';

/**
 * Example function: get SPL token account info and mint info
 */
export async function getTokenAccountInfo(
  rpcUrl: string,
  tokenAccount: string
) {
  const connection = new Connection(rpcUrl);
  const accountInfo = await getAccount(connection, new PublicKey(tokenAccount));
  const mintInfo = await getMint(connection, accountInfo.mint);
  return { accountInfo, mintInfo };
}

/**
 * Example helper: ensure fetch in Node.js < 18
 */
export async function ensureNodeFetch() {
  if (typeof fetch === "undefined") {
    const fetchModule = await import("node-fetch");
    globalThis.fetch = fetchModule.default || fetchModule;
  }
}

// WASM helpers - Singleton implementation
let _wasmReady: Promise<void> | null = null;

/**
 * WASM initialization singleton
 * This class ensures WASM is initialized only once and provides a consistent interface
 * for checking initialization and ensuring WASM is ready before use.
 */
export class WasmInitializer {
  private static _instance: WasmInitializer;
  private _initialized = false;

  private constructor() {}

  /**
   * Get the singleton instance
   */
  public static getInstance(): WasmInitializer {
    if (!WasmInitializer._instance) {
      WasmInitializer._instance = new WasmInitializer();
    }
    return WasmInitializer._instance;
  }

  /**
   * Initialize the WASM module
   */
  public async initialize(): Promise<void> {
    if (!_wasmReady) {
      // In browser environments like Next.js, the JS module is loaded from dist/
      // so the WASM file needs to be in the same directory
      _wasmReady = init('./wasm_add_bg.wasm').then(() => {
        this._initialized = true;
        return void 0;
      });
    }
    return _wasmReady;
  }

  /**
   * Check if WASM is already initialized
   */
  public isInitialized(): boolean {
    return this._initialized;
  }

  /**
   * Ensure WASM is initialized before continuing
   */
  public async ensureInitialized(): Promise<void> {
    return this.initialize();
  }
}

/**
 * Legacy wrapper function for backward compatibility
 */
async function initWasm(): Promise<void> {
  return WasmInitializer.getInstance().initialize();
}

// Cybergold WASM initialization - Singleton implementation
let _cybergoldWasmReady: Promise<void> | null = null;

/**
 * Cybergold WASM initialization singleton
 * This class ensures Cybergold WASM is initialized only once and provides a consistent interface
 * for checking initialization and ensuring WASM is ready before use.
 */
export class CybergoldWasmInitializer {
  private static _instance: CybergoldWasmInitializer;
  private _initialized = false;

  private constructor() {}

  /**
   * Get the singleton instance
   */
  public static getInstance(): CybergoldWasmInitializer {
    if (!CybergoldWasmInitializer._instance) {
      CybergoldWasmInitializer._instance = new CybergoldWasmInitializer();
    }
    return CybergoldWasmInitializer._instance;
  }

  /**
   * Initialize the Cybergold WASM module
   */
  public async initialize(): Promise<void> {
    if (!_cybergoldWasmReady) {
      try {
        // In browser environments like Next.js, the JS module is loaded from dist/
        // so the WASM file needs to be in the same directory
        _cybergoldWasmReady = initCybergold('./cybergold_wasm_bg.wasm').then(() => {
          this._initialized = true;
          return void 0;
        });
        return _cybergoldWasmReady;
      } catch (error) {
        console.error('Failed to initialize Cybergold WASM:', error);
        throw new Error('Failed to initialize Cybergold WASM: ' + (error as Error).message);
      }
    }
    return _cybergoldWasmReady;
  }

  /**
   * Check if WASM is already initialized
   */
  public isInitialized(): boolean {
    return this._initialized;
  }

  /**
   * Ensure WASM is initialized before continuing
   */
  public async ensureInitialized(): Promise<void> {
    return this.initialize();
  }
}

/**
 * Legacy wrapper function for backward compatibility
 */
async function initCybergoldWasm(): Promise<void> {
  return CybergoldWasmInitializer.getInstance().initialize();
}
/**
 * Add two numbers using the WASM `add` function.
 */
export async function addNumbers(a: number, b: number): Promise<number> {
  await WasmInitializer.getInstance().ensureInitialized();
  return add(a, b);
}

/**
 * Simple addition class
 */
export class Addition {
    /**
     * Adds two numbers using pure JavaScript
     */
    public addi(a: number, b: number): number {
        return a + b;
    }
}

/**
 * Helper function to create an Addition instance
 */
export function createAddition(): Addition {
    return new Addition();
}

/**
 * Initialize the Cybergold WASM module.
 * Call this before using any Cybergold WASM functions.
 */
export async function initializeCybergoldWasm(): Promise<void> {
  return CybergoldWasmInitializer.getInstance().ensureInitialized();
}

// export class CyberGoldSDK extends EventEmitter {
export class CyberGoldSDK {
    // ========================================================================================
    // ATTRIBUTES
    // ========================================================================================
    public readonly programId:  PublicKey;
    public readonly connection: Connection;
    public readonly provider:   AnyProvider;
    public readonly program:    Program<Cybergold>;

    // services
    private _providerService:           ProviderService;
    private _priceService:              PriceService;
    private _stakePoolService:          StakePoolService;
    private _poolService:               PoolService;
    private _vaultService:              VaultService;
    // private _instructionService = new   InstructionService();
    private _transactionService:        TransactionService;
    private _accountService:            AccountService;

    // Listeners
    // private _depositListener:       DepositListener;
    // private _withdrawListener:      WithdrawListener;
    // private _mintListener:          MintListener;
    // private _burnListener:          BurnListener;
    // private _liquidationListener:   LiquidationListener;
    // private _priceFeedListener:     PriceFeedListener;
    // private _shutdownListener:      ShutdownListener;


    // ========================================================================================
    // CONSTRUCTOR
    // ========================================================================================

    constructor(options: CyberGoldSdkOptions = {}) {
        // call the parent EventEmitter constructor
        // super();

        // programId default comes from constants
        this.programId = new PublicKey(options.programId ?? DEFAULT_PROGRAM_ID);

        // INSTANTIATE SERVICES
        // ===================

        // Initialize the ConfigService
        this._providerService   = new ProviderService(options);
        this.connection         = this._providerService.getConnection();
        this.provider           = this._providerService.getProvider();

        // Initialize the Anchor program
        this.program = new Program<Cybergold>(
            idlData as Idl,
            this.anchorProvider,
        );

        // Instantiate the AccountService
        this._accountService = new AccountService(
            this.programId, 
            this.userPk,
        );

        // Instanciate the StakePoolService
        this._stakePoolService = new StakePoolService(
            this.connection,
            () => this.poolParamsData(),
        );

        // Instanciate the PriceService
        this._priceService = new PriceService(
            this.program,
            this._providerService,
            () => this.poolParamsData(),
            () => this.poolStateData(),
            () => this.readStakePoolState(),
        );

        // Instanciate the PoolService
        this._poolService = new PoolService(
            this.program,
            this.connection,
            this._accountService,
            () => this._stakePoolService.readStakePoolState(),
            () => this._priceService.getPriceData(),
        );

        // Instantiate VaultService
        this._vaultService = new VaultService(
            this.program,
            this.connection,
            this._accountService,
            () => this._poolService.getPoolMetrics(),
            () => this._poolService.readPoolState(),
        );

        // Instantiate the TransactionService
        this._transactionService = new TransactionService(this);

        // START LISTENERS
        // ===============

        // Instanciate and start the listeners
        // this._depositListener = new DepositListener(
        //     this.program,
        //     this._vaultService,
        //     this
        // );
        // this._depositListener.start();

        // this._withdrawListener = new WithdrawListener(
        //     this.program,
        //     this._vaultService,
        //     this
        // );
        // this._withdrawListener.start();

        // this._mintListener = new MintListener(
        //     this.program,
        //     this  // EventEmitter
        // );
        // this._mintListener.start();

        // this._burnListener = new BurnListener(
        //     this.program,
        //     this  // EventEmitter
        // );
        // this._burnListener.start();

        // this._liquidationListener = new LiquidationListener(
        //     this.program,
        //     this._vaultService,
        //     this  // EventEmitter
        // );
        // this._liquidationListener.start();

        // this._priceFeedListener = new PriceFeedListener(
        //     this.connection,
        //     this,
        //     () => this._priceService.getRefPriceFeedAddr(),
        //     () => this._priceService.getCollatPriceFeedAddr(),
        //     this._priceService,
        // );
        // this._priceFeedListener.start();

        // this._shutdownListener = new ShutdownListener(
        //     this._depositListener,
        //     this._withdrawListener,
        //     this._mintListener,
        //     this._burnListener,
        //     this._liquidationListener,
        //     this._priceFeedListener,
        //     this.connection,
        //     this.program
        // );

    }

    // ========================================================================================
    // PROVIDER
    // ========================================================================================

    public get userPk()         { return this._providerService.getUserPk(); }
    public get anchorProvider() { return this._providerService.getAnchorProvider(); }

    // ========================================================================================
    // ADRESSES & ACCOUNTS
    // ========================================================================================

    public get adminAddr()                      { return this._accountService.getAdminPda(); }
    public get poolStateAddr()                  { return this._accountService.getPoolStatePda(); }
    public get poolParamsAddr()                 { return this._accountService.getPoolParamsPda(); }
    public get synthMintAddr()                  { return this._accountService.getSynthMint(); }
    public get collatMintAddr()                 { return this._accountService.getCollatMint(); }
    public get collatTokenProgramAddr()         { return this._accountService.getCollatTokenProgram(); }
    public get synthTokenProgramAddr()          { return this._accountService.getSynthTokenProgram(); }    
    public getCollatATA(userPk: PublicKey)      { return this._accountService.getCollatATA(userPk); }
    public getSynthATA(userPk: PublicKey)       { return this._accountService.getSynthATA(userPk); }
    public getUserVaultAddr(userPk: PublicKey)  { return this._accountService.getUserVaultPda(userPk); }

    // ========================================================================================
    // PRICES & CONVERSIONS
    // ========================================================================================

    public getRefPriceFeedAddr()    { return this._priceService.getRefPriceFeedAddr(); }
    public getCollatPriceFeedAddr() { return this._priceService.getCollatPriceFeedAddr(); }
    public getRefPriceInfo()        { return this._priceService.getRefPriceInfo(); }
    public getCollatPriceInfo()     { return this._priceService.getCollatPriceInfo(); }
    public getPriceData()           { return this._priceService.getPriceData(); }


    public convertLstToSol(
        lstAmt: bigint
    ): Promise<bigint>{ 
        return this._priceService.convertLstToSol(lstAmt); 
    }

    public convertSolToLst(
        lamports: bigint
    ): Promise<bigint>{ 
        return this._priceService.convertSolToLst(lamports); 
    }

    public convertSynthToCollat(
        synthAmount: bigint
    ): Promise<bigint> {
        return this._priceService.convertSynthToCollat(synthAmount);
    }


    // ========================================================================================
    // STAKE POOL SERVICE
    // ========================================================================================

    public getStakePoolAddr()   { return this._stakePoolService.getStakePoolAddr(); }
    public readStakePoolState() { return this._stakePoolService.readStakePoolState(); }

    // ========================================================================================
    // POOL SERVICE
    // ========================================================================================
    
    public poolStateData()      { return this._poolService.readPoolState(); }
    public poolParamsData()     { return this._poolService.readPoolParams(); }
    public getPoolMetrics()     { return this._poolService.getPoolMetrics(); }

    /**
     * Get staking rewards from pool metrics
     * @returns Promise containing the staking rewards as a bigint
     */
    public async getStakingRewards(): Promise<bigint> {
        const poolMetrics = await this._poolService.getPoolMetrics();
        return poolMetrics.stakingRewards;
    }

    // ========================================================================================
    // VAULT SERVICE
    // ========================================================================================

    public getAllVaults()                           { return this._vaultService.getAllVaults(); }
    public isVaultInitialized(addr: PublicKey)      { return this._vaultService.isVaultInitialized(addr); }
    public readVaultData(addr: PublicKey)           { return this._vaultService.readVaultData(addr); }
    public getVaultMetrics(addr: PublicKey)         { return this._vaultService.getVaultMetrics(addr); }
    public invalidateVaultCache(addr: PublicKey)    { return this._vaultService.invalidateVaultCache(addr); }

  // Add methods for interacting with the Solana blockchain
  async getTokenAccountInfo(rpcUrl: string, tokenAccount: string) {
    return getTokenAccountInfo(rpcUrl, tokenAccount);
  }
}
