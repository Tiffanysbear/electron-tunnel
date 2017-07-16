/**
 * 配置信息
 * @type {Object}
 */

const config = {
  title: 'xxx',
  appName: 'xxx',
  ifOpenDevtool: true, //是否打开开发者工具
  ifSingleAppInstance: true, //app是否是单例模式
  ifOpenUrlInBrowser: true, //打开url的时候是否使用本地浏览器
  default_win_size: {
    width: 1024,
    height: 768
  },
  plugins: {
    flashplayer: {
      'darwin': {
        'x64': '23.0.0.205'
      },
      'win32': {
        'x64': '25.0.0.171',
        'ia32': '23.0.0.205'
      }
    }
  }
};


module.exports = config;
