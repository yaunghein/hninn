import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/concept',
        destination: '/about',
        permanent: true,
      },
    ]
  },
  images: {
    // 90 is used by the about page story images
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
