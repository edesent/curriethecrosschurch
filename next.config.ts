import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The parent CRM folder has its own lockfile; pin the root so Turbopack
  // does not pick the wrong one.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      { source: "/van", destination: "/ride", permanent: false },
      { source: "/turkey", destination: "/turkey-giveaway", permanent: false },
      { source: "/coats", destination: "/turkey-giveaway#coats", permanent: false },
      { source: "/giving", destination: "/give", permanent: true },
      { source: "/donate", destination: "/give", permanent: true },
      { source: "/givelify", destination: "https://giv.li/06so98", permanent: false },
      { source: "/cashapp", destination: "https://cash.app/$curriethecrosschurch", permanent: false },
      { source: "/live", destination: "/watch", permanent: false },
      { source: "/sermons", destination: "/watch", permanent: false },
      { source: "/pastors", destination: "/about", permanent: true },
      { source: "/prayer", destination: "/contact#prayer", permanent: false },
      { source: "/school", destination: "/about#family", permanent: false },
    ];
  },
};

export default nextConfig;
