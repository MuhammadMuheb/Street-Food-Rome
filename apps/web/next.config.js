/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@italy-tours/config',
    '@italy-tours/ui',
    '@italy-tours/seo',
    '@italy-tours/affiliate',
    '@italy-tours/templates',
    '@italy-tours/firebase',
  ],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

module.exports = nextConfig;
