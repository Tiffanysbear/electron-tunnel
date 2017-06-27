/**
 * 下载
 */
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const unzip = require('unzip');
const download = require('download');
const {isFunction} = require('../../util/typeCheck.js');

/**
 * 下载器
 * @param  {[type]} url          [description]
 * @param  {[type]} dest         [description]
 * @param  {Object} [options={}] [description]
 * @param  {[type]} [cb=(]       [description]
 * @return {[type]}              [description]
 */

function downloader(url, dest, options, cb) {
  //允许省略最后两个参数，或者省略其中一个
  if (!options && !cb) { //最后两个参数都不存在
    options = {};
    cb = () => {};
  } else if (options && !cb) { //只存在第三个参数
    if (isFunction(options)) {
      cb = options;
      options = {};
    } else {
      cb = () => {};
    }
  }

  const throttleCb = _.throttle(cb, 300); //下载中300毫秒触发一次回调

  let realDestdir;
  if (__ASAR__) {
    realDestdir = path.join(__ASAR_UNPACK__, 'src/public', dest);
  } else {
    realDestdir = path.join(__dirname, '../../public', dest);
  }
  fs.ensureDirSync(realDestdir);

  return download(url, realDestdir, options)
    .on('response', res => {
      const len = parseInt(res.headers['content-length'], 10) || 0; //总大小
      let sum = 0,
          progress = false;

      res.on('data', chunk => {
        //计算进度条
        sum += chunk.length;

        if (len > 0) {
          progress = ~~((sum / len).toFixed(2) * 100);
          progress = progress > 100 ? 100 : progress;
        }

        throttleCb(progress, realDestdir);
      });

      res.on('end', () => {
        cb(100, realDestdir);
      });
    });
}

//判断public文件夹下的某个资源是否存在
function isAssetExists(assetPath = '') {
  if (__ASAR__) {
    return fs.existsSync(path.join(__ASAR_UNPACK__, 'src/public', assetPath));
  } else {
    return fs.existsSync(path.join(__dirname, '../../public', assetPath));
  }
}

//解压缩
function unZip(from, to) {
  return new Promise((resolve, reject) => {
    fs
      .createReadStream(from)
      .pipe(unzip.Extract({ path: to }))
      .on('close', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = {
  isAssetExists,
  downloader,
  unZip
};
