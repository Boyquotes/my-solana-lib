# Next.js Solana Library Demo

This is a Next.js application that demonstrates how to use the `my-solana-lib` library.

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

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

The app provides a simple interface to:
- Input a Solana RPC URL
- Input a token account address
- Fetch and display token account information using the `my-solana-lib` library

## Library Usage

The app imports and uses the `getTokenAccountInfo` function from the parent library:

```typescript
import { getTokenAccountInfo } from 'my-solana-lib'

// Usage
const result = await getTokenAccountInfo(rpcUrl, tokenAccount)
```

## Notes

- The library is imported as a local file dependency (`"my-solana-lib": "file:.."`)
- Make sure to build the library before using it in this Next.js app
- The app includes webpack configuration to handle Solana dependencies in the browser
