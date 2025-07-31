// src/services/PriceService.ts

import { 
  PublicKey, 
  Keypair,
} from '@solana/web3.js';

import type { 
    PoolParams, 
    PriceUpdateV2, 
    PoolState,
    PriceData,
    StakePoolData,
} from '../types';

import { PythSolanaReceiver }   from '@pythnetwork/pyth-solana-receiver';
import type { Program }         from '@coral-xyz/anchor';
import NodeWallet               from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { debugLog, errorLog }   from '../config/logging';
import type { Cybergold }       from '../types/idl/cybergold';
import { ProviderService }      from './providerService';


import * as wasm from '../../wasm/pkg/cybergold_wasm.js';


export class PriceService {
  private _pyth: PythSolanaReceiver;
  private _refPriceFeedAddr?: PublicKey;
  private _collatPriceFeedAddr?: PublicKey;
  private _refPriceInfo?: PriceUpdateV2;
  private _collatPriceInfo?: PriceUpdateV2;
  private _priceDataCache?: PriceData;

  constructor(
    private readonly program:                   Program<Cybergold>,
    private readonly providerService:           ProviderService,
    private readonly getPoolParams:       () => Promise<PoolParams>,
    private readonly getPoolState:        () => Promise<PoolState>,
    private readonly readStakePoolState:  () => Promise<StakePoolData>
  ) {
      
      // Get the Anchor wallet from the provider
      let anchorWallet = this.providerService.getAnchorWallet();
      if (!anchorWallet) {
        // Fallback: NodeWallet implements Anchor’s Wallet
        anchorWallet = new NodeWallet(Keypair.generate());
      }
      // Initialize the PythSolanaReceiver with the connection and wallet
      this._pyth = new PythSolanaReceiver({
        connection: this.providerService.getConnection(),
        wallet:     anchorWallet,
      });

  }

  /**  
   * Asynchronously compute & cache the XAU:USD feed account Pubkey
   * based on the on-chain PoolParams refFeedId.
   */
  public async getRefPriceFeedAddr(): Promise<PublicKey> {
    if (!this._refPriceFeedAddr) {
      const params = await this.getPoolParams();
      const rawId  = params.refFeedId;
      const hexId  = Buffer.from(rawId).toString('hex');
      this._refPriceFeedAddr = this._pyth.getPriceFeedAccountAddress(0, hexId);
      debugLog(
        'PRICE',
        'Computed ref PriceFeed (XAU:USD) address:',
        this._refPriceFeedAddr.toBase58(),
      );
    }
    return this._refPriceFeedAddr;
  }

  /**
   * Compute & cache the SOL:USD feed account Pubkey based on PoolParams.collatFeedId.
   */
  public async getCollatPriceFeedAddr(): Promise<PublicKey> {
    if (!this._collatPriceFeedAddr) {
      const params = await this.getPoolParams();
      const rawId  = params.collatFeedId;
      const hexId  = Buffer.from(rawId).toString('hex');
      this._collatPriceFeedAddr = this._pyth.getPriceFeedAccountAddress(0, hexId);
      debugLog(
        'PRICE',
        'Computed collat PriceFeed (SOL:USD) address:',
        this._collatPriceFeedAddr.toBase58(),
      );
    }
    return this._collatPriceFeedAddr;
  }


  /**
   * Fetch & decode the on-chain PriceUpdateV2 PDA
   */
  private async readPriceUpdate(addr: PublicKey): Promise<PriceUpdateV2> {
    try {
      debugLog('PYTH', 'Fetching PriceUpdateV2 at', addr.toBase58());
      const account = await this.program.account.priceUpdateV2.fetch(addr);
      debugLog('PYTH', 'Decoded PriceUpdateV2:', account);
      return account as PriceUpdateV2;
    } catch (err: any) {
      errorLog('PYTH', 'Error fetching PriceUpdateV2:', err);
      throw err;
    }
  }

  /**
   * Lazily fetch & cache the latest XAU/USD PriceUpdateV2.
   */
  public async getRefPriceInfo(): Promise<PriceUpdateV2> {
    const addr = await this.getRefPriceFeedAddr();
    if (!this._refPriceInfo) {
      debugLog('PYTH', 'Cache miss—fetching XAU price update from on-chain');
      this._refPriceInfo = await this.readPriceUpdate(addr);
    }
    return this._refPriceInfo;
  }

  /**
   * Lazily fetch & cache the latest SOL/USD PriceUpdateV2.
   */
  public async getCollatPriceInfo(): Promise<PriceUpdateV2> {
    const addr = await this.getCollatPriceFeedAddr();
    if (!this._collatPriceInfo) {
      debugLog('PYTH', 'Cache miss—fetching SOL price update from on-chain');
      this._collatPriceInfo = await this.readPriceUpdate(addr);
    }
    return this._collatPriceInfo;
  }


