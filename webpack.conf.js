const path = require('path')

module.exports = {
  resolve: {
    alias: {
      vue: 'mpvue',
      flyio: 'flyio/dist/npm/wx',
      wx: path.join(__dirname, 'src/utils/wx')
    }
  }
}
