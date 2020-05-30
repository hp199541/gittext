/*
 * http request
 * 1. 防止重复请求
 * 2. 统一loading处理
 * 3. 统一错误提示
 */
import axios from 'axios'
import bus from '@/bus'

const { CancelToken } = axios

const DELAY_TIME = 20000 // 请求超时时间

// 错误返回
const errorMsg = {
  type: 'error',
  code: 'TOAST_NETWORK_ERROR' // DUPLICATE|TIMEOUT|other key
}
// 请求集合，防止重复点击
const requestUrls = []
let requestFlag = ''
let LoadingDelay = 0 // loading 延时消失时间
const removeRequestUrl = () => { // 移除队列中的该请求
  requestUrls.splice(requestUrls.indexOf(requestFlag), 1)
}
// TODO 清除 error 缓存
// 因为 errorMsg 是全局变量
// 有可能导致上一次请求的 errorMsg 被缓存，导致本次提示信息有误（小概率事件）
// 处理方案：1. 在请求前清除缓存 2. 补全后面的 error 处理
// 这里暂使用方案 1
const resetErrorMsg = () => {
  errorMsg.code = 'TOAST_NETWORK_ERROR'
}
/* 创建axios实例 */
const service = axios.create({
  baseURL: '',
  timeout: DELAY_TIME,
  withCredentials: true
})
const regex = /.*csrftoken=([^;.]*).*$/ // 用于从cookie中匹配 csrftoken值

/**
 * 请求加载框 如果不需要返回空
 * @param {boolean} visable loading 状态 true|false
 * @return loading 组件
 */
const handleLoading = (visable, opacity = false, delay = 0) => {
  // TODO loading 组件
  bus.handleLoading(visable, opacity, delay)
}

/* request拦截器 */
service.interceptors.request.use(
  // eslint-disable-next-line consistent-return
  config => {
    resetErrorMsg()
    LoadingDelay = config.delay
    config.needLoading && handleLoading(true, config.opacity)
    // 重复点击start=======
    requestFlag = config.url + config.method
    if (requestUrls.indexOf(requestFlag) > -1) {
      config.cancelToken = new CancelToken(cancel => {
        errorMsg.code = 'DUPLICATE'
        cancel('duplicate request')
      })
    } else {
      requestUrls.push(requestFlag)
      config.headers['X-CSRFToken'] = document.cookie.match(regex) ? document.cookie.match(regex)[1] : null
    }
    // 重复点击end=======
    return config
  },
  error => {
    // NOTE 这种情况未考虑
    Promise.reject(error)
  }
)

/* respone拦截器 */
service.interceptors.response.use(
  response => {
    console.log(1)
    handleLoading(false, false, LoadingDelay)
    removeRequestUrl()
    // TODO if error state returns
    if (response.data.status === 'error') {
      errorMsg.code = response.data.msg
      if (errorMsg.code.indexOf('FLIP') > -1) {
        bus.handleToast(true, errorMsg.code, false)
      } else {
        bus.handleError(errorMsg.code)
      }
      return Promise.reject(errorMsg)
    } else {
      return response.data
    }
  },
  error => {
    // 异常处理
    // console.log('异常处理：', error.message)
    // 1. 重复请求
    if (error.message && error.message === 'duplicate request') {
      errorMsg.code = 'DUPLICATE'
      return Promise.reject(errorMsg)
    }
    handleLoading(false, false, LoadingDelay)
    // 2. 请求超时 "timeout of xxxms exceeded"
    if (error.message && error.message.indexOf('timeout') > -1) {
      errorMsg.code = 'TIMEOUT'
      bus.handleError(errorMsg.code)
      removeRequestUrl()
      return Promise.reject(errorMsg)
    }
    // 3. 非2xx || 其他错误 (eg: "Network Error"[断网])
    // TODO 如果error.response存在，
    // TODO 可从error.response.data中获取后端返回的错误码并更新 errorMsg.code
    // TODO 并未考虑 [error.response不存在] 和 [其存在但后端未返回错误码] 的情况
    if (error.response && error.response.data.msg) {
      errorMsg.code = error.response.data.msg
    }
    bus.handleError(errorMsg.code)
    removeRequestUrl()
    return Promise.reject(errorMsg)
  }
)

export default service
