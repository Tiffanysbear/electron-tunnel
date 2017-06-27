const {
  SET_FULL_SCREEN,
  QUIT_FULL_SCREEN,
  IS_FULL_SCREEN,
  SET_SCREEN_SIZE,
  SET_RESIZABLE,
  TOGGLE_DEVTOOLS,
  QUIT_APP,
  APP_INFO,
  ALERT
} = require('./eventNames.js');

const {
  setFullScreen,
  quitFullScreen,
  isFullScreen,
  setScreenSize,
  setResizable,
  toggleDevTools
} = require('./screen.js');

const {
  quitApp,
  appInfo,
  alert
} = require('./app.js');

module.exports = {
  [SET_FULL_SCREEN]: setFullScreen,
  [QUIT_FULL_SCREEN]: quitFullScreen,
  [IS_FULL_SCREEN]: isFullScreen,
  [SET_SCREEN_SIZE]: setScreenSize,
  [SET_RESIZABLE]: setResizable,
  [TOGGLE_DEVTOOLS]: toggleDevTools,
  [QUIT_APP]: quitApp,
  [APP_INFO]: appInfo,
  [ALERT]: alert
};
