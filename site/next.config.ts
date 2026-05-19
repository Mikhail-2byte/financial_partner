import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/uslugi",
        destination: "/tarify",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
