import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Allow static export for GitHub Pages if needed
  // output: 'export', // uncomment for static export
};

export default nextConfig;
