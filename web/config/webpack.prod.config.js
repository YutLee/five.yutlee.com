const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: {
    'redux-react': ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux'],
    'app': [
      path.resolve(__dirname, '../src/index')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name]-[chunkhash:8].js',
    chunkFilename: 'js/[name]-[chunkhash:8].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      // { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' }
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      // { test: /\.html/, loader: 'html-loader' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      // { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=../dist/img/[name].[ext]' },
      { test: /\.woff2?$/, loader: 'url-loader?name=../dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=../dist/fonts/[name].[ext]' },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
            {
              loader: 'css-loader?-url'//css-loader can't resolve correctly the path to the generated spritesheet. The possible solution is to skip url resolving.
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('precss'),
                    require('autoprefixer')({
                      browsers: ['last 2 versions', 'ie 9']
                    }),
                    require('cssnano')({safe: true}),
                    require('postcss-sprites')({
                      // verbose: true,
                      stylesheetPath: path.resolve(__dirname, '../dist/css'),
                      spritePath: path.resolve(__dirname, '../dist/img'),
                      filterBy: function(image) {
                        // Allow only png files
                        // if (!/\.png$/.test(image.url)) {
                        //     return Promise.reject();
                        // }
                        let path = image.url.replace(/.+\/images\/((.+)\/+)?(.+?)\.(png|jpe?g|gif)$/, '$2').replace(/\//, '.');
                        if(path == 'img') {
                          return Promise.reject();
                        }

                        return Promise.resolve();
                      },
                      groupBy: function(image) {
                        // console.log(image)
                        let path = image.url.replace(/.+\/images\/((.+)\/+)?(.+?)\.(png|jpe?g|gif)$/, '$2').replace(/\//, '.');
                        if (path == '' || path == 'bg') {
                          return Promise.reject(new Error('Not a shape image.'));
                        }

                        return Promise.resolve(path);
                      }
                    })
                  ];
                }
              }
            }
          ])
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')/*,
      verbose: true,
      dry: false,
      exclude: ['react.js']*/
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['redux-react'/*, 'vendor'*/],
      // filename: 'js/react.js'
      // async: true,
      minChunks: 3,
      // chunks:['app']
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        screw_ie8: true,
        comments: false  // remove all comments
      },
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      sourceMap: true,
      mangle: {
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name]-[chunkhash:8].css',  //?[hash]-[chunkhash]-[contenthash]-[name]', {
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      // chunks: ['vendor', 'redux-react', 'app'],
      // excludeChunks: [], //排除块
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  devtool: 'source-map'
};

module.exports = config;
