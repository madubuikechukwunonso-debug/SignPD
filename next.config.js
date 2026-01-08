/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // For static deployment
  basePath: '/SignPD', // Your repo name
  assetPrefix: '/SignPD/',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Fix routing issues
}

module.exports = nextConfig
