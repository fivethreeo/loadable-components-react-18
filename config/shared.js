const clone = require("./clone")

const config = {
    prod: {
        moduleids: "deterministic",
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        mode: "production"
    },

    dev: {}
};

config.dev = Object.assign(
    clone(config.prod),
    { mode: "development" }
);

module.exports = config;