import util from 'util';
import path from 'path';
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
  entry: [path.resolve(__dirname, "../src/index.js")],
  mode: shared.prodMode,
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
      ...auto.rules.prod.client,
      ...typescript.rules.prod.client,
      ...assets.rules.prod.client,
      ...css.rules.prod.client
    ]
  },
  plugins: [
    ...css.plugins.prod.client,
    new LoadablePlugin(),
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

export default config;