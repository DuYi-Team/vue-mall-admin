const path = require('path')
module.exports = {
  publicPath: './',
  // lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('@assets', path.join(__dirname, 'src/assets'))
  }
}
