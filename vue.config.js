const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: './',
  devServer: {
    proxy: {
      '/manager': {
        // 代理目标地址
        target: 'http://47.120.6.192/manager',
        // 允许跨越
        changeOrigin: true,
        // 重写路径
        pathRewrite: {
          '^/manager': ''
        }
      }
    }
  }
})