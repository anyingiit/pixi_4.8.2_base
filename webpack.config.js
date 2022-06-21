const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
    entry: path.resolve(__dirname, 'src/js/index.ts'),// webpack打包入口, webpack会根据该文件的依赖生成依赖树
    output: {
        path: path.resolve(__dirname, 'dist'),// 输出位置
        filename: 'bundle.[hash:8].js'// 输出文件名称
    },
    mode: 'development',// 开发模式
    devServer: {// 配置开发服务器
        static: {
            directory: path.resolve(__dirname, 'dist'),// 配置开发服务器根目录
        },
        port: 9000,// 配置开发服务器端口
    },
    target: 'web',// 输出模式: web
    module: {
        rules: [
            {
                // 从 JavaScript 入口提取现有的 source maps. 这些 source maps 既可以是内联的也可以是通过 URL 链接引入的。
                // 所有的 source map 数据都按照选定的 source map style 交给 webpack 处理，这些选定可以在 webpack.config.js 的 devtool 选项中配置。
                // 在使用有自己 source maps 的第三方库时，source-map-loader 就显得尤为重要。
                // 如果相关 source map 数据没有按照规范提取、处理并注入 webpack bundle, 浏览器有可能无法正确解读这些数据。
                // source-map-loader 允许 webpack 跨库且持续的维护 source map 数据，因而更易于调试。 source-map-loader 可以从任何 JavaScript 文件中提取，这也包括 node_modules 目录下的 JavaScript 文件。 在设置 include 和 exclude 规则时，要保证构建性能最优。

                // 解决的问题就是在node_modules中某些库拥有source map文件, 但是webpack默认在构建时不会将这些source map文件放入到bundle.js中, 而当这些库有source map并使用他们时, 就会找不到, 所以我们使用这个source-map-loader将所有(如果存在)的source map文件放入到bundle.js中, 那么在这些库加载source map时就不会有问题了
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
            {
                test: /\.ts$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [// 配置webpack插件
        new CleanWebpackPlugin(),// 配置清除插件, 改插件可以在每次打包时清除输出目录内的所有上次生成的文件, 确保输出文件夹清洁
        new CopyWebpackPlugin({// 复制文件插件
                patterns: [
                    {// 配置了所有assets静态资源文件在打包时会被复制到输出文件夹目录, 目的之打包后的文件也可以访问静态资源文件, 且和开发目录结构一致
                        context: path.resolve(__dirname),
                        from: 'src/assets',
                        to: 'assets/'
                    }
                ],
            }
        ),
        new HtmlWebpackPlugin({// 从模板scr/index.html生成index.html, 该文件生成到输出文件夹内, "生成"的过程主要是会自动引用webpack打包生成的bundle.js文件, 但是不能写死, 因为上方配置了bundle.js文件实际上每次都会不一样, 而该插件会自动引用正确的bundle.[hash].js文件
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.DefinePlugin({// 设置全局变量, 使所有文件都可以访问, 目的是解决pixi需要使用path库, 而path库需要使用环境变量process.platform
            'process.platform': JSON.stringify(process.platform)
        })
    ],
    optimization: {// 优化
        minimizer: [// 压缩优化
            new ImageMinimizerWebpackPlugin({// 图片压缩插件
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.imageminMinify,// ImageMinimizerWebpackPlugin插件的压缩模式之一, 无损压缩
                    options: {
                        plugins: [
                            ["gifsicle", {interlaced: true}],// gif压缩
                            ["jpegtran", {progressive: true}],// jpg压缩
                            ["optipng", {optimizationLevel: 5}],// png压缩
                            // 这里的 Svgo 配置 https://github.com/svg/svgo#configuration
                            [
                                "svgo",// svg压缩
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