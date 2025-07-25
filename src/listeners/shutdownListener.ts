// sdk/listeners/shutdownListener.ts
import type { EventEmitter } from 'events';

export class ShutdownListener {
    constructor(
        private readonly depositListener:       { stop(): Promise<void> | void },
        private readonly withdrawListener:      { stop(): Promise<void> | void },
        private readonly mintListener:          { stop(): Promise<void> | void },
        private readonly burnListener:          { stop(): Promise<void> | void },
        private readonly liquidationListener:   { stop(): Promise<void> | void },
        private readonly priceFeedListener:     { stop(): void },
        private readonly connection:            any,    // socket internals
        private readonly program:               any     // anchor rpc client internals
    ) {}

    public async shutdown() {
        await this.depositListener.stop();
        await this.withdrawListener.stop();
        await this.mintListener.stop();
        await this.burnListener.stop();
        await this.liquidationListener.stop();
        this.priceFeedListener.stop();

        // terminate web3 websocket
        (this.connection as any)?._rpcWebSocket?.terminate?.();

        // terminate Anchor’s websocket
        const evm = (this.program as any)?._events;
        (evm?._rpcClient || evm?._client)?.terminate?.();

        // destroy HTTP agent
        const transport = (this.connection as any)?._rpcClient?._transport;
        transport?.agent?.destroy?.();
    }
}
