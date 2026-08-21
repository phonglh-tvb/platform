//@ts-check

const apiUrl = process.env.API_URL ?? 'http://localhost:3333';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits a self-contained server bundle — see apps/web/Dockerfile.
  output: 'standalone',
  // The monorepo root, so tracing picks up files outside apps/web.
  outputFileTracingRoot: require('path').join(__dirname, '../../'),
  async rewrites() {
    return [
      // Browser calls /backend/* on the Next origin; Next forwards to the Nest
      // API. Keeps `/api/*` free for Next's own route handlers and avoids CORS.
      {
        source: '/backend/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
