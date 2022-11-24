import path from 'path';
import clone from '../clone.mjs';
import typescript from '../stubs/typescript.mjs';

const config = {
    rules: {
        prod: {
            server: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: typescript.prod.server
            }],

            client: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                use: typescript.prod.client
            }],

        },


        dev: {
            server: [],
            client: []
        }
    },
};

config.rules.dev.server = clone(config.rules.prod.server);
config.rules.dev.client = clone(config.rules.prod.client);

export default config;