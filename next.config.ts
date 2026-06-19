import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/about', destination: '/' },
      { source: '/gallery', destination: '/' },
      { source: '/materials', destination: '/' },
      { source: '/process', destination: '/' },
      { source: '/projects', destination: '/' },
      { source: '/contact', destination: '/' },
    ];
  },
};

export default nextConfig;
