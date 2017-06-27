/**
 * 记录日志，之后会本地持久化日志
 * @type {[type]}
 */

const log4js = require('log4js');
const fs = require('fs-extra');
const path = require('path');

// const logPath = path.join(__USERDATA_PATH__, 'log');
// fs.ensureDirSync(logPath);

const date = new Date();
//config log4js
log4js.configure({
  appenders: [
    // { //文件输出
    //   type: 'file',
    //   filename: `${logPath}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`,
    //   category: 'courseware.app'
    // },
    { //控制台输出
      type: 'console'
    }
  ]
});

module.exports = log4js.getLogger('electron');
