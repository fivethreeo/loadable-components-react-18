const util = require("util")
const path = require("path");

const shared = require("./shared");
const auto = require("./auto")
const typescript = require("./typescript");
const assets = require("./assets")
const css = require("./css");

const config = {
  name: "server",
  target: "browserslist:server",
  entry: [path.resolve(__dirname, "../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  mode: shared.prod.mode,
  resolve: {
    extensions: shared.prod.extensions
  },
  module: {
    rules: [
      ...auto.rules.prod.server,
      ...typescript.rules.prod.server,
      ...assets.rules.prod.server,
      ...css.rules.prod.server
    ]
  },
  plugins: [
    ...css.plugins.prod.server,
  ],
  stats: {
    colors: true,
  },
};

console.log(util.inspect(config, false, 6, true));

module.exports = config;