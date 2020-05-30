'use strict'

const config = require('../config')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const spinner = require('ora')()
const sharp = require('sharp')

String.prototype.replaceAll = function (FindText, RepText) {
  let regExp = new RegExp(FindText, 'g')
  return this.replace(regExp, RepText)
}

console.log(chalk.blue('image tpl builder process'))
spinner.start()
let baseFolder = path.resolve(__dirname, '../../../') // 完整项目根目录
var cssSource = path.resolve(__dirname, '../static/css/images.css') // 开发时images.css所在位置
var imageSource = path.resolve(__dirname, '../static/images')  // 开发时图片所在位置
var cssSourceContent = ''
var jsonData = []

// !可能需自定义
var cssTplPath = path.resolve(baseFolder, 'django_www/event/images.css')
var cssJsonPath = path.resolve(baseFolder, 'django_www/event/images.json')

// 读取文件内容
function readCssFile() {
  return new Promise((resolve, reject) => {
    console.log(chalk.white('try to find resource file:' + cssSource))
    cssSourceContent = fs.readFileSync(cssSource, 'utf-8', (err) => {
      console.log(chalk.red('read file error'))
      reject(err)
    })
    resolve(true)
  })
}

// 准备json 信息
function processCssFiles() {
  return new Promise((resolve, reject) => {
    console.log(chalk.white('try to analytics file:' + cssSource))
    var test = /.*url\([\'\"]?.*[\'\"]?\).*/g
    var lines = cssSourceContent.match(test)
    var urlTest = /[\'\"\(]\.\.\/images\/(.*?)\.(.*?)[\'\"\)]/

    for (var i in lines) {
      let res = lines[i].match(urlTest)
      let tmp = {}
      tmp['baseName'] = res[1] + '.' + res[2]
      tmp['basePath'] = "../images/" + tmp['baseName']
      tmp['filePath'] = imageSource + '/' + tmp['baseName']
      tmp['name'] = res[1]
      tmp['ext'] = res[2]
      var img = sharp(tmp['filePath'])
      img.metadata().then(function (metadata) {
        tmp['size'] = metadata.width + 'x' + metadata.height
        jsonData.push(tmp)
        if (jsonData.length == lines.length) {
          console.log(chalk.green('json data ready'))
          resolve(cssSourceContent)
        }
      })
    }
  }).then(function () {

    // 保存 json 文件
    var saveJson = []
    var saveCssStr = cssSourceContent
    for (var i in jsonData) {
      saveJson.push({
        "name": jsonData[i].name,
        "localUrl": config.prod.assetsPublicPath + "images/" + jsonData[i].baseName,
        "cdnUrl": config.prod.assetsPublicPath + "images/" + jsonData[i].baseName,
        "size": jsonData[i].size
      })
      saveCssStr = saveCssStr.replaceAll(jsonData[i].basePath, '{{ ' + jsonData[i].name + ' }}')
    }
    var saveJsonStr = JSON.stringify(saveJson, null, 2)
    fs.writeFile(cssJsonPath, saveJsonStr, (err) => {
      if (err) {
        reject(err)
        return
      }
      console.log(chalk.green('success save:' + cssJsonPath))
    })
    fs.writeFile(cssTplPath, saveCssStr, (err) => {
      if (err) {
        reject(err)
        return
      }
      console.log(chalk.green('success save:' + cssTplPath))
    })
  })
}



let promises = []
promises.push(readCssFile())
promises.push(processCssFiles())


Promise.all(promises).then(res => {
  console.log(chalk.green('Process Successful！'))
  spinner.stop()
}).catch(rej => {
  console.log(rej, 'error')
  console.log(chalk.red('Upload failed！'))
  spinner.stop()
})
