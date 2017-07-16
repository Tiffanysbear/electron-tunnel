require('./env.js');
const electron = require('electron');
const { app } = electron;
const { createWindow } = require('./bootup/createWindow.js');
const setEventListener = require('./bootup/setEventListener.js');
const singleAppInstance = require('./bootup/singleAppInstance.js');
const openDevTools = require('./bootup/openDevtools.js');
const openUrlInBrowser = require('./bootup/openUrlInBrowser.js');
const expressServer = require('./bootup/expressServer.js');
const { registShortCut, unregistShortCut } = require('./bootup/registShortCut.js');
const config = require('./config');
const logger = require('./logger.js');

//添加flash插件
// addFlashPlugin(app);
//

//根据配置文件，启动对应行为
function bootupFlow() {
  config.ifOpenDevtool && openDevTools(app, win);

  config.ifSingleAppInstance && singleAppInstance(app, win);

  config.ifOpenUrlInBrowser && openUrlInBrowser(app, win);
}

let win, url;
app.on('ready', () => {
  //创建window
  win = createWindow();

  //注册快捷键
  registShortCut(app, win);

  //监听web对原生事件的调用
  setEventListener(app, win);

  //创建页面
  if (global.__LOCAL_SERVER__) { //如果有本地服务器
    url = `http://127.0.0.1:${global.__LOCAL_SERVER__}`;
    logger.info(`loadURL: ${url}`);
    win.loadURL(url);
    bootupFlow();
  } else { //如果没有本地服务器
    expressServer()
      .then(port => {
        url = `http://127.0.0.1:${port}`;
        logger.info(`loadURL: ${url}`);
        win.loadURL(url);
        bootupFlow();
      });
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  //取消注册快捷键
  unregistShortCut();
  app.quit();
});
