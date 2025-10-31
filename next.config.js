/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com'],
  },
  // Enable SSR for Netlify
  trailingSlash: true,
};

module.exports = nextConfig;