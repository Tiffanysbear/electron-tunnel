const {registEvent} = require('../registEvent.js');
const {
  QUIT_APP,
  APP_INFO,
  ALERT
} = require('../../events/eventNames.js');
const path = require('path');

//退出app
function quitApp() {
  return registEvent(QUIT_APP);
}

//获取app相关信息
function appInfo() {
  return registEvent(APP_INFO);
}

//调用原生弹窗
function alert(params) {
  return registEvent(ALERT, params);
}

module.exports = {
  quitApp,
  appInfo,
  alert
};
