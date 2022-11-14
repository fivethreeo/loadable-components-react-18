const path = require("path");
const clone = require("./clone")


const config = {
    rules: {
        prod: {
            server: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: [
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
                    },
                ],
            }],

            client: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: [
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
                    },
                ],
            }],

        },


        dev: {
            server: [],
            client: []
        }
    },
};

config.rules.dev.server = clone(config.rules.prod.server);
config.rules.dev.client = clone(config.rules.prod.client);

module.exports = config;