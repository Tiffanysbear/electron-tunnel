console.info('loading bridge.js!');

require('./env.js');
const fs = require('fs');
const os = require('os');
const {webFrame} = require('electron');
const tasks = require('./tasks/index.js');
const {
  screen,
  download,
  app,
  menu
} = require('./events/index.js');

window.ElectronBridge = {
  os,
  fs,
  tasks,
  screen,
  download,
  webFrame,
  app,
  menu
};
