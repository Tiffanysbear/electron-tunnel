const electron = require('electron');
const {
  setResizable,
  setFullScreen,
  quitFullScreen,
  setScreenSize
} = require('../events/screen.js');
const getScreenSize = require('../../bootup/getScreenSize.js');
const {webFrame} = require('electron');

function smartEnterFullScreen() {

  const { fullscreenZoomFactor } = getScreenSize(electron.screen);
  return setResizable(true) //允许窗口改变大小
    .then(() => {
      return setFullScreen(); //进入全屏
    })
    .then(() => {
      webFrame.setZoomFactor(fullscreenZoomFactor); //修改缩放比
    });
}


function smartQuitFullScreen() {
  const {
    unfullscreenZoomFactor,
    unfullscreenSize
  } = getScreenSize(electron.screen);

  return quitFullScreen() //退出全屏
    .then(() => {
      return setScreenSize(unfullscreenSize); //设置窗口大小
    })
    .then(() => {
      webFrame.setZoomFactor(unfullscreenZoomFactor); //修改缩放比
      return setResizable(false); //禁止修改大小
    });
}

module.exports = {
  smartEnterFullScreen,
  smartQuitFullScreen
};
