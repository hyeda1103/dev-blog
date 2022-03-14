/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    APP_NAME: "dev-blog",
    API: "http://localhost:8000/api",
    PRODUCTION: false,
    DOMAIN: "http://localhost:3000",
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
