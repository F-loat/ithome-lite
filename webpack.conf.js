const path = require('path')

const config = process.env.MODE === 'mp' ? {
  resolve: {
    alias: {
      vue: 'mpvue',
      flyio: 'flyio/dist/npm/wx',
      wx: path.join(__dirname, 'src/utils/wx')
    }
  }
} : {
  entry: './src/main.h5.js',
  resolve: {
    alias: {
      flyio: 'flyio/dist/npm/fly',
      wx: path.join(__dirname, 'src/utils/wx')
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
