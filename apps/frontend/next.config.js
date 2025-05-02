/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configure image domains for external images
  images: {
    domains: [
      'example.com', // Add your actual image domains here
      'images.unsplash.com',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // API rewrites to proxy requests to the backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/api/:path*' // Proxy to backend
      }
    ]
  }
}

module.exports = nextConfig
