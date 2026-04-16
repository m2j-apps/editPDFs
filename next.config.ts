import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/how-to-convert-pdf-to-word-for-free",
        destination: "/blog/how-to-convert-pdf-to-word",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.editpdfs.app",
          },
        ],
        destination: "https://editpdfs.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
