const { ModuleFederationPlugin } = require("webpack").container;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    port: 3000, // Порт для контейнера
    historyApiFallback: true, // Для маршрутизации в React/Next.js
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // Расширения для модулей
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "tsconfig.json"), // Подключаем пути из tsconfig.json
      }),
    ],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Для обработки TypeScript
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Для обработки CSS (TailwindCSS)
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        admin: "admin@http://localhost:3001/remoteEntry.js",
        client: "client@http://localhost:3002/_next/static/chunks/remoteEntry.js",
        auth: "auth@http://localhost:3003/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
};
