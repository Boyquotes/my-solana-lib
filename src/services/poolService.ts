// src/services/poolService.ts
import initCybergoldWasm, { compute_pool_ur } from '../../wasm-cybergold/cybergold_wasm.js';

/**
 * Service for pool-related functionality including utilization rate calculations
 */
export class PoolService {
  private static _wasmReady: Promise<void> | null = null;

  constructor() {
    // Initialize when service is created
    this.ensureWasmInitialized().catch(e => 
      console.error("Error initializing cybergold WASM in PoolService:", e)
    );
  }

  /**
   * Ensure the WASM module is initialized
   */
  private async ensureWasmInitialized(): Promise<void> {
    if (!PoolService._wasmReady) {
      try {
        // Determine the correct path to the wasm file for different environments
        let wasmPath;
        
        if (typeof window !== 'undefined') {
          // In browser environment, use a simpler path that Next.js can resolve
          wasmPath = '/cybergold_wasm_bg.wasm';
        } else {
          // In Node.js, use a path relative to the consuming package
          wasmPath = './cybergold_wasm_bg.wasm';
        }
        
        PoolService._wasmReady = initCybergoldWasm(wasmPath).then(() => undefined);
      } catch (err) {
        // Fallback to a simple relative path as last resort
        console.warn('WASM cybergold initialization error in PoolService, trying fallback:', err);
        PoolService._wasmReady = initCybergoldWasm('/cybergold_wasm_bg.wasm').then(() => undefined);
      }
    }
    return PoolService._wasmReady;
  }

  /**
   * Call WASM method compute_pool_ur to calculate pool utilization rate
   * @param collateralAmount Amount of collateral tokens
   * @param syntheticAmount Amount of synthetic tokens
   * @returns The pool utilization rate as a number between 0 and 1
   */
  public async appel_compute_pool_ur(collateralAmount: number, syntheticAmount: number): Promise<number> {
    // Make sure WASM is initialized
    await this.ensureWasmInitialized();
    
    // Convert parameters to BigInt as the WASM function expects BigInts
    const result = compute_pool_ur(BigInt(collateralAmount), BigInt(syntheticAmount));
    
    // Convert the result back to number for easier use
    return Number(result);
  }

  /**
   * Simple JavaScript method that prints hello
   */
  public sayHello(): void {
    console.log("Hello from PoolService!");
  }

  /**
   * Format utilization rate as percentage for display
   * @param ur Utilization rate as decimal (0-1)
   * @returns Formatted percentage string
   */
  public formatUtilizationRate(ur: number): string {
    return `${(ur * 100).toFixed(2)}%`;
  }
}
