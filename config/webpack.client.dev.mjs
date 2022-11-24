import util from 'util';
import path from 'path';
import webpack from 'webpack';
import shared from './shared.mjs';
import auto from './features/auto.mjs';
import typescript from './features/typescript.mjs';
import assets from './features/assets.mjs';
import css from './features/css.mjs';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const config = {
  name: "client",
  target: "browserslist:client",
  context: shared.appDir,
  entry: [path.resolve(__dirname, "../src/index.js")],
  mode: shared.devMode,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: shared.devPublicpath
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
      new LoadablePlugin(),
      // No need for any caniuse regions data (for require context in browserslist)
      new webpack.ContextReplacementPlugin(
        /caniuse-lite[\/\\]data[\/\\]regions/,
        /^$/,
      ),
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
    allowedHosts: "all",
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

export default config;