'use strict'
const config = require('../config')
module.exports = {
  host: '119.28.45.199',
  port: '10021',
  user: 'hazel',
  password: 'BfNLKDz4dhC',
  domain: 'https://freefiremobile-a.akamaihd.net',
  urlPath: '/common/web_event',
  uploadDir: '/common/web_event',
  testImg: '/images/favicon.png',
  localRoot: __dirname + "/../dist",
  remoteRoot: "/common/web_event/" + config.projectName,
  sourceDir:__dirname + "/../dist",//上传文件目录
  targetDir:"/common/web_event/" + config.projectName,
  connTimeout:10000,
  pasvTimeout:1000,
  keepalive:10000,
}
