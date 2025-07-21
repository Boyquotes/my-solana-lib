// token-account-info.ts

import { Connection, PublicKey } from '@solana/web3.js';
import { getAccount } from '@solana/spl-token';

(async () => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');

  // 📌 Example Token Account
  const tokenAccount = new PublicKey('8u2nVU6K39dKCVhcdtrzXHcVGc71o43nZPp8nDqQvM4x');

  const accountInfo = await getAccount(connection, tokenAccount);

  console.log('Token Account Info:', accountInfo);
})();

