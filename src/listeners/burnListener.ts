// src/listeners/burnListener.ts

import type { Program }         from '@coral-xyz/anchor';
import type { EventEmitter }    from 'events';
import type { Cybergold }       from '../types/idl/cybergold';
import type { RedeemExecuted }  from '../types/eventTypes';
import { debugLog, errorLog }   from '../config/constants';


export class BurnListener {
    private listenerId?: number;

    constructor(
        private readonly program:       Program<Cybergold>,
        private readonly emitter:       EventEmitter,
    ) {}

    /** Start listening for `purchaseExecuted` events. */
    public start(): void {
        this.listenerId = this.program.addEventListener(
            'redeemExecuted',
            this.onRedemption
        );
        debugLog('LISTENER', `BurnListener started, id=${this.listenerId}`);
    }

    /**
     * Internal handler for PurchaseExecuted:
     * 1) emit the raw event
     */
    private onRedemption = async (
        event:      RedeemExecuted,
        slot:       number,
        signature:  string,
    ): Promise<void> => {
        debugLog(
            'LISTENER',
            `RedeemExecuted @ slot ${slot}, sig=${signature}`,
            event
        );

        try {
            // Emit the raw CPI event…
            this.emitter.emit('rawBurn', { event, slot, signature });
            debugLog('LISTENER', "'rawBurn' event emitted.");

        } catch (err: any) {
            errorLog('LISTENER', 'Error in onRedemption handler:', err);
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
