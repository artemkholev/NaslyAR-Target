const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const path = require("path");
const deps = require("./package.json").dependencies;

const configs = {
  appName: "remote",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3001/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3001,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3001/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3001,
  },
};

module.exports = (phase, { defaultConfig }) => {
  const mode = process.env.NODE_ENV || "development";

  return {
    ...defaultConfig,

    webpack(config) {
      // Добавление плагина NextFederationPlugin для модуля федерации
      config.plugins.push(
        new NextFederationPlugin({
          name: configs.appName,
          filename: configs.appFileName,
          remotes: {
            container: configs[mode].CONTAINER_PATH,
          },
          exposes: {
            "./TestPage": "./pages/test/index.tsx", // Путь к компоненту, который будет экспонирован
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        })
      );

      // Возвращаем конфиг с обновленными настройками
      return config;
    },

    // Отключаем webpackDevMiddleware, так как эта настройка больше не поддерживается

    devIndicators: {
      autoPrerender: false,
    },

    experimental: {},

    // Устанавливаем серверный порт для разных режимов
    serverRuntimeConfig: {
      port: configs[mode].PORT,
    },
  };
};
