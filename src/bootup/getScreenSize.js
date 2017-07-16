/**
 * 计算屏幕尺寸
 */

//设计稿大小
const 

/**
 * 获取屏幕大小，缩放比
 */
function getScreenSize(screen) {
  //全屏大小
  const fullscreenSize = screen.getPrimaryDisplay().workAreaSize;
  return fullscreenSize;
}

module.exports = getScreenSize;
