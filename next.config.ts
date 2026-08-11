import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/plan", destination: "/services", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      {
        source: "/portfolio-collections/:path*",
        destination: "/work",
        permanent: true,
      },
      { source: "/book-online", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
