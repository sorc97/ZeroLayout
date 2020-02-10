const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//Constants
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimize = () => {
  return {
    minimizer: [
      new OptimizeCssAssetsPlugin()
    ]
  }
}
// All html pages
let htmlFiles = ['singlePost', 'contact', 'about', 'index'];

// Plugin for every html page
let htmlPlugin = htmlFiles.map(
  file => new HtmlWebpackPlugin({
    template: `${PATHS.src}/${file}.html`,
    filename: `${file}.html`,
    minify: {
      collapseWhitespace: isProd
    }
  })
)

const plugins = () => {
  let base = [
    ...htmlPlugin,
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.dist}/img` }
    ]),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new CleanWebpackPlugin(),
  ]

  if (isProd) {
    base.push(
      new BundleAnalyzerPlugin()
    )
  }

  if (isDev) {
    base.push(
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
      })
    )
  }

  return base;
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: isProd ? optimize() : {},
  devtool: (isDev) ? 'cheap-module-eval-source-map' : "",
  devServer: {
    port: 4000,
    hot: isDev
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader?name=[name].[ext]&outputPath=img/',
        exclude: /node_modules/
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[name].[ext]&outputPath=fonts/',
      }
    ]
  },
  plugins: plugins()
}