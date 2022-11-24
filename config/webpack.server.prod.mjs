import util from 'util';
import path from 'path';
import externals from './stubs/externals.mjs';
import shared from './shared.mjs';
import auto from './features/auto.mjs';
import typescript from './features/typescript.mjs';
import assets from './features/assets.mjs';
import css from './features/css.mjs';

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
    library: { type: "commonjs-module" },
  },
  mode: shared.prodMode,
  resolve: {
    extensions: shared.extensions
  },
  module: {
    strictExportPresence: true,
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
    moduleIds: shared.moduleids,
    emitOnErrors: shared.emitOnErrors,
    minimize: false
  },
  stats: {
    colors: true,
  },
};

console.log(util.inspect(config, false, 6, true));

export default config;