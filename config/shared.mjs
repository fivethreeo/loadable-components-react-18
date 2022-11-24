import clone from './clone.mjs';
let host = process.env.CODESANDBOX_HOST || '';
let publicpath =  "http://localhost:3001/static/";

if (host) {
    publicpath = `https://${host.replace(/\$PORT/, "3001")}/static/`;
}

const config = {
    moduleids: "deterministic",
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    prodMode: "production",
    prodMinimizeClient: true,
    devMode: "development",
    devPublicpath: publicpath
};

export default config;