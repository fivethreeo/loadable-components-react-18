
const clone = require("./clone")

const config = {
    rules: {
        prod: {
            server:[
            {
                test: /\.m?js$/,
                include: /node_modules/,
                type: "javascript/auto",
            }],

            client: []
        },


        dev: {
            server: [],
            client: []
        }
    },
};

config.rules.prod.client = clone(config.rules.prod.server);
config.rules.dev.server = clone(config.rules.prod.server);
config.rules.dev.client = clone(config.rules.prod.server);

module.exports = config;