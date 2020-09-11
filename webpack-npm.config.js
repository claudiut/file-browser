/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack-common.config');

module.exports = merge(commonConfig, {
    output: {
        path: path.join(__dirname, 'npm-build'),
        filename: 'main.js',
        libraryTarget: 'commonjs2',
    },
});
