import path from 'path';
import clone from '../clone.mjs';
import shared from '../shared.mjs';

const config = {
    prod: {
        server: [
            {
                loader: "@elzzad/dazzle-babel-loader",
                options: {

                    dazzleBuildName: "server",
                    isServer: true,
                    cwd: shared.appDir,
                    browserslistEnv: "server",
                    cache: true,
                    babelPresetPlugins: [],
                    hasModern: false,
                },

            }
        ],

        client: [
            {

                loader: "@elzzad/dazzle-babel-loader",
                options: {

                    dazzleBuildName: "client",
                    isServer: false,
                    cwd: shared.appDir,
                    browserslistEnv: "client",
                    cache: true,
                    babelPresetPlugins: [],
                    hasModern: false,
                },


            }
        ],
    },

    dev: {
        server: [],
        client: []
    }
};

config.dev.server = clone(config.prod.server);
config.dev.client = clone(config.prod.client);

export default config;