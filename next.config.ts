import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Post-it-inspired-note-taking-app",
  images: { unoptimized: true },
  /*
   allows for ngrok to be ran on my mobile,
   run 'ngrok http 3000' in new console after npm run dev in other console
  */
  allowedDevOrigins: ["*.ngrok-free.dev"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;