/**
 * 全局变量
 */
const path = require('path');
// const {app} = require('electron');

//是否是dev
global.__DEV__ = process.env.NODE_ENV === 'dev';

//是否是production
global.__PRO__ = !global.__DEV__;

global.__WIN__ = process.platform === 'win32';

global.__MAC__ = process.platform === 'darwin';

// global.__APP_ROOT__ = app.getPath();

//是否存在本地webpack server
global.__LOCAL_SERVER__ = process.env.LOCAL_SERVER;

//是否处于asar压缩包中
global.__ASAR__ = __dirname.indexOf('asar') >= 0;

//未被asar压缩的文件夹位置
global.__ASAR_UNPACK__ = path.join(__dirname, '../../app.asar.unpacked');
