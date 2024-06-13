/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.oz-02-main-04.xyz/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
