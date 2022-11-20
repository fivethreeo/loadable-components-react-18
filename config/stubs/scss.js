// https://webpack.js.org/loaders/sass-loader/
// pnpm add -D sass-loader sass
const path = require("path");
const clone = require("../clone")

const config = {
    prod: {
        server: [
            {
                loader: 'resolve-url-loader',
            }, 
            {
              loader: "sass-loader",
              options: {
                sourceMap: true, // <-- !!IMPORTANT!!
                sassOptions: {
                  indentWidth: 4,
                  includePaths: [],
                },
              },
            }
        ],

        client: [
        ],
    },

    dev: {
        server: [],
        client: []
    }
};

config.prod.client = clone(config.prod.server);
config.dev.server = clone(config.prod.server);
config.dev.client = clone(config.prod.client);

module.exports = config;