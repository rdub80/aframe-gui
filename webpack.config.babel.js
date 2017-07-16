import path from 'path';

const config = {
    entry: {
        js: './src/index.js',
    },
    output: {
        path: __dirname,
        filename: './dist/aframe-gui.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: 'cacheDirectory=.babel_cache',
                },
            },
        ],
    },
    plugins: [],
};

export default config;
