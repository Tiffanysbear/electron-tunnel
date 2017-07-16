/**
 * 设置右击菜单栏
 */
const remote = require('electron').remote;
const {Menu, MenuItem} = remote;
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
