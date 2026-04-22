/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-*.r2.dev", // R2 default public domain
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // R2 default public domain
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
