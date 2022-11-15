const util = require("util")
const path = require("path");

const shared = require("./shared");
const auto = require("./features/auto")
const typescript = require("./features/typescript");
const assets = require("./features/assets")
const css = require("./features/css");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const LoadablePlugin = require('@loadable/webpack-plugin')

const config = {
  name: "client",
  target: "browserslist:client",
  entry: [path.resolve(__dirname, "../src/index.js")],
  mode: shared.devMode,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "http://localhost:3001/static/",
  },
  resolve: {
    extensions: shared.extensions
  },
  module: {
    rules: [
      ...auto.rules.dev.client,
      ...typescript.rules.dev.client,
      ...assets.rules.dev.client,
      ...css.rules.dev.client
    ]
  },
  plugins: [
    ...css.plugins.dev.client,
    new LoadablePlugin()
  ],
  optimization: {
    minimize: shared.devMinimizeClient,
    moduleIds: shared.moduleids,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  stats: {
    colors: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../public'),
    },
    devMiddleware: {
      writeToDisk: true
    },
    port: 3001,
  },
};

console.log(util.inspect(config, false, 6, true));

module.exports = config;