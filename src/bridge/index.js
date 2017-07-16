console.info('loading bridge.js!');

require('./browserEnv.js');
const fs = require('fs');
const os = require('os');
const {webFrame} = require('electron');
const {
  screen,
  download,
  app,
  menu
} = require('./events/index.js');

window.ElectronBridge = {
  os,
  fs,
  screen,
  download,
  webFrame,
  app,
  menu
};
