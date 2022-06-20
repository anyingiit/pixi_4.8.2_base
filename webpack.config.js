const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:8].js'
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 9000,
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                // loader的书写顺序很重要，因为loader的职责单一，组合使用的原则，所有loader一个一个处理的顺序很重要
                // 怎么调整这个顺序很关键，但是如果你书写的时候已经排好了序，那就无所谓了
                // 可以通过一个 enforce 属性，默认有以下几个值
                //     pre 优先处理
                //     normal 正常处理（默认）
                //     inline 其次处理
                //     post 最后处理
                enforce: "pre",
                use: ["source-map-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
                patterns: [
                    {
                        context: path.resolve(__dirname),
                        from: 'src/assets',
                        to: 'assets/'
                    }
                ],
            }
        ),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.DefinePlugin({
            'process.platform': JSON.stringify(process.platform)
        })
    ],
    optimization: {
        minimizer: [
            new ImageMinimizerWebpackPlugin({
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", {interlaced: true}],
                            ["jpegtran", {progressive: true}],
                            ["optipng", {optimizationLevel: 5}],
                            // 这里的 Svgo 配置 https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: 'preset-default',
                                            params: {
                                                overrides: {
                                                    // customize default plugin options
                                                    inlineStyles: {
                                                        onlyMatchedOnce: false,
                                                    },

                                                    // or disable plugins
                                                    removeDoctype: false,
                                                },
                                            },
                                        },
                                    ]
                                }
                            ]
                        ]
                    }
                }
            })
        ]
    }
}