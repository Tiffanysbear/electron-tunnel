/**
 * 设置快捷键
 */
const {globalShortcut} = require('electron');
const logger = require('../logger.js');
const {quitFullScreen} = require('../events/screen.js');

function registShortCut(app, win) {
  //开启控制台
  globalShortcut.register('Command+Option+I', () => {
    logger.info('you pressed Command+Option+I');
    win.webContents.toggleDevTools();
  });

  //退出全屏
  globalShortcut.register('Esc', () => {
    logger.info('you pressed Esc');
    quitFullScreen(app, win);
  });
}

//取消注册
function unregistShortCut() {
  globalShortcut.unregisterAll();
}

module.exports = {
  registShortCut,
  unregistShortCut
};
