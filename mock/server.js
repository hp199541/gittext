// 引入express
let express = require('express')

// 引入mock
let Mock = require('mockjs')

// 实例化express
let app = express()
const path = require('path')

// post请求体相关
let bodyParser = require('body-parser')
app.use(bodyParser.json())

// 允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: url,
    type: type || 'get',
    response (req, res) {
      if (url.indexOf('/css') > 0) {
        res.set('content-type', 'text/css')
        res.send(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
      } else {
        res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
      }
    }
  }
}

// 路由文件
let mocks = require('./index')

const mocksForServer = mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})

for (const mock of mocksForServer) {
  app[mock.type](mock.url, mock.response)
}

app.listen('3000', () => {
  console.log('监听端口 3000')
})
