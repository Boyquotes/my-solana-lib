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
