// https://www.npmjs.com/package/mini-css-extract-plugin
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
    loaders: {
        prod: {
            server: [],

            client: [
                {
                    loader: MiniCssExtractPlugin.loader,
                }]
            ,
        },
        dev: {
            server: [],
            client: [],
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


export default config;