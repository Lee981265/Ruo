const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'public',
    productionSourceMap: false,
    chainWebpack(config) {
        config.resolve.alias
        .set('@', resolve('src')) 
        .set('_c', resolve('src/components'))
        .set('_a', resolve('src/assets'))
        const cdn = {
        css: ['//fonts.googleapis.com/css?family=Noto+Serif+SC'],
        js: [
          '//cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
          '//cdn.jsdelivr.net/npm/jquery-backstretch@2.1.17/jquery.backstretch.min.js'
        ]
      }
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    },
    configureWebpack: config => {

    },
    devServer: {
        port: 9999,
    }
  }



























  