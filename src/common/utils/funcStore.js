import { stringify } from 'qs'
import store from '@/store'
// 深拷贝
export function deepClone (obj) {
  const target = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object') {
        target[key] = deepClone(obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}
// 滚动条返回顶部
export function backTop () {
  const timer = setInterval(function () {
    const top = document.body.scrollTop || document.documentElement.scrollTop
    const speed = top / 4
    if (document.body.scrollTop !== 0) {
      document.body.scrollTop -= speed
    } else {
      document.documentElement.scrollTop -= speed
    }
    if (top === 0) {
      clearInterval(timer)
    }
  }, 30)
}
export function scrollTo (distance) {
  const timer = setInterval(function () {
    const top = document.body.scrollTop + document.documentElement.scrollTop
    const speed = Math.floor(distance / 4)
    document.body.scrollTop += speed
    document.documentElement.scrollTop += speed
    // if (document.body.scrollTop !== 0) {
    //   document.body.scrollTop += speed
    // } else {
    //   document.documentElement.scrollTop += speed
    // }
    // 垃圾ie
    if (top >= distance || isScrollToBottom()) {
      clearInterval(timer)
    }
  }, 30)
}
// 获取滚动条距离顶部位置
export function getScrollTop () {
  var scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}
export function isScrollToBottom () {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  return scrollTop + clientHeight === scrollHeight
}
// el滚动到指定节点
export function scrollView (object, $this) {
  for (const i in object) {
    let dom = $this.$refs[i]
    if (Object.prototype.toString.call(dom) !== '[object Object]') {
      dom = dom[0]
    }
    dom.$el.scrollIntoView({ // 滚动到指定节点
      // 值有start,center,end，nearest，当前显示在视图区域中间
      block: 'center',
      behavior: 'smooth'
    })
    break
  }
}
// 时间格式化
export function dateFormat (fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}
// 千分位加逗号
export function setTousandNum (num) {
  const res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ','
    })
  })
  return res
}
// 生成uuid
export function createUUID (length = 128) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = new Array(length)
  var rnd = 0
  var r
  for (var i = 0; i < length; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid[i] = '-'
    } else if (i === 14) {
      uuid[i] = '4'
    } else {
      if (rnd <= 0x02) { rnd = 0x2000000 + (Math.random() * 0x1000000) | 0 }
      r = rnd & 0xf
      rnd = rnd >> 4
      uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
    }
  }
  return uuid.join('').replace(/[-]/g, '').toLowerCase()
}
// 短横线转化驼峰命名
export function kebabCaseToCamelCase (str) {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/\-[a-z]/g, function (a, b) {
    return b === 0 ? a.replace('-', '') : a.replace('-', '').toUpperCase()
  })
}

export function downLoadFile (downUrl, obj = {}) {
  const user = {
    trackId: store.state.trackId || '',
    permissionsCode: store.state.permissionsCode || '',
    user: (JSON.parse(sessionStorage.getItem(`${store.getters.getTrackId}userData`)) ? JSON.parse(sessionStorage.getItem(`${store.getters.getTrackId}userData`)).staffId : '') || ''
  }
  const url = `${process.env.VUE_APP_API}${downUrl}?${stringify({ ...obj, ...user })}`
  location.href = url
  // return url
}
