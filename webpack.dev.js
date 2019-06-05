const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const KssWebpackPlugin = require('kss-webpack-plugin');
const KssConfig = require('./kss-config');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        // using js to keep a faster compilation
        AC: './index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist/styleguide'),
        compress: false,
        port: 9000
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            options: {
                publicPath: './'
            }
        }),
        new KssWebpackPlugin(KssConfig.config)
    ],
    module: {
        rules: [
            {
                test: /.scss?$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    }, {
                        loader: "css-loader",
                    }, {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer'),
                            ]
                        }
                    }, {
                        loader: "sass-loader"
                    }, {
                        // adds the utilities files to each single sass file
                        loader: "sass-resources-loader",
                        options: {
                            // utilities files to be added in the file below
                            resources: require(path.join(process.cwd(), "src/scss/1-utilities/utilities.js")),
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'icons/'
                    }
                }]
            }
        ]
    }
};