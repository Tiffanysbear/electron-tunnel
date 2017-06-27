/**
 * 设置右击菜单栏
 */
const remote = require('electron').remote;
const {Menu, MenuItem} = remote;
const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const packageJson = require('../../../package.json');

const menu = new Menu();

menu.append(
  new MenuItem({
    label: process.env.NODE_ENV === 'dev' ? 'env: develop' : 'env: production'
  })
);

menu.append(
  new MenuItem({
    label: `version: ${packageJson.version}`
  })
);

menu.append(new MenuItem({ type: 'separator' }));

if (process.platform === 'win32') {
  menu.append(
    new MenuItem({
      label: '键盘',
      click: function() {
        const oskExeFilePath = path.normalize('C:/Windows/System32/osk.exe');
        if (!fs.existsSync(oskExeFilePath)) return;
        child_process.exec(oskExeFilePath);
      }
    })
  );
}

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);


function addMenu(label, handleClick = () => {}) {
  menu.append(
    new MenuItem({
      label,
      click: handleClick
    })
  );
}

module.exports = {
  addMenu
};
