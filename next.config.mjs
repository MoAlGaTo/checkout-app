/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/checkout",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
