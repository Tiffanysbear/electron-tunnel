require('./env.js');
const electron = require('electron');
const { app } = electron;
const createWindow = require('./bootup/createWindow.js');
const { addFlashPlugin } = require('./bootup/addPlugins.js');
const setEventListener = require('./bootup/setEventListener.js');
const singleAppInstance = require('./bootup/singleAppInstance.js');
const expressServer = require('./bootup/expressServer.js');
const { registShortCut, unregistShortCut } = require('./bootup/registShortCut.js');
const logger = require('./logger');
const config = require('./config');

logger.info(`
  __DEV__: ${__DEV__}
  __PRO__: ${__PRO__}
  __WIN__: ${__WIN__}
  __MAC__: ${__MAC__}
  __LOCAL_SERVER__: ${__LOCAL_SERVER__}
  __ASAR__: ${__ASAR__}
  __ASAR_UNPACK__: ${__ASAR_UNPACK__}
`);

//添加flash插件
addFlashPlugin(app);

let win;
app.on('ready', () => {
  //创建页面
  if (__LOCAL_SERVER__) { //如果有本地服务器
    win = createWindow();
    bootupFlow(app, win);
  } else { //如果没有本地服务器
    expressServer()
      .then(port => {
        win = createWindow(port);
        bootupFlow(app, win);
      });
  }

  function bootupFlow(app, win) {
    //注册快捷键
    registShortCut(app, win);

    //监听web对原生事件的调用
    setEventListener(app, win);

    //只允许创建一个app实例
    singleAppInstance(app, win);
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  //取消注册快捷键
  unregistShortCut();
  app.quit();
});
