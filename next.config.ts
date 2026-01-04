import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["dragonball-api.com"],
  },
};

export default nextConfig;

