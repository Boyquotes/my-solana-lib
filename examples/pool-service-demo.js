// Example usage of the PoolService to compute pool utilization rate

// Import the PoolService from our library
import { PoolService } from '../dist/index.esm.js';

async function main() {
  try {
    // Create a new instance of the PoolService
    const poolService = new PoolService();
    
    // Use the simple JS method
    poolService.sayHello();
    
    // Test different collateral and synthetic amounts
    const testCases = [
      { collateral: 100, synthetic: 50 },    // 50% utilization
      { collateral: 200, synthetic: 200 },    // 100% utilization
      { collateral: 1000, synthetic: 500 },   // 50% utilization
      { collateral: 0, synthetic: 100 },      // 0% (should be capped)
      { collateral: 100, synthetic: 200 }     // 200% (should be capped at 100%)
    ];
    
    console.log("Testing pool utilization rate calculations:");
    console.log("-------------------------------------------");
    
    // Process each test case
    for (const { collateral, synthetic } of testCases) {
      const utilizationRate = await poolService.appel_compute_pool_ur(collateral, synthetic);
      console.log(
        `Collateral: ${collateral}, Synthetic: ${synthetic} => ` +
        `Utilization Rate: ${poolService.formatUtilizationRate(utilizationRate)}`
      );
    }
    
    console.log("\nAll tests completed successfully!");
  } catch (error) {
    console.error("Error in pool service demo:", error);
  }
}

// Run the demo
main();
