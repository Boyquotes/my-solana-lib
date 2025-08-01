/* tslint:disable */
/* eslint-disable */
export function compute_collat_per_synth_price_exponent(ref_price_price: bigint, ref_price_conf: bigint, ref_price_exponent: number, collat_price_price: bigint, collat_price_conf: bigint, collat_price_exponent: number, stake_pool_total_lamports: bigint, stake_pool_pool_token_supply: bigint, pool_params_price_factor_signif: bigint, pool_params_price_factor_exp: number, collat_mint_decimals: number, synth_mint_decimals: number): number;
export function compute_collat_per_synth_price_conf(ref_price_price: bigint, ref_price_conf: bigint, ref_price_exponent: number, collat_price_price: bigint, collat_price_conf: bigint, collat_price_exponent: number, stake_pool_total_lamports: bigint, stake_pool_pool_token_supply: bigint, pool_params_price_factor_signif: bigint, pool_params_price_factor_exp: number, collat_mint_decimals: number, synth_mint_decimals: number): bigint;
export function compute_collat_per_synth_price_mantissa(ref_price_price: bigint, ref_price_conf: bigint, ref_price_exponent: number, collat_price_price: bigint, collat_price_conf: bigint, collat_price_exponent: number, stake_pool_total_lamports: bigint, stake_pool_pool_token_supply: bigint, pool_params_price_factor_signif: bigint, pool_params_price_factor_exp: number, collat_mint_decimals: number, synth_mint_decimals: number): bigint;
export function compute_pool_ur(computed_pool_backing_capacity: bigint, computed_pool_liabilities: bigint): bigint;
export function compute_pnl_accum(pool_state_total_realized_equity: bigint, pool_state_shares: bigint, computed_pool_equity: bigint): bigint;
export function compute_updated_pool_max_exposure(pool_state_shares: bigint, pool_state_max_exposure_pct_fp9: bigint, delta_shares: bigint, vault_max_exposure_pct: number): bigint;
export function compute_synth_to_collat_amount(synth_amount: bigint, collat_per_synth_price: bigint, exponent: number): bigint;
export function compute_bound_price_mantissa(price: bigint, conf: bigint, is_upper: boolean): bigint;
export function compute_staking_rewards(pool_state_lst_supply: bigint, pool_state_stake_pool_lamports: bigint, pool_collat_ata_amount: bigint, stake_pool_total_lamports: bigint, stake_pool_pool_token_supply: bigint): bigint;
export function compute_pool_mintable_synth(pool_state_supply: bigint, computed_pool_backable_synth: bigint): bigint;
export function compute_pool_backable_synth(computed_pool_backing_capacity: bigint, computed_price_price: bigint, computed_price_conf: bigint, computed_price_exponent: number): bigint;
export function compute_pool_backing_capacity(computed_pool_equity: bigint, pool_state_max_exposure_pct_fp9: bigint): bigint;
export function compute_vault_withdrawable_collat(computed_pool_excess_collat: bigint, computed_vault_equity: bigint): bigint;
export function compute_pool_free_collat(pool_collat_ata_amount: bigint, pool_state_max_exposure_pct_fp9: bigint, computed_pool_liabilities: bigint): bigint;
export function compute_vault_cr(vault_shares: bigint, pool_state_shares: bigint, computed_pool_liabilities: bigint, computed_vault_equity: bigint): bigint;
export function compute_vault_equity(vault_entry_equity: bigint, computed_vault_pnl: bigint): bigint;
export function compute_vault_pnl(vault_shares: bigint, vault_entry_pnl_accum: bigint, computed_current_pnl_accum: bigint): bigint;
export function compute_current_pnl_accum(pool_state_shares: bigint, pool_state_total_realized_equity: bigint, computed_pool_equity: bigint): bigint;
export function compute_pool_equity(pool_collat_ata_amount: bigint, computed_pool_liabilities: bigint): bigint;
export function compute_pool_liabilities(pool_state_supply: bigint, computed_price_price: bigint, computed_price_conf: bigint, computed_price_exponent: number): bigint;
/**
 * Initialize Javascript logging and panic handler
 */
export function solana_program_init(): void;
/**
 * A hash; the 32-byte output of a hashing algorithm.
 *
 * This struct is used most often in `solana-sdk` and related crates to contain
 * a [SHA-256] hash, but may instead contain a [blake3] hash.
 *
 * [SHA-256]: https://en.wikipedia.org/wiki/SHA-2
 * [blake3]: https://github.com/BLAKE3-team/BLAKE3
 */
