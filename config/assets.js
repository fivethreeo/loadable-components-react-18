const clone = require("./clone")

const fileLoaderExclude = [
    /\.html$/,
    /\.(js|jsx|mjs)$/,
    /\.(ts|tsx)$/,
    /\.(vue)$/,
    /\.(less)$/,
    /\.(re)$/,
    /\.(s?css|sass)$/,
    /\.json$/,
    /\.bmp$/,
    /\.gif$/,
    /\.jpe?g$/,
    /\.png$/
];

const urlLoaderTest = [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/];

const config = {
    rules: {
        prod: {
            server: [
                {
                    exclude: fileLoaderExclude, type: "asset/resource",
                    generator: {
                        filename: 'image/[hash][ext][query]'
                    }
                },
                {
                    test: urlLoaderTest,
                    generator: {
                        filename: 'image/[hash][ext][query]'
                    },
                    parser: {
                        dataUrlCondition: {
                            maxSize: 4 * 1024 // 4kb
                        }

                    }
                }
            ],
            client: [],
        },


        dev: {
            server: [],
            client: [],
        }
    },
};

config.rules.prod.client = clone(config.rules.prod.server);
config.rules.dev.server = clone(config.rules.prod.server);
config.rules.dev.client = clone(config.rules.prod.server);

module.exports = config;