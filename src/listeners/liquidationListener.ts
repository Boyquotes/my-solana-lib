// src/listeners/liquidationListener.ts

import type { Program }         from '@coral-xyz/anchor';
import type { EventEmitter }    from 'events';
import type { Cybergold }       from '../types/idl/cybergold';

import { PublicKey }            from '@solana/web3.js';
import { VaultService }         from '../services/vaultService';
import { debugLog, errorLog }   from '../config/constants';

import type {
    LiquidationTriggered,
} from '../types';

export class LiquidationListener {
    private listenerId?: number;

    constructor(
        private readonly program:      Program<Cybergold>,
        private readonly vaultService: VaultService,
        private readonly emitter:      EventEmitter
    ) {}

    /** Starts listening for CollateralWithdrawn events. */
    public start(): void {
        this.listenerId = this.program.addEventListener(
            'liquidationTriggered',
            this.onLiquidation
        );
        debugLog('LISTENER', `LiquidationListener started, id=${this.listenerId}`);
    }

    /**
     * Internal handler: on CPI `CollateralWithdrawn`, invalidate + refresh cache,
     * then emit both the raw event and the updated vault metrics.
     */
    private onLiquidation = async (
        event:      LiquidationTriggered,
        slot:       number,
        signature:  string
    ): Promise<void> => {
        debugLog(
            'LISTENER',
            `LiquidationTriggered @ slot ${slot}, sig=${signature}`,
            event
        );
        try {
            // For now, the Liquidation Event do not expose the liquidated vault
            // const vaultPk = new PublicKey(event.vault);

            // 1) Invalidate this vault’s caches
            // this.vaultService.invalidateVaultCache(vaultPk);

            // 2) Re-fetch fresh data & metrics NB: Bug if Vault is closed
            // const vaultData    = await this.vaultService.readVaultData(vaultPk);
            // const vaultMetrics = await this.vaultService.getVaultMetrics(vaultPk);

            // 3) Emit the raw CPI event…
            this.emitter.emit('rawLiquidation', { event, slot, signature });
            // …and your enriched vaultUpdate payload
            //this.emitter.emit('vaultUpdate', { vault: vaultData, metrics: vaultMetrics });
        } catch (err: any) {
            errorLog('LISTENER', 'Error in onLiquidation handler:', err);
        }
    };

    /** Stops listening for CollateralWithdrawn events. */
    public async stop(): Promise<void> {
        if (this.listenerId != null) {
            await this.program.removeEventListener(this.listenerId);
            this.listenerId = undefined;
        }
    }
}
