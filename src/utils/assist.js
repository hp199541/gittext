/*
 * assist function
 */

/**
 *
 * @param {*} name
 */
export const getCookie = name => {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

/**
 *
 * @param {*} key
 * @param {*} val
 */
export const setSessionStorage = (key, val) => {
  window.sessionStorage.setItem(key, val)
}
/**
 *
 * @param {*} key
 */
export const getSessionStorage = key => {
  let result = window.sessionStorage.getItem(key)
  return result
}

/**
 *
 * @param {*} name
 */
export const deleteUrlParam = name => {
  var query = window.location.search.substr(1)
  if (query.indexOf(name) > -1) {
    var obj = {}
    var arr = query.split('&')
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=')
      obj[arr[i][0]] = arr[i][1]
    }
    delete obj[name]
    var url = JSON.stringify(obj)
      .replace(/[\"\{\}]/g, '')
      .replace(/\:/g, '=')
      .replace(/\,/g, '&')
    var http = 'https:' == document.location.protocol ? 'https://' : 'http://'
    window.history.replaceState(
      {},
      0,
      http + window.location.host + window.location.pathname + '?' + url
    )
  }
}

/**
 * NOTE 需要和后端同学确认一下默认参数
 * 如果没有region或者region错误，直接返回US_en。
 * 如果是默认语言，则返回region，否则返回region_lang
 * @param {*} region
 * @param {*} lang
 */
export const getRegionLang = (region = 'US', lang = 'es') => {
  const regionMap = {
    BR: {
      default: 'pt',
      other: []
    },
    SAC: {
      default: 'es',
      other: []
    },
    VN: {
      default: 'vn',
      other: []
    },
    SG: {
      default: 'en',
      other: []
    },
    RU: {
      default: 'ru',
      other: []
    },
    IND: {
      default: 'en',
      other: []
    },
    ME: {
      default: '',
      other: ['ar', 'fr', 'en']
    },
    TW: {
      default: 'zh-tw',
      other: ['ja', 'ko'] // 此处为了迎合后台，对应的是transify
    },
    TH: {
      default: 'th',
      other: ['en']
    },
    US: {
      default: 'es',
      other: []
    },
    ID: {
      default: 'id',
      other: []
    },
    EU: {
      default: '',
      other: ['tr', 'en']
    },
    EUROPE: {
      default: '',
      other: ['tr', 'en']
    },
    NA: {
      default: '',
      other: ['es', 'en']
    }
  }
  let regionLang = ''
  if (regionMap[region].default === lang || regionMap[region].other.indexOf(lang) < 0) {
    if (region === 'ME') {
      // ME区 除了ME_fr 其他都是ME_ar
      regionLang = 'ME_ar'
    } else {
      regionLang = region === 'EU' ? 'EUROPE_en' : region
    }
  } else {
    regionLang = region === 'EU' ? `EUROPE_${lang}` : `${region}_${lang}`
  }
  return regionLang
}

/**
 *
 * @param {*} url
 */
export const loadStyle = url => {
  var link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  var head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

// -------------GA start--------
/**
 *
 * @param {*} region
 * @param {*} uid
 */
export const initGA = (region, uid) => {
  window.gtag('config', window.analyticsId, {
    dimension1: region,
    page_title: PROJECT_NAME, // defined in webpack
    page_path: '/index.html'
  })
  window.gtag('set', { user_id: uid })
  console.log(`region ${region}, uid ${uid}`)
}
/**
 *
 * @param {*} event
 * @param {*} status
 */
export const addGA = (event, status) => {
  console.log(`event: ${event}, status: ${status}`)
  var report = {
    event_label: status
  }
  window.gtag('event', event, report)
}
/**
 *
 * @param {*} err
 */
export const errorGA = err => {
  window.gtag('event', 'exception', {
    description: err,
    fatal: false
  })
}
// -------------GA end--------

/**
 * 将Unix时间戳转换成当地时间
 * @param {*} time 
 */
export const getTime = time => {
  return new Date(time * 1000).toLocaleString()
}

/**
 * 延迟函数
 * @param {Function} fn 
 * @param {Number} delay 
 */
export const timeout = (fn, delay) => {
  let timer = null
  timer = setTimeout(() => {
    fn()
    clearTimeout(timer)
    timer = null
  }, delay)
}
/**
 * 比较函数
 * @param key 指定比较的元素
 */
export const compare = (key, order = 'asc') => {
  return (now, next) => {
    switch (order) {
      case 'des':
        return next[key] - now[key]
      case 'asc':
        return now[key] - next[key]
    }
  }
}
