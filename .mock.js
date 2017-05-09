/**
 * Created by lenovo on 2017/5/2.
 */
const mock = {}
require('fs').readdirSync(require('path').join(__dirname + '/src/mock')).forEach(function(file) {
  Object.assign(mock, require('./src/mock/' + file))
})
module.exports = mock
