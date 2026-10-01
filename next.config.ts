import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["three"],
  images: { unoptimized: true },
};

export default nextConfig;
