// https://webpack.js.org/loaders/css-loader/
const clone = require("../clone")
const minicssextract = false ? require('../stubs/minicssextract') : false;
const scss = false ? require('../stubs/scss') : false

const postCssOptions = {
    sourceMap: false,
    plugins: [
        "autoprefixer", {
            env: "client"
        }
    ],
};

const config = {
    rules: {
        prod: {
            server: [{
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                auto: true,
                                exportOnlyLocals: true,
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            },
                        }
                    }, ...(scss ? scss.prod.server : [])]
            }],

            client: [{
                test: /\.css$/,
                use: [...(minicssextract ? minicssextract.loaders.prod.client : []),
                    {
                    loader: "css-loader",
                    options: {
                        sourceMap: false,
                        importLoaders: 1,
                        modules: {
                            auto: true,
                            localIdentName: "[name]__[local]___[hash:base64:5]",
                        },
                    }
                },
                {
                    loader: "postcss-loader",
                    options: postCssOptions,
                }, ...(scss ? scss.prod.client : [])]
            }],
        },


        dev: {
            server: [{
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                auto: true,
                                exportOnlyLocals: true,
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            },
                        }
                    }, ...(scss ? scss.dev.server : [])]
            }],

            client: [{
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                auto: true,
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: { postcssOptions: postCssOptions },
                    }, ...(scss ? scss.dev.client : [])]
            }],
        }
    },
    plugins: {
        prod: {
            server: [],
            client: [
                ...(minicssextract ? minicssextract.plugins.prod.client : [])
            ]
        },


        dev: {
            server: [],
            client: []
        }
    }
};


module.exports = config; 