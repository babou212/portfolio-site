/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
      allowedOrigins: ["localhost:3000", "swagmeister.uk", "www.swagmeister.com"],
    }},
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "www.swagmeister.uk",
          port: '',
          pathname: '/images/**',
        },
      ],
     },
  };

export default config;
