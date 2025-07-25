// sdk/listeners/depositListener.ts

import type { Program }         from '@coral-xyz/anchor';
import type { EventEmitter }    from 'events';
import { PublicKey }            from '@solana/web3.js';
import { VaultService }         from '../services/vaultService';
import { debugLog, errorLog }   from '../config/constants';
import { Cybergold }            from 'types/idl/cybergold';

import type { 
    Vault,
    VaultMetrics,
    CollateralDeposited,
} from '../types';


export class DepositListener {
    private listenerId?: number;

    constructor(
        private readonly program: Program<Cybergold>,
        private readonly vaultService: VaultService,
        private readonly emitter: EventEmitter
    ) {}

    /**
     * Starts listening for CollateralDeposited events.
     */
    public start(): void {
        this.listenerId = this.program.addEventListener(
            'collateralDeposited',
            this.onDeposit
        );
        debugLog('LISTENER', `DepositListener started, id=${this.listenerId}`);
    }

    /**
     * Internal handler: invalidate + refresh cache, then emit updated vault metrics
     */
    private onDeposit = async (
        event: CollateralDeposited,
        slot: number,
        signature: string
    ): Promise<void> => {
        debugLog('LISTENER', `CollateralDeposited @ slot ${slot}, sig=${signature}`, event);
        try {
            const vaultPk = new PublicKey(event.vault);

            // 1) Invalidate this vault’s caches
            this.vaultService.invalidateVaultCache(vaultPk);

            // 2) Re-fetch fresh data & metrics
            const vaultData: Vault    = await this.vaultService.readVaultData(vaultPk);
            const vaultMetrics: VaultMetrics = await this.vaultService.getVaultMetrics(vaultPk);

            // 3) Emit updated vault payload (you can choose data vs metrics)
            this.emitter.emit('rawDeposit', { event, slot, signature });
            this.emitter.emit('vaultUpdate', { vault: vaultData, metrics: vaultMetrics });
        } catch (err: any) {
            errorLog('LISTENER', 'Error in onDeposit handler:', err);
        }
    };

    /**
     * Stops listening for CollateralDeposited events.
     */
    public async stop() {
        if (this.listenerId != null) {
            await this.program.removeEventListener(this.listenerId);
            this.listenerId = undefined;
        }
    }
}
