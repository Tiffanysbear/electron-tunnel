/**
 * 计算屏幕尺寸
 */

//设计稿大小
const DEFAULT_WIN_SIZE = {
  width: 1024,
  height: 768
};

/**
 * 获取屏幕大小，缩放比
 */
function getScreenSize(screen) {
  //全屏大小
  const fullscreenSize = screen.getPrimaryDisplay().workAreaSize;

  //全屏缩放比, 根据高度
  const fullscreenZoomFactor = fullscreenSize.height / DEFAULT_WIN_SIZE.height;

  //非全屏大小
  const unfullscreenSize = {};
  unfullscreenSize.height = ~~(fullscreenSize.height * 0.8);
  unfullscreenSize.width = ~~(fullscreenSize.width * 0.8);

  //非全屏缩放比
  const unfullscreenZoomFactor = unfullscreenSize.height / DEFAULT_WIN_SIZE.height;

  return {
    fullscreenSize,
    fullscreenZoomFactor,
    unfullscreenSize,
    unfullscreenZoomFactor
  };
}

module.exports = getScreenSize;
