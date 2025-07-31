/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    // Enable WebAssembly support
    config.experiments = {
      ...(config.experiments || {}),
      asyncWebAssembly: true,
    };

    // Let Webpack treat .wasm files as assets so `new URL('file.wasm', import.meta.url)` works
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });

    return config;
  },
}

module.exports = nextConfig
