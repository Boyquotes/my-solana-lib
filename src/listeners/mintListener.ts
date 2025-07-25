// src/listeners/mintListener.ts

import type { Program }         from '@coral-xyz/anchor';
import type { EventEmitter }    from 'events';
import { debugLog, errorLog }   from '../config/constants';
import type { Cybergold }       from '../types/idl/cybergold';

import type { PurchaseExecuted } from '../types/eventTypes';

export class MintListener {
    private listenerId?: number;

    constructor(
        private readonly program:       Program<Cybergold>,
        private readonly emitter:       EventEmitter,
    ) {}

    /** Start listening for `purchaseExecuted` events. */
    public start(): void {
        this.listenerId = this.program.addEventListener(
            'purchaseExecuted',
            this.onPurchase
        );
        debugLog('LISTENER', `PurchaseListener started, id=${this.listenerId}`);
    }

    /**
     * Internal handler for PurchaseExecuted:
     * 1) emit the raw event
     */
    private onPurchase = async (
        event:      PurchaseExecuted,
        slot:       number,
        signature:  string,
    ): Promise<void> => {
        debugLog(
            'LISTENER',
            `PurchaseExecuted @ slot ${slot}, sig=${signature}`,
            event
        );

        try {
            // Emit the raw CPI event…
            this.emitter.emit('rawMint', { event, slot, signature });
            debugLog('LISTENER', "'rawMint' event emitted.");

        } catch (err: any) {
            errorLog('LISTENER', 'Error in onPurchase handler:', err);
        }
    };

    /** Stop listening for PurchaseExecuted events. */
    public async stop(): Promise<void> {
        if (this.listenerId != null) {
            await this.program.removeEventListener(this.listenerId);
            this.listenerId = undefined;
        }
    }
}
