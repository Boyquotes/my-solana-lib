# CyberGold SDK Next.js Demo

This is a Next.js application that demonstrates how to use the CyberGold Solana SDK from the `my-solana-lib` package.

## Setup

1. First, make sure you have built the library in the parent directory:
   ```bash
   cd ..
   npm install
   npm run build
   ```

2. Install the Next.js app dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` to configure your Solana RPC URL if needed.

4. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

The app provides a simple interface to:
- Input a Solana RPC URL (defaults to `NEXT_PUBLIC_RPC` environment variable)
- Input a token account address (defaults to a sample address)
- Fetch and display token account information using the `CyberGoldSDK` from my-solana-lib

## Environment Variables

- `NEXT_PUBLIC_RPC`: The default Solana RPC URL to use (defaults to mainnet if not set)

## Library Usage

The app imports and uses the `CyberGoldSDK` class from the parent library:

```typescript
import { CyberGoldSDK } from 'my-solana-lib'

// Usage
const sdk = new CyberGoldSDK()
const result = await sdk.getTokenAccountInfo(rpcUrl, tokenAccount)
```

## Notes

- The library is imported as a local file dependency (`"my-solana-lib": "file:.."`)
- Make sure to build the library before using it in this Next.js app
- The app includes webpack configuration to handle Solana dependencies in the browser
