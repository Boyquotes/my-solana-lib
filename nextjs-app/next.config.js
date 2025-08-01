/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Transpile problematic dependencies
  transpilePackages: ['my-solana-lib', 'jito-ts', '@solana/web3.js', '@pythnetwork/solana-utils', '@pythnetwork/pyth-solana-receiver'],
  webpack: (config, { isServer }) => {
    // // Add alias for the problematic import
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   'rpc-websockets/dist/lib/client': require.resolve('rpc-websockets/dist/lib/client')
    // };

    // Add fallbacks for Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      path: false,
      crypto: false,
      os: false,
      stream: false,
    };
    
    // Enable WebAssembly support
    config.experiments = {
      ...(config.experiments || {}),
      asyncWebAssembly: true,
    };

    // Let Webpack treat .wasm files as assets
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });

    return config;
  },
}

module.exports = nextConfig
