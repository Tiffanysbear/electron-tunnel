/**
 * 监听渲染进程对主进程的调用，执行完任务后通知渲染进程
 */
const { ipcMain } = require('electron');
const { FIRE_CHANNEL, CALLBACK_CHANNEL } = require('./const.js');

function isPromise(obj) {
  const toString = Object.prototype.toString;
  return toString.call(obj) === '[object Promise]';
}

let eventsList, cusParams;

//监听对原生的调用
ipcMain.on(FIRE_CHANNEL, (event, arg) => {
  const {id, eventName, params} = arg;
  const nativeEvent = eventsList[eventName];

  if (nativeEvent) { //主进程支持的事件
    const result =  nativeEvent(params, ...cusParams);

    if (isPromise(result)) { //如果返回promise
      result.then(res => {
        event.sender.send(CALLBACK_CHANNEL, {
          id,
          payload: res
        });
      }).catch(err => {
        event.sender.send(CALLBACK_CHANNEL, {
          id,
          err: err.message
        });
      });
    } else {
      event.sender.send(CALLBACK_CHANNEL, {
        id,
        payload: result
      });
    }
  } else { //主进程不支持的事件
    event.sender.send(CALLBACK_CHANNEL, {
      id,
      err: 'event not support'
    });
  }
});

function registEvent(events, params) {
  eventsList = events;
  cusParams = params;
}

module.exports = registEvent;
