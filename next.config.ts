import type { NextConfig } from "next";

// GitHub Pages serves the site under https://hjdeysi.github.io/taller-claude-upc.
// basePath/assetPrefix prefix every Next-generated URL with the repo name so
// links and Image() sources resolve correctly under that subpath. Locally
// (npm run dev), basePath is empty so the dev server still serves at /.
const repoBasePath = process.env.GITHUB_PAGES === "true" ? "/taller-claude-upc" : "";

const config: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: repoBasePath,
  assetPrefix: repoBasePath,
  images: {
    // GitHub Pages is pure static hosting — no Node runtime for the
    // Image Optimization API. Disable it so <Image> emits the raw URL.
    unoptimized: true,
  },
};

export default config;
