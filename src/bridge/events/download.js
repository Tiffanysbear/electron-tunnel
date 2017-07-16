/**
 * 下载
 */
const fs = require('fs-extra');
const _ = require('lodash');
const download = require('download');

/**
 * [downloader description]
 * @param  {[type]} url          [url]
 * @param  {[type]} dest         [下载路径]
 * @param  {Object} [options={}] [download库配置项]
 * @param  {[type]} [cb=(]       [回调函数，会被不断处罚，接受(当前进度，下载路径)]
 * @return {[type]}              [description]
 */
function downloader({
  url,
  dest,
  options = {},
  cb = () => {}
}) {
  const throttleCb = _.throttle(cb, 300); //下载中300毫秒触发一次回调
  fs.ensureDirSync(dest);

  return download(url, dest, options)
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

        throttleCb(progress, dest);
      });

      res.on('end', () => {
        cb(100, dest);
      });
    });
}

module.exports = downloader;
