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
  experimental: {
    allowDevelopmentBuild: true,
  },
};

export default nextConfig;
