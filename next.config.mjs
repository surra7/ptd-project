/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'api.petodo.today' }],
  },
};

export default nextConfig;
