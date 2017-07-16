/**
 * 在本地浏览器中加载url
 */

const {shell} = require('electron');

module.exports = function (app, win) {
  //去默认浏览器里打开新窗口
  win.webContents.on('new-window', function(event, url) {
    event.preventDefault();
    shell.openExternal(url);
  });
};
