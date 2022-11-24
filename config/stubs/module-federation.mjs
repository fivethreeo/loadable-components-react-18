import { dependencies as deps } from '../package.json.mjs';
import 'webpack';
import { NodeFederationPlugin, StreamingTargetPlugin } from '@module-federation/node';

export default {
    client: new ModuleFederationPlugin({
        name: "shell",
        filename: "container.js",
        remotes: {
            remote1: "remote1@http://localhost:3001/client/remoteEntry.js",            
        },
        shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
    }),
    server: [
        new NodeFederationPlugin({
            name: "shell",
            library: { type: "commonjs-module" },
            filename: "remoteEntry.js",
            remotes: {
                remote1: "remote1@http://localhost:3001/server/remoteEntry.js"
            },
            shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
        }),
        new StreamingTargetPlugin({
            name: "shell",
            library: { type: "commonjs-module" },            
            remotes: {
                remote1: "remote1@http://localhost:3001/server/remoteEntry.js"
            },
        }),
    ]
};