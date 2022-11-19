const util = require("util")
const path = require("path");

const webpack = require("webpack");
const externals = require("./stubs/externals");
const shared = require("./shared");
const auto = require("./features/auto")
const typescript = require("./features/typescript");
const assets = require("./features/assets")
const css = require("./features/css");

const StartServerPlugin = require("razzle-start-server-webpack-plugin");

const config = {
  name: "server",
  dependencies: ["client"],
  target: "browserslist:server",
  entry: [path.resolve(__dirname, "../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  mode: shared.devMode,
  resolve: {
    extensions: shared.extensions
  },
  externals: externals,
  module: {
    rules: [
      ...auto.rules.dev.server,
      ...typescript.rules.dev.server,
      ...assets.rules.dev.server,
      ...css.rules.dev.server
    ]
  },
  plugins: [
    ...css.plugins.dev.server,
    new StartServerPlugin({ entryName: "main", signal: 'SIGTERM' }),
    new webpack.ContextReplacementPlugin(
      // we want to replace context
      /express\/lib/,                    // and replace all searches in
      // express/lib/*
      path.resolve('node_modules'),      // to look in folder 'node_modules'
      {                                  // and return a map
        'ejs': 'ejs'                     // which resolves request for 'ejs'
      }                                  // to module 'ejs'
    )                                    // __webpack_require__(...)(mod)
    ,    // No need for any caniuse regions data (for require context in browserslist)
    new webpack.ContextReplacementPlugin(
      /caniuse-lite[\/\\]data[\/\\]regions/,
      /^$/,
    ),
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