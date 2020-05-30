'use strict'
require('./check-versions')()

const argvs = process.argv.splice(2)
const isCDN = argvs.includes('cdn')
process.env.CDN_ARGV = isCDN // String类型

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const inquirer = require('inquirer')
const ftp = require('ftp')
const ftpConfig = require('../config/ftp')
const ftpTools = require('../build/ftp.tools')
const exec = require('child_process').exec
const spinner = ora('building for production...')
spinner.start()

let assetsRoot = config.build.assetsRoot
let assetsSubDirectory = config.build.assetsSubDirectory
if (process.env.CDN_ARGV === 'true') {
  assetsRoot = config.prod.assetsRoot
  assetsSubDirectory = config.prod.assetsSubDirectory
}
rm(path.join(assetsRoot, assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"
      )
    )

    imageTemplateUpdate()
  })
})

function imageTemplateUpdate() {
  console.log(chalk.red('Do you want to update images template and json file?'))
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'needUpdate',
        message: 'y or N ?',
        default: false
      }
    ])
    .then(res => {
      if (!res.needUpdate) {
        console.log(chalk.yellow('Stop Update Images Template and JSON file'))
        uploadCdn()
      } else {
        exec('node build/tplbuilder.js', function(err, stdout, stderr) {
          if (err) {
            console.log(err)
          } else {
            console.log(chalk.green('Update Success'))
            uploadCdn()
          }
        })
      }
    })
}

function uploadCdn() {
  if (process.env.CDN_ARGV === 'true') {
    console.log(chalk.red('Do you want to upload the "dist" folder to CDN FTP server?'))
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'needUpload',
          message: 'y or N ?',
          default: false
        }
      ])
      .then(res => {
        if (!res.needUpload) {
          console.log(chalk.yellow('Stop Upload Process'))
          return
        }
        console.log(chalk.yellow('Try to Connect FTP:\t' + ftpConfig.host + ':' + ftpConfig.port))
        console.log(chalk.yellow('username:\t\t' + ftpConfig.user + '\n'))
        console.log(chalk.yellow('Project Name: \t' + config.projectName))
        var f = new ftp()

        f.on('ready', function() {
          f.list(ftpConfig.uploadDir, function(err, list) {
            if (err) console.log(err)
            // Check FTP  Folder
            var hasDir = false
            for (var i in list) {
              if (list[i].name === config.projectName) {
                hasDir = true
              }
            }
            if (!hasDir) {
              console.log(
                chalk.yellow(
                  'Try to create folder: \t ' +
                    ftpConfig.uploadDir +
                    '/' +
                    config.projectName +
                    '\n' +
                    'Upload speed is very slow'
                )
              )
              f.mkdir(ftpConfig.uploadDir + '/' + config.projectName, function(err, res) {
                if (err) console.log(err)
                console.dir(res)
              })
            }
            f.end()
            ftpTools(ftpConfig)
          })
        })

        f.on('error', function(err) {
          console.log(err)
        })

        f.connect(ftpConfig)
      })
  }
}
