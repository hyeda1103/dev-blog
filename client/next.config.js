/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    APP_NAME: "dev-blog",
    // API: "http://localhost:8000/api",
    API: "/api",
    PRODUCTION: true,
    DOMAIN: "http://43.200.72.175",
    FB_APP_ID: "JADLKMJKMCAIDK",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
