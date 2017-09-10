const { ipcRenderer } = require('electron');
const { FIRE_CHANNEL, CALLBACK_CHANNEL } = require('./const.js');

const eventsStack = {};
let id = 0;

ipcRenderer.on(CALLBACK_CHANNEL, (e, arg) => {
  const event = eventsStack[arg.id];
  if (event) {
    if (arg.err) {
      event.reject(new Error(arg.err));
    } else {
      event.resolve(arg.payload);
    }
    delete eventsStack[arg.id];
  }
});

//调用原生事件
function callEvent(eventName, params = {}) {
  id++;

  return new Promise((resolve, reject) => {
    const event = Object.assign(
      { id },
      { eventName },
      { params }
    );

    eventsStack[id] = Object.assign(
      event,
      { resolve, reject }
    ); //注册唯一函数

    ipcRenderer.send(FIRE_CHANNEL, event); //发送事件
  });
}

if (window) {
  window.callEvent = callEvent;
}

if (typeof exports === 'object' && typeof module === 'object') {
  module.exports = callEvent;
}
