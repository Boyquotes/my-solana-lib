// mint-info.ts

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';

(async () => {
  // 🔗 Use a real RPC endpoint — replace if needed
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  // 📌 DFL Mint Address
  const mintAddress = new PublicKey('DFL1zNkaGPWm1BqAVqRjCZvHmwTFrEaJtbzJWgseoNJh');

  // ✅ Get Mint Info
  const mintInfo = await getMint(connection, mintAddress);

  console.log('DFL Mint Info:', mintInfo);
})();

