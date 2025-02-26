const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const deps = require("./package.json").dependencies;

const configs = {
  appName: "auth",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3003/",
    CONTAINER_PATH: "host@http://localhost:3000/remoteEntry.js",
    PORT: 3003,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3003/",
    CONTAINER_PATH: "host@http://localhost:3000/remoteEntry.js",
    PORT: 3003,
  },
};

module.exports = (env, argv) => {
  console.log({ env, argv, configs: configs[argv.mode] });
  return {
    entry: "./src/index.ts",
    output: {
      publicPath: configs[argv.mode].PUBLIC_PATH,
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      hot: true,
      port: configs[argv.mode].PORT,
      historyApiFallback: true,
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      },
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { importLoaders: 1, sourceMap: true },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.svg$/,
          type: "asset/resource",
          generator: {
            filename: "icons/[name][ext]",
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot|otf)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        remotes: {
          container: configs[argv.mode].CONTAINER_PATH,
        },
        exposes: {
          "./AuthPage": "./src/pages/auth-page/ui/AuthPage.tsx",
        },
        shared: {
          ...deps,
          react: { singleton: true, requiredVersion: deps.react },
          "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
