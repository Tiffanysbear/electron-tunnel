/**
 * 添加各种插件
 */

const path = require('path');
const config = require('../config.js');

/**
 * add flash plugin
 */
function addFlashPlugin(app) {
  const {platform, arch} = process;
  let flashPluginPath;
  switch (platform) {
    case 'win32':
      flashPluginPath = path.join(__dirname, `../../plugins/flashplayer/win32/${arch}/pepflashplayer.dll`);
      break;
    case 'darwin':
      flashPluginPath = path.join(__dirname, '../../plugins/flashplayer/darwin/x64/PepperFlashPlayer.plugin');
      break;
    default:
      break;
  }

  app.commandLine.appendSwitch('ppapi-flash-path', flashPluginPath);
  app.commandLine.appendSwitch('ppapi-flash-version', config.flashplayer[platform][arch]);
}

module.exports = {
  addFlashPlugin
};
