module.exports = {
    resolve: {
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
        ],
    },
};
