/**
 * 只允许存在一个app实例
 */

module.exports = function (app, win) {
  const shouldQuit = app.makeSingleInstance(() => {
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      }
      win.focus();
    }

    return true;
  });

  if (shouldQuit) {
    app.quit();
  }
};
