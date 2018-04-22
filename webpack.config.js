const path = require('path')
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');

module.exports = {
  mode: MODE,
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.css/, // 対象となるファイルの拡張子
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
            loader: 'sass-loder',
            options: {
              sourceMap: enabledSourceMap,
            }
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 除外するディレクトリ
        use: [
          {
            loader: 'babel-loader',
            // options: {
            //   presets: ['env', {'modules': false}], // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、webpack の Tree Shaking 機能が使えない
            // },
          },
        ],
      },
    ]
  }
};
