const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    'redux-react': ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux'],
    'app': [
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src/index')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      // { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' }
      { test: /\.jsx?$/, include: path.resolve(__dirname, '../src'), exclude: /node_modules/, loader: 'babel-loader' },
      // { test: /\.\.\/src\/components\/([^\/]+\/?[^\/]+).js$/, include: path.resolve(__dirname, '../src'), use: ['bundle-loader?lazy', 'babel-loader']},
      { test: /\.json$/, loader: 'json-loader' },
      // { test: /\.html/, loader: 'html-loader' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=../dist/img/[name].[ext]' },
      { test: /\.woff2?$/, loader: 'url-loader?name=../dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=../dist/fonts/[name].[ext]' },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['redux-react'/*, 'vendor'*/],
      // filename: 'js/react.js'
      // async: true,
      minChunks: 3,
      // chunks:['app']
    }),
    new HtmlWebpackPlugin({
      // chunks: ['vendor', 'redux-react', 'app'],
      // excludeChunks: [], //排除块
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // removeRedundantAttributes: true,
        // useShortDoctype: true,
        // removeEmptyAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        // keepClosingSlash: true,
        // minifyJS: true,
        // minifyCSS: true,
        // minifyURLs: true
      }
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'), // match the output path
    publicPath: '/',
    // compress: true,
    // // colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    // inline: true,//实时刷新
    // hot: true,
    port: 4001,
    // Info: true
  }
};

module.exports = config;