export class Hash {
  free(): void;
  /**
   * Create a new Hash object
   *
   * * `value` - optional hash as a base58 encoded string, `Uint8Array`, `[number]`
   */
  constructor(value: any);
  /**
   * Return the base58 string representation of the hash
   */
  toString(): string;
  /**
   * Checks if two `Hash`s are equal
   */
  equals(other: Hash): boolean;
  /**
   * Return the `Uint8Array` representation of the hash
   */
  toBytes(): Uint8Array;
}
/**
 * wasm-bindgen version of the Instruction struct.
 * This duplication is required until https://github.com/rustwasm/wasm-bindgen/issues/3671
 * is fixed. This must not diverge from the regular non-wasm Instruction struct.
 */
export class Instruction {
  private constructor();
  free(): void;
}
export class Instructions {
  free(): void;
  constructor();
  push(instruction: Instruction): void;
}
/**
 * wasm-bindgen version of the Message struct.
 * This duplication is required until https://github.com/rustwasm/wasm-bindgen/issues/3671
 * is fixed. This must not diverge from the regular non-wasm Message struct.
 */
export class Message {
  private constructor();
  free(): void;
  /**
   * The id of a recent ledger entry.
   */
  recent_blockhash: Hash;
}
/**
 * The address of a [Solana account][acc].
 *
 * Some account addresses are [ed25519] public keys, with corresponding secret
 * keys that are managed off-chain. Often, though, account addresses do not
 * have corresponding secret keys &mdash; as with [_program derived
 * addresses_][pdas] &mdash; or the secret key is not relevant to the operation
 * of a program, and may have even been disposed of. As running Solana programs
 * can not safely create or manage secret keys, the full [`Keypair`] is not
 * defined in `solana-program` but in `solana-sdk`.
 *
 * [acc]: https://solana.com/docs/core/accounts
 * [ed25519]: https://ed25519.cr.yp.to/
 * [pdas]: https://solana.com/docs/core/cpi#program-derived-addresses
 * [`Keypair`]: https://docs.rs/solana-sdk/latest/solana_sdk/signer/keypair/struct.Keypair.html
 */
