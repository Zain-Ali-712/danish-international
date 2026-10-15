import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash's CDN resizes and serves AVIF/WebP itself; see src/lib/imageLoader.ts.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    qualities: [70, 75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "danish-international.com",
      },
    ],
  },
};

export default nextConfig;
