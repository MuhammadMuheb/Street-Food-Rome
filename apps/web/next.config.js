const { withPayload } = require('@payloadcms/next/withPayload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@italy-tours/config',
    '@italy-tours/ui',
    '@italy-tours/seo',
    '@italy-tours/affiliate',
    '@italy-tours/templates',
    '@italy-tours/governance',
  ],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

module.exports = withPayload(nextConfig);
