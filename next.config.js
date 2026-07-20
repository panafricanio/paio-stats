/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Lint is run separately; don't block production builds on it.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
