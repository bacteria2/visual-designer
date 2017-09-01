var path = require('path')
var utils = require('./utils')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var config = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    assetsRoot: path.resolve(__dirname, '../dist/dataView'),
    assetsPublicPath: '/ydp-visual-web/', // /ydp-qyzy-sq/
    productionSourceMap: true,
  }
}


var webpackConfig = {
  entry: {
    dataView: ['babel-polyfill','./src/pages/dataView/dataView.js']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: 'js/async.[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: resolve('node_modules'),
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'image/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ].concat(utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    }))
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      filename: 'example.html',
      template: path.join(__dirname, '../src/pages/dataView/example.html'),
      inject: 'head',
      chunksSortMode: 'dependency'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var chalk = require('chalk')
var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
