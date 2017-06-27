const logger = require('../logger.js');
const electron = require('electron');
const path = require('path');
const getScreenSize = require('./getScreenSize.js');
const {app, BrowserWindow, shell} = electron;
const config = require('../config.js');

let win;
function createWindow(port = 3000) {
  const {unfullscreenSize} = getScreenSize(electron.screen);
  //加载bridge脚本
  win = new BrowserWindow({
    width: unfullscreenSize.width,
    height: unfullscreenSize.height,
    title: config.title,
    webPreferences: {
      preload: path.join(__dirname, '../bridge/bridge.js'),
      plugins: true
    }
  });

  //load页面
  const url = __LOCAL_SERVER__
    ? `http://127.0.0.1:${port}/#/login`
    //: `http://127.0.0.1:${port}`;
    : `http://${config.host}/main.html#/login`;

  logger.info(`createWindow.js: loadURL: ${url}`);
  win.loadURL(url);

  //页面已经被渲染好了,不会有闪烁
  // win.once('ready-to-show', () => {
  //   win.show();
  // });

  win.webContents.on('did-finish-load', function() {
    win.webContents.send('set-env', { //设置web环境变量
      __DEV__,
      __PRO__,
      __LOCAL_SERVER__,
      __ASAR__,
      __ASAR_UNPACK__,
      __WIN__,
      __MAC__,
      __APP_ROOT__
    });
    //do something
  });

  //去默认浏览器里打开新窗口
  win.webContents.on('new-window', function(event, url) {
    event.preventDefault();
    shell.openExternal(url);
  });

  win.on('closed', function() {
    win = null;
    app.quit();
  });

  winSetting();

  return win;
}

/**
 * 开发设置
 */
function winSetting() {
  //开发配置
  if (__DEV__) {
    win.webContents.openDevTools({detach: true});
  }
}

module.exports = createWindow;
