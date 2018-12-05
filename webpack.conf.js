const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const config = process.env.MODE === 'mp' ? {
  resolve: {
    alias: {
      vue: 'mpvue',
      flyio: 'flyio/dist/npm/wx',
      wx: resolve('src/utils/wx')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'mpvue-config-loader',
      exclude: [resolve('src/components')],
      options: {}
    }]
  }
} : {
  entry: ['babel-polyfill', './src/main.h5.js'],
  resolve: {
    alias: {
      flyio: 'flyio/dist/npm/fly',
      wx: resolve('src/utils/wx'),
      xmlstring2json: 'xmlstring2json/dist/xml2json.min.js'
    }
  },
  devServer: {
    proxy: {
      '/apiquan/api': {
        target: 'https://apiquan.ithome.com',
        changeOrigin: true,
        pathRewrite: {
          '^/apiquan': ''
        }
      },
      '/api': {
        target: 'https://api.ithome.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/dyn': {
        target: 'https://dyn.ithome.com',
        changeOrigin: true,
        pathRewrite: {
          '^/dyn': ''
        }
      }
    }
  }
}

module.exports = config
