const electron = require('electron');
const {isFullScreen} = require('../events/screen.js');
const getScreenSize = require('../../bootup/getScreenSize.js');
const {webFrame} = electron;

//自动重置缩放比
function resetZoomFactor() {
  const {
    fullscreenZoomFactor,
    unfullscreenZoomFactor
  } = getScreenSize(electron.screen);

  return isFullScreen()
    .then(bool => {
      bool ? webFrame.setZoomFactor(fullscreenZoomFactor) : webFrame.setZoomFactor(unfullscreenZoomFactor);
    });
}

module.exports = resetZoomFactor;
