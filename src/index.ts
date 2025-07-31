import { PublicKey, Connection } from '@solana/web3.js';
import { getAccount, getMint } from '@solana/spl-token';
import { BN, Program, Idl, Provider } from '@coral-xyz/anchor';

// Import WASM modules
import init, { add } from '../wasm-add/wasm-add-pkg/wasm_add.js';
import initCybergold from '../wasm-cybergold/cybergold_wasm.js';

// Import constants and types
import { DEFAULT_PROGRAM_ID } from "./config/constants";
import idlData from './types/idl/cybergold.json';
export { idlData as cybergoldIdl };
import type { Cybergold } from "./types/idl/cybergold";
import { CyberGoldSdkOptions, AnyProvider } from './types/index.js';


import { AccountService }       from './services/accountService';
// import { PriceService }         from './services/priceService';
// import { StakePoolService }     from './services/stakePoolService';
// import { PoolService }          from './services/poolService';
// import { VaultService }         from './services/vaultService';
// import { InstructionService }   from './services/instructionService';
// import { TransactionService }   from './services/transactionService';
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

// WASM helpers
let _wasmReady: Promise<void> | null = null;
async function initWasm(): Promise<void> {
  if (!_wasmReady) {
    // In browser environments like Next.js, the JS module is loaded from dist/
    // so the WASM file needs to be in the same directory
    _wasmReady = init('./wasm_add_bg.wasm').then(() => void 0);
  }
  return _wasmReady;
}

// Cybergold WASM initialization
let _cybergoldWasmReady: Promise<void> | null = null;
async function initCybergoldWasm(): Promise<void> {
  if (!_cybergoldWasmReady) {
    // In browser environments like Next.js, the JS module is loaded from dist/
    // so the WASM file needs to be in the same directory
    _cybergoldWasmReady = initCybergold('./cybergold_wasm_bg.wasm').then(() => void 0);
  }
  return _cybergoldWasmReady;
}
/**
 * Add two numbers using the WASM `add` function.
 */
export async function addNumbers(a: number, b: number): Promise<number> {
  await initWasm();
  return add(a, b);
}

/**
 * Initialize the Cybergold WASM module.
 * Call this before using any Cybergold WASM functions.
 */
export async function initializeCybergoldWasm(): Promise<void> {
  return initCybergoldWasm();
}

// export class CyberGoldSDK extends EventEmitter {
export class CyberGoldSDK {
  public readonly programId: PublicKey;
  public readonly connection: Connection;
  // public readonly program: Program<Cybergold>;

    // ========================================================================================
    // ATTRIBUTES
    // ========================================================================================
    // public readonly programId:  PublicKey;
    // public readonly connection: Connection;
    public readonly provider:   AnyProvider;
    // public readonly program:    Program<Cybergold>;

    // services
    private _providerService:           ProviderService;
    // private _priceService:              PriceService;
    // private _stakePoolService:          StakePoolService;
    // private _poolService:               PoolService;
    // private _vaultService:              VaultService;
    // private _instructionService = new   InstructionService();
    // private _transactionService:        TransactionService;
    private _accountService:            AccountService;

  constructor(options: CyberGoldSdkOptions = {}) {
    // Initialize SDK
    this.programId = new PublicKey(options.programId ?? DEFAULT_PROGRAM_ID);
    this.connection = new Connection(
      process.env.NEXT_PUBLIC_RPC || "https://api.mainnet-beta.solana.com"
    );
    // Initialize the ConfigService
    this._providerService   = new ProviderService(options);
    this.connection         = this._providerService.getConnection();
    this.provider           = this._providerService.getProvider();


    // this.program = new Program<Cybergold>(
    //   idlData as Idl,
    //   // this.anchorProvider
    // );

    // Instantiate the AccountService
    this._accountService = new AccountService(
        this.programId, 
        this.userPk,
    );
  }

  public get userPk()         { return this._providerService.getUserPk(); }

  public getProgramId(): PublicKey {
      return this.programId;
  }

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

  // Add methods for interacting with the Solana blockchain
  async getTokenAccountInfo(rpcUrl: string, tokenAccount: string) {
    return getTokenAccountInfo(rpcUrl, tokenAccount);
  }
}
