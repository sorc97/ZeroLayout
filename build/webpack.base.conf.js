const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Константы
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

let htmlFiles = ['singlePost', 'contact', 'about', 'index'];
// Формирование плагина для каждого html файла
let htmlPlugin = htmlFiles.map(
  file => new HtmlWebpackPlugin({
    template: `${PATHS.src}/${file}.html`,
    filename: `${file}.html`
  })
)

module.exports = {
  //Внешние пер-ые
  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].bundle.js`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: './postcss.config.js' }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/style.css`
    }),
    ...htmlPlugin,
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` }
    ])
  ]
}
