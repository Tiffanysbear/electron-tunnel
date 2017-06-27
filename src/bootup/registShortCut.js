/**
 * 设置快捷键
 */
const {globalShortcut} = require('electron');
const logger = require('../logger.js');
const {quitFullScreen} = require('../events/screen.js');

function registShortCut(app, win) {
  //开启控制台
  globalShortcut.register('Command+Option+I', () => {
    logger.info('registShortCut.js: you pressed Command+Option+I');
    win.webContents.toggleDevTools();
  });

  //退出全屏
  globalShortcut.register('Esc', () => {
    logger.info('registShortCut.js: you pressed Esc');
    quitFullScreen(app, win);
  });

  // if (!ret) {
  //   console.log('registration failed')
  // }
  //
  // // Check whether a shortcut is registered.
  // console.log(globalShortcut.isRegistered('CommandOrControl+X'))

}

function unregistShortCut() {
  globalShortcut.unregisterAll();
}

module.exports = {
  registShortCut,
  unregistShortCut
};
