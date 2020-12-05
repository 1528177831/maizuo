// 关闭eslint，反向代理......
module.exports = {
  lintOnSave: false,
  devServer: {
    // proxy: 'https://m.maizuo.com'
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
