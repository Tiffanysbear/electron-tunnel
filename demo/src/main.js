const electron = require('electron');
const { app, BrowserWindow } = electron;
const events = require('./events/index.js');
const path = require('path');

const registEvent = require('../../src/registEvent.js');

let win, url;

app.on('ready', () => {
  //加载bridge脚本
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../../src/callEvent.js'),
    }
  });

  //关闭退出
  win.on('closed', function() {
    win = null;
    app.quit();
  });

  //监听web对原生事件的调用
  registEvent(events, [app, win]);

  //创建页面
  url = `file://${__dirname}/index.html`;

  win.loadURL(url);

  win.webContents.openDevTools();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});
