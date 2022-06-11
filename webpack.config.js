const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') //压缩css

process.env.NODE_ENV = 'development'

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'build.js',
    path: join(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 将css样式拆分成单独的文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            //CSS样式兼容性处理
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                //post-css插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        // 构建时使用eslint代码检查
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "babel-loader",
      //   options: {
      //     presets: [
      //       [
      //         "@babel/preset-env",
      //         {
      //           //按需加载
      //           useBuiltIns: 'usage',
      //           corejs: {
      //             version: 3
      //           },
      //           targets: {
      //             chrome: '60',
      //             firefox: '60',
      //             ie: '9',
      //             safari: '10',
      //             edge: '17'
      //           }
      //         }
      //       ]
      //     ]
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.css"
    }),
    //压缩css文件
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: "development",
  devServer: {
    contentBase: join(__dirname, 'dist'),
    compress: true,
    port: 3009,
    open: true,
    hot: true,
  }
}