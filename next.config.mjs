/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply this header to all routes
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'dev.terrahacks.ca',
        port: '',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'terrahacks.ca',
        port: '',
        pathname: '/assets/**',
      }
    ],
  },
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  }
};

export default nextConfig;