  /**
   * Compute & cache the collateral-per-synth price tuple: { mantissa, conf, expo }
   */
  public async getPriceData(): Promise<PriceData> {
    if (this._priceDataCache) {
      return this._priceDataCache;
    }

    // Fetch inputs
    const refUpdate    = await this.getRefPriceInfo();
    const collatUpdate = await this.getCollatPriceInfo();
    const poolState    = await this.getPoolState();
    const poolParams   = await this.getPoolParams();

    // Convert to BigInt
    const pfSignif    = BigInt(poolParams.priceFactorSignif.toString());
    const pfExp       = poolParams.priceFactorExp;
    const stakeLam    = BigInt(poolState.stakePoolLamports.toString());
    const stakeSupply = BigInt(poolState.lstSupply.toString());

    // Call into WASM
    const expo = wasm.compute_collat_per_synth_price_exponent(
      BigInt(refUpdate.priceMessage.price.toString()),
      BigInt(refUpdate.priceMessage.conf.toString()),
      refUpdate.priceMessage.exponent,
      BigInt(collatUpdate.priceMessage.price.toString()),
      BigInt(collatUpdate.priceMessage.conf.toString()),
      collatUpdate.priceMessage.exponent,
      stakeLam,
      stakeSupply,
      pfSignif,
      pfExp,
      poolParams.collatMintDecimals,
      poolParams.synthMintDecimals,
    );

    const conf = wasm.compute_collat_per_synth_price_conf(
      BigInt(refUpdate.priceMessage.price.toString()),
      BigInt(refUpdate.priceMessage.conf.toString()),
      refUpdate.priceMessage.exponent,
      BigInt(collatUpdate.priceMessage.price.toString()),
      BigInt(collatUpdate.priceMessage.conf.toString()),
      collatUpdate.priceMessage.exponent,
      stakeLam,
      stakeSupply,
      pfSignif,
      pfExp,
      poolParams.collatMintDecimals,
      poolParams.synthMintDecimals,
    );

    const mantissa = wasm.compute_collat_per_synth_price_mantissa(
      BigInt(refUpdate.priceMessage.price.toString()),
      BigInt(refUpdate.priceMessage.conf.toString()),
      refUpdate.priceMessage.exponent,
      BigInt(collatUpdate.priceMessage.price.toString()),
      BigInt(collatUpdate.priceMessage.conf.toString()),
      collatUpdate.priceMessage.exponent,
      stakeLam,
      stakeSupply,
      pfSignif,
      pfExp,
      poolParams.collatMintDecimals,
      poolParams.synthMintDecimals,
    );

    const data: PriceData = { mantissa, conf, expo };
    this._priceDataCache = data;
    debugLog('PRICE', 'Computed PriceData:', data);
    return data;
  }


  public async convertLstToSol(
    lstAmount: bigint,
  ): Promise<bigint> {
    // 1) fetch current pool metrics
    const { totalLamports, poolTokenSupply } = await this.readStakePoolState();
    const totalLamportsBI = BigInt(totalLamports.toString());
    const poolTokenSupplyBI = BigInt(poolTokenSupply.toString());
  
    // 2) if empty pool, fallback to 1:1
    if (totalLamportsBI === 0n || poolTokenSupplyBI === 0n) {
      return lstAmount;
    }
  
    // 3) numerator = lstAmount*totalLamports + (poolTokenSupply - 1)
    const numerator = lstAmount * totalLamportsBI + (poolTokenSupplyBI - 1n);
  
    // 4) ceil division
    return numerator / poolTokenSupplyBI;
  }

  public async convertSolToLst(
    lamports:   bigint,
  ): Promise<bigint> {

    // 1) fetch current stake pool metrics
    const { totalLamports, poolTokenSupply } = await this.readStakePoolState();
    const totalLamportsBI = BigInt(totalLamports.toString());
    const poolTokenSupplyBI = BigInt(poolTokenSupply.toString());

    // If no lamports in pool, return zero
    if (totalLamportsBI === 0n || poolTokenSupplyBI === 0n) {
      return lamports;
    }
    // pro-rata conversion: (inputLamports * totalPoolTokens) / totalLamportsUnderManagement
    return (lamports * poolTokenSupplyBI) / totalLamportsBI;
  }

  /**
   * Given x synth tokens (in smallest units), compute exactly how many
   * collateral tokens you must supply on‑chain to mint them.
   */
  public async convertSynthToCollat(synthAmount: bigint): Promise<bigint> {
      // get the raw price tuple { mantissa, conf, expo }
      const { mantissa, conf, expo } = await this.getPriceData();
  
      // compute the upper price mantissa (with upper bound confidence)
      const upperPriceMantissa: bigint = wasm.compute_bound_price_mantissa(
        mantissa,
        conf,
        true // true means upper bound
      );

      // now compute exact collateral (for Mint):
      const collatNeeded: bigint = wasm.compute_synth_to_collat_amount(
        synthAmount,
        upperPriceMantissa,
        expo,
      );
      return collatNeeded;
  }



  /**
   * Invalidate cached XAU price update and dependent price data.
   */
  public invalidateRefCache(): void {
    this._refPriceInfo = undefined;
    this._priceDataCache = undefined;
    debugLog('PRICE', 'Invalidated ref price and price data cache');
  }
  
  /**
   * Invalidate cached SOL price update and dependent price data.
   */
  public invalidateCollatCache(): void {
    this._collatPriceInfo = undefined;
    this._priceDataCache = undefined;
    debugLog('PRICE', 'Invalidated collat price and price data cache');
  }

}