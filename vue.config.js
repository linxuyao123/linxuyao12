const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: './',
  devServer: {
    proxy: {
      '/': {
        // 代理目标地址
        target: 'https://admin-api.macrozheng.com',
        // 允许跨越
        changeOrigin: true,
        // 重写路径
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
})