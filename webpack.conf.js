const path = require('path')

module.exports = {
  resolve: {
    alias: {
      vue: 'mpvue',
      flyio: 'flyio/dist/npm/wx',
      wx: path.join(__dirname, 'src/utils/wx')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve('src'),
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  }
}
