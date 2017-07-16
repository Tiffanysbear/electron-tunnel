/**
 * 监听渲染进程对主进程的调用，执行完任务后通知渲染进程
 */


const {ipcMain} = require('electron');
const eventsList = require('../events/index.js');
const {isPromise} = require('../util/typeCheck.js');
const logger = require('../logger.js');

let app, win;

//监听对原生的调用
ipcMain.on('regist-event', (event, arg) => {
  const nativeEvent = eventsList[arg.eventName];
  if (nativeEvent) {
    const result =  nativeEvent(app, win, arg.params);
    if (isPromise(result)) { //如果返回promise
      result.then(res => {
        event.sender.send('fire-event', {
          stamp: arg.stamp,
          payload: res
        });
      }).catch(err => {
        logger.error(`setEventListener.js: ${arg.eventName} event err: ${err}`);
        event.sender.send('fire-event', {
          stamp: arg.stamp,
          err: err.message
        });
      });
    } else {
      event.sender.send('fire-event', {
        stamp: arg.stamp,
        payload: result
      });
    }
  } else {
    logger.error(`setEventListener.js: ${arg.eventName} event err: not support`);
    event.sender.send('fire-event', {
      stamp: arg.stamp,
      err: 'event not support'
    });
  }
});

module.exports = (a, w) => {
  app = a;
  win = w;
};
