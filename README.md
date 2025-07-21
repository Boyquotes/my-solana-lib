# my-solana-lib

A simple Solana JS library that works in Node.js and the browser.

## Install

```bash
npm install my-solana-lib
```

## Use in Node

```ts
import { getTokenAccountInfo, ensureNodeFetch } from 'my-solana-lib';

await ensureNodeFetch(); // Node < 18
const info = await getTokenAccountInfo(
  'https://api.mainnet-beta.solana.com',
  'YOUR_TOKEN_ACCOUNT'
);
console.log(info);
```

## Use in React

```tsx
import { getTokenAccountInfo } from 'my-solana-lib';

const info = await getTokenAccountInfo(
  'https://api.mainnet-beta.solana.com',
  'YOUR_TOKEN_ACCOUNT'
);
console.log(info);
```
