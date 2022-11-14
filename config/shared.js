const clone = require("./clone")

const config = {
    moduleids: "deterministic",
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    prodMode: "production",
    prodMinimizeClient: true,
    devMode: "development"
};

module.exports = config;