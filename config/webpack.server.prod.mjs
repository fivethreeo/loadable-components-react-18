import util from 'util';
import path from 'path';
import externals from './stubs/externals.mjs';
import shared from './shared.mjs';
import auto from './features/auto.mjs';
import typescript from './features/typescript.mjs';
import assets from './features/assets.mjs';
import css from './features/css.mjs';

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
  mode: shared.prodMode,
  resolve: {
    extensions: shared.extensions
  },
  externals: externals,
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

export default config;