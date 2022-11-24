import util from 'util';
import path from 'path';
import webpack from 'webpack';
import externals from './stubs/externals.mjs';
import shared from './shared.mjs';
import auto from './features/auto.mjs';
import typescript from './features/typescript.mjs';
import assets from './features/assets.mjs';
import css from './features/css.mjs';
import StartServerPlugin from 'razzle-start-server-webpack-plugin';

import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const config = {
  name: "server",
  dependencies: ["client"],
  target: "browserslist:server",
  entry: [path.resolve(__dirname, "../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
    publicPath: shared.devPublicpath
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

export default config;