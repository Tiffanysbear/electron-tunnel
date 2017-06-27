/**
 * 主进程中处理app相关的事件
 */
const electron = require('electron');
const config = require('../config.js');
const path = require('path');
const os = require('os');
const md5 = require('md5');
const {dialog} = electron;

//退出app
function quitApp(app) {
  return app.quit();
}

//获取app相关信息
function appInfo() {
  const {platform, arch} = process;
  const {
    flashplayerVersion,
    expressServerPort
  } = config;

  //express 静态资源目录
  const staticPath = path.resolve(path.join(__dirname, '../public'));

  //设备uuid
  const deviceUuid = md5(`${os.hostname()}-${os.totalmem()}-${platform}-${arch}-${os.release()}-${os.cpus()[0].model}`);

  return {
    flashplayerVersion,
    platform,
    arch,
    deviceUuid,
    expressServer: {
      port: expressServerPort,
      staticPath
    },
  };
}

/**
 * alert弹窗
 */
function alert(app, win, {title = '', message = ''}) {
  return new Promise((resolve, reject) => {
    try {
      dialog.showMessageBox(win, {
        type: 'none',
        title,
        message
      }, () => {
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  quitApp,
  appInfo,
  alert
};
