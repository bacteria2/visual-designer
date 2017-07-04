var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/pages/chartDesigner/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery-ui/data':'jquery-ui/ui/data',
      'jquery-ui/disable-selection':'jquery-ui/ui/disable-selection',
      'jquery-ui/focusable':'jquery-ui/ui/focusable',
      'jquery-ui/form':'jquery-ui/ui/form',
      'jquery-ui/ie':'jquery-ui/ui/ie',
      'jquery-ui/keycode':'jquery-ui/ui/keycode',
      'jquery-ui/jquery-1-7':'jquery-ui/ui/jquery-1-7',
      'jquery-ui/plugin':'jquery-ui/ui/plugin',
      'jquery-ui/safe-active-element':'jquery-ui/ui/safe-active-element',
      'jquery-ui/safe-blur':'jquery-ui/ui/safe-blur',
      'jquery-ui/scroll-parent':'jquery-ui/ui/scroll-parent',
      'jquery-ui/tabbable':'jquery-ui/ui/tabbable',
      'jquery-ui/unique-id':'jquery-ui/ui/unique-id',
      'jquery-ui/version':'jquery-ui/ui/version',
      'jquery-ui/widget':'jquery-ui/ui/widget',
      'jquery-ui/labels':'jquery-ui/ui/labels',
      'jquery-ui/widgets/mouse':'jquery-ui/ui/widgets/mouse',
      'jquery-ui/widgets/draggable':'jquery-ui/ui/widgets/draggable',
      'jquery-ui/widgets/droppable':'jquery-ui/ui/widgets/droppable',
      'jquery-ui/widgets/resizable':'jquery-ui/ui/widgets/resizable'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /muse-ui.src.*?js$/,
        loader: 'babel-loader'
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
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
