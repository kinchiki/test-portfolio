const path = require('path')
const distPath = path.resolve(__dirname, 'dist')
const MODE = 'development'
const enabledSourceMap = (MODE === 'development')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: MODE,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    path: distPath,
    filename: 'main.js',
  },
  devServer: {
    contentBase: distPath,
    open: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false, // オプションでCSS内のurl()メソッドの取り込みを禁止する
              minimize: true, // CSSの空白文字を削除する
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              plugins: [
                require('autoprefixer')({grid: true})
              ]
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: enabledSourceMap, }
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', },],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    })
  ]
};
