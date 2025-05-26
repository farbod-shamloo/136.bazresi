import path from "path";

const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  env: {
    APP_ENV: process.env.APP_ENV || "development",
  },
};

export default nextConfig;
