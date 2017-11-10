import { ipcRenderer, Event } from 'electron';
import { FIRE_CHANNEL, CALLBACK_CHANNEL } from './const';

interface Arg {
  id: string;
  payload: object;
  err?: string;
}

interface EventsStack {
  [index: string]: {
    resolve: (payload: object) => void,
    reject: (error: Error) => void;
  };
}

const eventsStack: EventsStack = {};
let id = 0;

ipcRenderer.on(CALLBACK_CHANNEL, (e: Event , arg: Arg) => {
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

// 调用原生事件
function callEvent(eventName: string, params = {}) {
  id++;

  return new Promise((resolve, reject) => {
    const event = Object.assign(
      { id },
      { eventName },
      { params }
    );

    eventsStack[id] = { resolve, reject }; // 注册唯一函数

    ipcRenderer.send(FIRE_CHANNEL, event); // 发送事件
  });
}

if (window) {
  window.callEvent = callEvent;
}

if (typeof exports === 'object' && typeof module === 'object') {
  module.exports = callEvent;
}
