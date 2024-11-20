/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hoteldel.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.bubbleup.com",
      },
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // This is for deployment build for STATIC firebase deployment
  //output: "export",

  // Mapping internally with backend api
  async rewrites() {
    const rewrites = [];

    const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "";

    rewrites.push({
      source: "/auth/:path*",
      destination: `${API_HOST}/auth/:path*`,
    });

    // rewrites.push({
    //   source: "/:path*",
    //   destination: `${API_HOST}/:path*`,
    // });

    return rewrites;
  },
};

export default nextConfig;
