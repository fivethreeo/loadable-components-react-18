const util = require("util")
const path = require("path");

const shared = require("./shared");
const auto = require("./features/auto")
const typescript = require("./features/typescript");
const assets = require("./features/assets")
const css = require("./features/css");

const config = {
  name: "server",
  target: "browserslist:server",
  entry: [path.resolve(__dirname, "../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  mode: shared.prodMode,
  resolve: {
    extensions: shared.extensions
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
  optimization: {
    moduleIds: shared.moduleids
  },
  stats: {
    colors: true,
  },
};

console.log(util.inspect(config, false, 6, true));

module.exports = config;