const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;

const configs = {
  appName: "host",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3000/",
    REMOTE_PATHS: {
      user: "user@http://localhost:3001/remoteEntry.js",
      admin: "admin@http://localhost:3002/remoteEntry.js",
      auth: "auth@http://localhost:3003/remoteEntry.js",
    },
    PORT: 3000,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3000/",
    REMOTE_PATHS: {
      user: "user@http://localhost:3001/remoteEntry.js",
      admin: "admin@http://localhost:3002/remoteEntry.js",
      auth: "auth@http://localhost:3003/remoteEntry.js",
    },
    PORT: 3000,
  },
};

module.exports = (env, argv) => {
  console.log({ env, argv, configs: configs[argv.mode] });

  return {
    entry: "./src/index.ts",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: configs[argv.mode].PUBLIC_PATH,
      clean: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    devServer: {
      hot: true,
      static: {
        directory: path.join(__dirname, "public"),
      },
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
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
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
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, ".env"), // explicitly specify the .env path
        safe: false, // set to true if you use .env.example
        systemvars: true, // load system environment variables as well
      }),
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        // remotes: configs[argv.mode].REMOTE_PATH,
        remotes: {
          auth: "auth@http://localhost:3003/remoteEntry.js",
        },
        exposes: {
          "./useAuth": "./src/features/auth/hooks/useAuth.ts"
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
