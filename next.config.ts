import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.111.70.155',
        port: '8800',
        pathname: '/uploads/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://10.111.70.155:8800/api/:path*',
      },
    ];
  },

  experimental: {
    allowDevelopmentBuild: true,
  },
};

export default nextConfig;
