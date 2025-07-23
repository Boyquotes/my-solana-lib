import { Connection, PublicKey } from "@solana/web3.js";
import { getAccount, getMint } from "@solana/spl-token";
import { BN, Program, Idl } from "@coral-xyz/anchor";

import { DEFAULT_PROGRAM_ID } from "./config/constants";
import idlData from './types/idl/cybergold.json';
export { idlData as cybergoldIdl };
import type { Cybergold } from "./types/idl/cybergold";
import { CyberGoldSdkOptions, AnyProvider} from './types/index.js';

import { AccountService }       from './services/accountService';
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

  public getAdminPda(): PublicKey {
      return this._accountService.getAdminPda();
  }

  // Add methods for interacting with the Solana blockchain
  async getTokenAccountInfo(rpcUrl: string, tokenAccount: string) {
    return getTokenAccountInfo(rpcUrl, tokenAccount);
  }
}
