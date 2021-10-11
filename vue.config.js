module.exports = {
  outputDir: 'longhua',
  configureWebpack: {
    devtool: 'source-map'
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  publicPath: './',
  devServer: {
    open: true,
    compress: true,
    proxy: {
      [process.env.VUE_APP_API]: {
        // target: 'http://172.165.251.4:8000',
        target: 'http://172.165.197.17:80/back',
        // target: 'http://172.165.208.41:8001',
        // target: 'http://172.30.65.200:80',
        // target: 'http://101.132.67.181:80',
        // target: 'http://yunjin.thelian.com',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
}
