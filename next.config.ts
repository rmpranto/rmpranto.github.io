import type { NextConfig } from 'next';

// This repository is rmpranto/rmpranto.github.io, a USER Pages site.
// Paths are hosted at the domain root, so no basePath or assetPrefix is needed.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // GitHub Pages cannot run the Next image optimizer
    remotePatterns: [{ protocol: 'https', hostname: 'rmpranto.github.io', pathname: '/assets/img/**' }],
  },
};

export default nextConfig;
