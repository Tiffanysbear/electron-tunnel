const {registEvent} = require('../registEvent.js');
const {
  SET_FULL_SCREEN,
  QUIT_FULL_SCREEN,
  IS_FULL_SCREEN,
  SET_SCREEN_SIZE,
  SET_RESIZABLE,
  TOGGLE_DEVTOOLS
} = require('../../events/eventNames.js');

//进入全屏
function setFullScreen() {
  return registEvent(SET_FULL_SCREEN);
}

//退出全屏
function quitFullScreen() {
  return registEvent(QUIT_FULL_SCREEN);
}

//是否是全屏
function isFullScreen() {
  return registEvent(IS_FULL_SCREEN);
}

//改变窗口大小
function setScreenSize(params) {
  return registEvent(SET_SCREEN_SIZE, params);
}

//是否能改变窗口大小
function setResizable(params) {
  return registEvent(SET_RESIZABLE, params);
}

//开发工具
function toggleDevTools() {
  return registEvent(TOGGLE_DEVTOOLS);
}

module.exports = {
  setFullScreen,
  quitFullScreen,
  isFullScreen,
  setScreenSize,
  setResizable,
  toggleDevTools
};
