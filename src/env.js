/**
 * 全局变量
 */
const path = require('path');
const {app} = require('electron');
const fs = require('fs-extra');
const md5 = require('md5');

//是否是dev
global.__DEV__ = process.env.NODE_ENV === 'dev';

//是否是pro
global.__PRO__ = !__DEV__;

global.__WIN__ = process.platform === 'win32';

global.__MAC__ = process.platform === 'darwin';

//是否存在本地webpack server
global.__LOCAL_SERVER__ = process.env.LOCAL_SERVER === 'true';

//是否处于asar压缩包中
global.__ASAR__ = __dirname.indexOf('asar') >= 0;

//未被asar压缩的文件夹位置
global.__ASAR_UNPACK__ = path.join(__dirname, '../../app.asar.unpacked');
