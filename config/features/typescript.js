const path = require("path");
const clone = require("../clone")
const typescript = require("../stubs/typescript")

const config = {
    rules: {
        prod: {
            server: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: typescript.prod.server
            }],

            client: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: typescript.prod.client
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