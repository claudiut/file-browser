/* eslint-disable @typescript-eslint/no-var-requires */
// NOTE: be sure to install @types/html-webpack-plugin or we will get TS errors
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack-common.config');

module.exports = merge(commonConfig, {
    output: {
        filename: 'main.[contenthash].js',
        publicPath: '/',
    },
    plugins: [
        // take a html file and injects the output JS file in it
        new HtmlWebpackPlugin({
            template: './src/template.html',
            favicon: './src/assets/images/favicon.png',
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
});
