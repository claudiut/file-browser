/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack-common.config');

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: './src/app/App.tsx',
    output: {
        path: path.join(__dirname, 'npm-build'),
        filename: 'build.js',
        libraryTarget: 'commonjs2',
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
});
