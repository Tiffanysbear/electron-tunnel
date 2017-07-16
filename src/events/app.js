/**
 * 主进程中处理app相关的事件
 */
const electron = require('electron');
const config = require('../config.js');
const {dialog} = electron;

//退出app
function quitApp(app) {
  return app.quit();
}

//获取app相关信息
function appInfo() {
  const {platform, arch} = process;
  return {
    platform,
    arch,
    config
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
