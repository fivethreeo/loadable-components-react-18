const util = require("util")
const path = require("path");

const shared = require("./shared");
const auto = require("./features/auto")
const typescript = require("./features/typescript");
const assets = require("./features/assets")
const css = require("./features/css");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
  name: "client",
  target: "browserslist:client",
  entry: [path.resolve(__dirname, "../src/index.js")],
  mode: shared.prodMode,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "http://localhost:3000/static/",
  },
  resolve: {
    extensions: shared.extensions
  },
  module: {
    rules: [
      ...auto.rules.prod.client,
      ...typescript.rules.prod.client,
      ...assets.rules.prod.client,
      ...css.rules.prod.client
    ]
  },
  plugins: [
    ...css.plugins.prod.client,
  ],
  optimization: {
    minimize: shared.prodMinimizeClient,
    moduleIds: shared.moduleids,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  stats: {
    colors: true,
  },
};

console.log(util.inspect(config, false, 6, true));

module.exports = config;