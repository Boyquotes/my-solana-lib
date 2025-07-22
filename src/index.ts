import { Connection, PublicKey } from "@solana/web3.js";
import { getAccount, getMint } from "@solana/spl-token";
import { BN, Program, Idl } from "@coral-xyz/anchor";

import { DEFAULT_PROGRAM_ID } from "./config/constants";
import idlData from './types/idl/cybergold.json';
export { idlData as cybergoldIdl };
import type { Cybergold } from "./types/idl/cybergold";
import { CyberGoldSdkOptions, AnyProvider} from './types/index.js';

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
  public readonly program: Program<Cybergold>;

  constructor(options: CyberGoldSdkOptions = {}) {
    // Initialize SDK
    this.programId = new PublicKey(options.programId ?? DEFAULT_PROGRAM_ID);
    this.connection = new Connection(
      process.env.NEXT_PUBLIC_RPC || "https://api.mainnet-beta.solana.com"
    );
    this.program = new Program<Cybergold>(
      idlData as Idl,
      // this.anchorProvider
    );
  }

  public getProgramId(): PublicKey {
      return this.programId;
  }

  // Add methods for interacting with the Solana blockchain
  async getTokenAccountInfo(rpcUrl: string, tokenAccount: string) {
    return getTokenAccountInfo(rpcUrl, tokenAccount);
  }
}
