const path = require("path");
const clone = require("../clone")


const config = {
    prod: {
        server: [
            {
                loader: "@elzzad/dazzle-babel-loader",
                options: {

                    dazzleBuildName: "server",
                    isServer: true,
                    cwd: path.join("..", __dirname),
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
                    cwd: path.join("..", __dirname),
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

module.exports = config;