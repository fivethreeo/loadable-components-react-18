const clone = require("./clone")

const config = {
    prod: {
        moduleids: "deterministic",
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    dev: {}
};

config.dev = clone(config.prod);

module.exports = config;