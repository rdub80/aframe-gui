var webpack = require('webpack');

module.exports = {
    entry: {
        js: './src/index.js',
    },
    output: {
        path: __dirname,
        filename: './examples/js/aframe-gui.min.js'
    },
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: 'cacheDirectory=.babel_cache',
                },
            },
        ],
    },
    plugins: [],
};

