const data = 'body{}'

module.exports = {
  url: '/api/css',
  type: 'get',
  response: config => {
    return data
  }
}
