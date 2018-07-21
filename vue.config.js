module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8086,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
}