export class Pubkey {
  free(): void;
  /**
   * Create a new Pubkey object
   *
   * * `value` - optional public key as a base58 encoded string, `Uint8Array`, `[number]`
   */
  constructor(value: any);
  /**
   * Return the base58 string representation of the public key
   */
  toString(): string;
  /**
   * Check if a `Pubkey` is on the ed25519 curve.
   */
  isOnCurve(): boolean;
  /**
   * Checks if two `Pubkey`s are equal
   */
  equals(other: Pubkey): boolean;
  /**
   * Return the `Uint8Array` representation of the public key
   */
  toBytes(): Uint8Array;
  /**
   * Derive a Pubkey from another Pubkey, string seed, and a program id
   */
  static createWithSeed(base: Pubkey, seed: string, owner: Pubkey): Pubkey;
  /**
   * Derive a program address from seeds and a program id
   */
  static createProgramAddress(seeds: any[], program_id: Pubkey): Pubkey;
  /**
   * Find a valid program address
   *
   * Returns:
   * * `[PubKey, number]` - the program address and bump seed
   */
  static findProgramAddress(seeds: any[], program_id: Pubkey): any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly compute_collat_per_synth_price_exponent: (a: bigint, b: bigint, c: number, d: bigint, e: bigint, f: number, g: bigint, h: bigint, i: bigint, j: number, k: number, l: number) => number;
  readonly compute_collat_per_synth_price_conf: (a: bigint, b: bigint, c: number, d: bigint, e: bigint, f: number, g: bigint, h: bigint, i: bigint, j: number, k: number, l: number) => bigint;
  readonly compute_collat_per_synth_price_mantissa: (a: bigint, b: bigint, c: number, d: bigint, e: bigint, f: number, g: bigint, h: bigint, i: bigint, j: number, k: number, l: number) => bigint;
  readonly compute_pool_ur: (a: bigint, b: bigint, c: bigint, d: bigint) => [bigint, bigint];
  readonly compute_pnl_accum: (a: bigint, b: bigint, c: bigint, d: bigint, e: bigint) => [bigint, bigint];
  readonly compute_updated_pool_max_exposure: (a: bigint, b: bigint, c: bigint, d: bigint, e: bigint, f: number) => bigint;
  readonly compute_synth_to_collat_amount: (a: bigint, b: bigint, c: bigint, d: number) => bigint;
  readonly compute_bound_price_mantissa: (a: bigint, b: bigint, c: number) => [bigint, bigint];
  readonly compute_staking_rewards: (a: bigint, b: bigint, c: bigint, d: bigint, e: bigint) => bigint;
  readonly compute_pool_mintable_synth: (a: bigint, b: bigint, c: bigint) => [bigint, bigint];
  readonly compute_pool_backable_synth: (a: bigint, b: bigint, c: bigint, d: bigint, e: number) => [bigint, bigint];
  readonly compute_pool_backing_capacity: (a: bigint, b: bigint, c: bigint) => [bigint, bigint];
  readonly compute_vault_withdrawable_collat: (a: bigint, b: bigint, c: bigint, d: bigint) => bigint;
  readonly compute_pool_free_collat: (a: bigint, b: bigint, c: bigint, d: bigint) => [bigint, bigint];
  readonly compute_vault_cr: (a: bigint, b: bigint, c: bigint, d: bigint, e: bigint, f: bigint, g: bigint, h: bigint) => [bigint, bigint];
  readonly compute_vault_equity: (a: bigint, b: bigint, c: bigint) => [bigint, bigint];
  readonly compute_vault_pnl: (a: bigint, b: bigint, c: bigint, d: bigint, e: bigint, f: bigint) => [bigint, bigint];
  readonly compute_current_pnl_accum: (a: bigint, b: bigint, c: bigint, d: bigint) => [bigint, bigint];
  readonly compute_pool_equity: (a: bigint, b: bigint, c: bigint) => [bigint, bigint];
  readonly compute_pool_liabilities: (a: bigint, b: bigint, c: bigint, d: number) => [bigint, bigint];
  readonly __wbg_hash_free: (a: number, b: number) => void;
  readonly hash_constructor: (a: any) => [number, number, number];
  readonly hash_toString: (a: number) => [number, number];
  readonly hash_equals: (a: number, b: number) => number;
  readonly hash_toBytes: (a: number) => [number, number];
  readonly __wbg_instructions_free: (a: number, b: number) => void;
  readonly instructions_constructor: () => number;
  readonly instructions_push: (a: number, b: number) => void;
  readonly __wbg_instruction_free: (a: number, b: number) => void;
  readonly __wbg_message_free: (a: number, b: number) => void;
  readonly __wbg_get_message_recent_blockhash: (a: number) => number;
  readonly __wbg_set_message_recent_blockhash: (a: number, b: number) => void;
  readonly solana_program_init: () => void;
  readonly pubkey_constructor: (a: any) => [number, number, number];
  readonly pubkey_toString: (a: number) => [number, number];
  readonly pubkey_isOnCurve: (a: number) => number;
  readonly pubkey_createWithSeed: (a: number, b: number, c: number, d: number) => [number, number, number];
  readonly pubkey_createProgramAddress: (a: number, b: number, c: number) => [number, number, number];
  readonly pubkey_findProgramAddress: (a: number, b: number, c: number) => [number, number, number];
  readonly systeminstruction_createAccount: (a: number, b: number, c: bigint, d: bigint, e: number) => number;
  readonly systeminstruction_createAccountWithSeed: (a: number, b: number, c: number, d: number, e: number, f: bigint, g: bigint, h: number) => number;
  readonly systeminstruction_assign: (a: number, b: number) => number;
  readonly systeminstruction_assignWithSeed: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly systeminstruction_transfer: (a: number, b: number, c: bigint) => number;
  readonly systeminstruction_transferWithSeed: (a: number, b: number, c: number, d: number, e: number, f: number, g: bigint) => number;
  readonly systeminstruction_allocate: (a: number, b: bigint) => number;
  readonly systeminstruction_allocateWithSeed: (a: number, b: number, c: number, d: number, e: bigint, f: number) => number;
  readonly systeminstruction_createNonceAccount: (a: number, b: number, c: number, d: bigint) => any;
  readonly systeminstruction_advanceNonceAccount: (a: number, b: number) => number;
  readonly systeminstruction_withdrawNonceAccount: (a: number, b: number, c: number, d: bigint) => number;
  readonly systeminstruction_authorizeNonceAccount: (a: number, b: number, c: number) => number;
  readonly __wbg_pubkey_free: (a: number, b: number) => void;
  readonly pubkey_equals: (a: number, b: number) => number;
  readonly pubkey_toBytes: (a: number) => [number, number];
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
