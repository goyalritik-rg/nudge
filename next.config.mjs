/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },
};
export default nextConfig;
