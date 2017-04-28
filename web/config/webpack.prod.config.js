const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');


function BeforeHtmlProcessing(options) {
  // body...
}

BeforeHtmlProcessing.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(data, callback) {
      data.html = data.html.replace(/<\s?script.*src.*>\s?<\s?\/script\s?>/g, '');
      callback(null, data);
    });
  });
};

module.exports = {
    entry: {
      react: ['react', 'react-dom', 'react-redux', 'redux'],
      app: '../src/app.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'js/[name]-[chunkhash:8].js',
      chunkFilename: 'js/[name]-[chunkhash:8].js'
    },
    module: {
      rules: [
        // rules for modules (configure loaders, parser options, etc.)
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          // exclude: /node_modules/,
          include: [
            path.resolve(__dirname, '../src/client')
          ],
          options: {
            presets: ['es2015']
          }
        },
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
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            { loader: 'url-loader', options: { limit: 1024 } },
            { loader: 'file-loader?name=../img/[name].[ext]' }/*-[hash]*/
          ],
        }/*,
        {
          test: /\.jpg$/,
          use: [ 'file-loader' ]
        }*/
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
        name: 'react',
        filename: 'js/react.js'
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name : 'common',
      //   filename: 'common-[chunkhash:8].js',
      //   minChunks: 3
      // }),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV was set to production here.
      // Otherwise React will be compiled in the very slow development mode.
      // new webpack.DefinePlugin(env),
      // This helps ensure the builds are consistent if source hasn't changed:
      // new webpack.optimize.OccurrenceOrderPlugin(),
      // Minify the code.
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
        chunks: ['react', 'app'],
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
      })/*,
      new BeforeHtmlProcessing()*/
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.jpg', '.png', '.gif', '.jpeg']
    },
    devtool: 'source-map'
};

function spritesOnUpdateRule(isDev, rule, comment, image){
  console.log(image);
  // var spriteUrl = image.spriteUrl;
  // image.spriteUrl = '/public/' + spriteUrl;
  // postcssSprites.updateRule(rule, comment, image);
}

function spritesOnSaveSpritesheet(isDev, opts, groups) {
  // let file = postcssSprites.makeSpritesheetPath(opts, groups);
  // return file;
}