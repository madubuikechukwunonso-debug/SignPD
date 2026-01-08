/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SignPD',
  assetPrefix: '/SignPD/',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Fix for Mantine + Next.js
  modularizeImports: {
    '@mantine/core': {
      transform: '@mantine/core/{{member}}',
    },
    '@mantine/hooks': {
      transform: '@mantine/hooks/{{member}}',
    },
  },
}

export default nextConfig
