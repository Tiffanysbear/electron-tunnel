/**
 * 在本地起一个服务器，将public文件夹当做静态资源
 */

const express = require('express');
const portfinder = require('portfinder');
const path = require('path');
const config = require('../config.js');
const logger = require('../logger.js');

module.exports = function() {
  return new Promise((resolve, reject) => {
    const expressServer = express();

    portfinder.getPort(function (err, port) {
      if (err) {
        logger.error(err);
        reject(err);
      }

      config.expressServerPort = port;

      expressServer.use(express.static(path.join(__dirname, '../../public')));
      logger.info(`static server path: ${path.join(__dirname, '../../public')}`);

      expressServer.listen(port, '127.0.0.1', () => {
        logger.info(`express server is starting in port: ${port}`);
        resolve(port);
      });
    });

  });
};
