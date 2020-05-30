/*
 * API
 * needLoading: { Boolean } 是否需要请求加载时的loading组件
 */
import service from '@/utils/request'


const info = params => {
  return service.get('/api/info', { params: params, needLoading: true, opacity: false, delay: 3000 })
}
const news = () => {
  return service.get('/api/allnews')
}
export default {
  info,news
}
