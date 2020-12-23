// 关闭eslint，反向代理......
module.exports = {
  // lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://m.maizuo.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
