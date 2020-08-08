const path = require('path');
// NOTE: be sure to install @types/html-webpack-plugin or we will get TS errors
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        // configures loaders to process certain/matched files
        rules: [
            // When encoutering .ts or .tsx files required by webpack (meaning that are
            // in the module tree), ts-loader will convert them to JS
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // sass-loader turns imported .sass files into CSS
            // css-loader turns CSS imports into JS (puts it inside webpack module tree)
            // style-loader adds CSS to the DOM by injecting a <style> tag inside <head> at runtime
            {
                test: /\.scss$/,
                // the order of execution is reversed: from right to left
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // When encountering .html files required by webpack (like template.html), this plugin
            // will require all it's assets inside webpack
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            // The file-loader resolves required files (including the above required assets)
            // into and URL and emits the file's contents as an output file.
            // Optionally can also process the file (compress images, etc.)
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'images',
                    },
                },
            },
        ],
    },
    plugins: [
        // take a html file and injects the output JS file in it
        new HtmlWebpackPlugin({
            template: './src/template.html',
            favicon: './src/assets/images/favicon.png',
        }),
        new CleanWebpackPlugin(),
    ],
    // configures how webpack resolves modules
    resolve: {
        // ...not sure why exactly this list doesn't include scss and some other file extensions...
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        historyApiFallback: true,
    }
};
