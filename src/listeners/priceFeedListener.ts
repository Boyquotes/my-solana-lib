// sdk/listeners/priceFeedListener.ts
import type { 
    Connection, 
    PublicKey,
    AccountInfo,
    Context,
} from '@solana/web3.js';
import type { EventEmitter } from 'events';
import { PriceService }     from '../services/priceService';
import { debugLog, errorLog } from '../config/constants';

export class PriceFeedListener {
  private listenerIds: number[] = [];

  constructor(
    private readonly connection: Connection,
    private readonly emitter: EventEmitter,
    private readonly getRefAddr: () => Promise<PublicKey>,
    private readonly getCollatAddr: () => Promise<PublicKey>,
    private readonly priceService: PriceService,
  ) {}


  public async start() {
    const ref = await this.getRefAddr();
    const collat = await this.getCollatAddr();

    this.listenerIds.push(
      this.connection.onAccountChange(ref, this.onRefUpdate, 'confirmed'),
      this.connection.onAccountChange(collat, this.onCollatUpdate, 'confirmed'),
    );
  }

  private onRefUpdate = async (
    _accountInfo: AccountInfo<Buffer>,
    _ctx: Context
  ) => {
    try {
      this.priceService.invalidateRefCache();
      const data = await this.priceService.getRefPriceInfo();
      this.emitter.emit('refPriceUpdate', data);
    } catch (err) {
      console.error('refPriceUpdate failed', err);
    }
  };

  private onCollatUpdate = async (
    _accountInfo: AccountInfo<Buffer>,
    _ctx: Context
  ) => {
    try {
      this.priceService.invalidateCollatCache();
      const data = await this.priceService.getCollatPriceInfo();
      this.emitter.emit('collatPriceUpdate', data);
    } catch (err) {
      console.error('collatPriceUpdate failed', err);
    }
  };


  public stop() {
    for (const id of this.listenerIds) {
      this.connection.removeAccountChangeListener(id);
    }
    this.listenerIds = [];
  }
}
