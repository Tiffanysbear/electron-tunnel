/**
 * task是对多个event的组合，方便web调用
 */

const {
  smartEnterFullScreen,
  smartQuitFullScreen
} = require('./smartSetQuitFullScreen.js');
const resetZoomFactor = require('./resetZoomFactor.js');

module.exports = {
  smartEnterFullScreen,
  smartQuitFullScreen,
  resetZoomFactor
};
