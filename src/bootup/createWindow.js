const electron = require('electron');
const path = require('path');
const {app, BrowserWindow} = electron;
const config = require('../config.js');

let win;
function createWindow() {
  //加载bridge脚本
  win = new BrowserWindow({
    width: config.default_win_size.width,
    height: config.default_win_size.height,
    title: config.title,
    webPreferences: {
      preload: path.join(__dirname, '../bridge/index.js'),
      plugins: true
    }
  });

  //关闭退出
  win.on('closed', function() {
    win = null;
    app.quit();
  });

  return win;
}

function getWindow() {
  if (win) {
    return win;
  } else {
    console.log('请先调用createWindow');
    return false;
  }
}

module.exports = {
  createWindow,
  getWindow
};
