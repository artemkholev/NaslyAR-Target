const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const svg = require("@neodx/svg/webpack");

module.exports = {
  images: {
    unoptimized: true,
    domains: ["st.kp.yandex.net", "avatars.mds.yandex.net", "themoviedb.org"],
  },
  env: {
    API_TOKEN: process.env.API_TOKEN,
    API_URL: process.env.API_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "client",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          admin: "admin@http://localhost:3001/remoteEntry.js",
          auth: "auth@http://localhost:3003/remoteEntry.js",
        },
        exposes: {
          "./ClientApp": "./src/pages/index.js",
        },
        shared: {},
      }),
      svg({
        group: true,
        root: "src/shared/ui/icon/assets",
        output: "public/sprite",
        resetColors: false,
        metadata: "src/shared/ui/icon/sprite.h.ts",
      })
    );
    return config;
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
};
