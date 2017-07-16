/**
 * 调用主进程中的事件
 * @type {Object}
 */

const {ipcRenderer} = require('electron');

const eventsMap = {};

//设置环境变量
ipcRenderer.on('set-env', (event, msg) => {
  for (const key in msg) {
    window[key] = msg[key];
  }
});

//触发事件回调
ipcRenderer.on('fire-event', (event, arg) => {
  const cb = eventsMap[arg.stamp];
  if (cb) {
    if (arg.err) {
      cb.reject(new Error(arg.err));
    } else {
      cb.resolve(arg.payload);
    }
    delete eventsMap[arg.stamp];
  }
});

//调用原生事件
function registEvent(eventName, params = {}) {
  return new Promise((resolve, reject) => {
    const stamp = String(new Date().getTime());
    const opts = Object.assign({eventName}, {params}, {stamp});
    eventsMap[stamp] = {
      resolve,
      reject
    }; //注册唯一函数
    ipcRenderer.send('regist-event', opts); //发送事件
  });
}


module.exports = {
  eventsMap,
  registEvent
};
