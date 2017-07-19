var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var path = require('path')

const museUiThemePath = path.join(
  __dirname,
  '../node_modules',
  'muse-ui',
  'src/styles/themes/variables/default.less'
)

let loader= {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction

  })
}

loader.loaders.less=[
  'vue-style-loader',
  'css-loader',
  {
    loader: 'less-loader',
    options: {
      globalVars: {
        museUiTheme: `'${museUiThemePath}'`,
      }
    }
  }
]

module.exports =loader
