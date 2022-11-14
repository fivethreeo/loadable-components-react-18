
const clone = require("./clone")

const config = {
    rules: {
        prod: {
            server: [],
            client: [],
        },


        dev: {
            server: [],
            client: [],
        }
    },
    plugins: {
        prod: {
            server: [],
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

config.plugins.prod.client = clone(config.plugins.prod.server);
config.plugins.dev.server = clone(config.plugins.prod.server);
config.plugins.dev.client = clone(config.plugins.prod.server);

module.exports = config;