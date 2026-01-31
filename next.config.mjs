/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config, { isServer }) {
    // keep SVG rule
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // force react-dnd & framer-motion to stay out of server bundle
    if (isServer) {
      config.externals.push(
        "react-dnd",
        "react-dnd-html5-backend",
        "framer-motion"
      );
    }

    return config;
  },
};

export default nextConfig;
