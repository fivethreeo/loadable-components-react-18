const util = require("util")
const path = require("path");


const shared = require("./shared");
const auto = require("./auto")
const typescript = require("./typescript");
const assets = require("./assets")
const css = require("./css");
const { should } = require("chai");

const config = {
  name: "server",
  target: "browserslist:client",
  entry: [path.resolve(__dirname, "../src/index.js")],
  mode: shared.prod.mode,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "http://localhost:3000/static/",
  },
  resolve: {
    extensions: shared.prod.extensions
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
  stats: {
    colors: true,
  },
};

console.log(util.inspect(config, false, 6, true));

module.exports = config;