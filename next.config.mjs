/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'api.oz-02-main-04.xyz' }],
  },
};

export default nextConfig;