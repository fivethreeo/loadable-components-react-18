import clone from './clone.mjs';
let host = process.env.CODESANDBOX_HOST || '';
let publicpath =  "http://localhost:3001/static/";

import * as url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

if (host) {
    publicpath = `https://${host.replace(/\$PORT/, "3001")}/static/`;
}

const config = {
    moduleids: "deterministic",
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    prodMode: "production",
    prodMinimizeClient: true,
    devMode: "development",
    devPublicpath: publicpath,
    emitOnErrors: true,
    appDir: path.join(__dirname, '..'),
    srcDir: path.join(__dirname, '../src'),
    serverDir: path.join(__dirname, '../server')

};

export default config;