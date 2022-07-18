const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); //压缩css
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

process.env.NODE_ENV = 'development'

const getStyleLoader = (per) => ([
  // 将css样式拆分成单独的文件
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 处理css兼容性问题
    // 配合package.json中browserslist来指定兼容性
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: ["postcss-preset-env"],
      },
    },
  },
  per
].filter(Boolean))

module.exports = {
  entry: "./src/index.js",
  output: {
    path: undefined,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoader()
      },
      {
        test: /\.less$/,
        use: getStyleLoader({
          loader: 'less-loader', 
          options:{
            lessOptions: {
              javascriptEnabled: true
            }
          }
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            "react-refresh/babel", // 激活js的HMR
          ]
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    //将css文件打包成单独文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:10].css"
    }),
    //压缩css文件
    new CssMinimizerWebpackPlugin(),
    // 激活js的HMR
    new ReactRefreshWebpackPlugin(), 
    //eslint配置
    // new EslintWebpackPlugin({
    //   context: path.resolve(__dirname, "../src"),
    //   exclude: "node_modules",
    //   cache: true,
    //   cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
    // }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
  },
  resolve: {
    // 自动补全文件扩展名
    extensions: [".jsx", ".js", ".json"],
  },
  devtool: "cheap-module-source-map",
  mode: "development",
  devServer: {
    host: '127.0.0.1',
    port: 3001,
    hot: true,
    historyApiFallback: true
  }
}