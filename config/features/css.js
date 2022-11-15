const clone = require("../clone")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
                    }]
            }],

            client: [{
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
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
                    }]
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
                    }]
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
                    }]
            }],
        }
    },
    plugins: {
        prod: {
            server: [],
            client: [
                new MiniCssExtractPlugin({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: "[name].css",
                    chunkFilename: "[id].css",
                })
            ]
        },


        dev: {
            server: [],
            client: []
        }
    }
};


module.exports = config;