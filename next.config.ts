import path from "path";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  webpack(config: any) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  env: {
    APP_ENV: process.env.APP_ENV || "development",
  },
  reactStrictMode: true,
  experimental: {
    serverActions: true, 
  },
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    disable: isDev, 
    register: true,
    skipWaiting: true,
  },
});
