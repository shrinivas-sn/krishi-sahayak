import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  // @ts-ignore
  allowedDevOrigins: ['10.9.6.115'],
};

export default nextConfig;
