/*
Author：Infinity
Time：2020-07-27
*/
import axios from 'axios'
import { stringify } from 'qs'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { customMessage } from '@/common/utils/resetMessage'
const { VUE_APP_API } = process.env
// 创建axios实例，设置超时时间为20S，根据项目自定义
const instance = axios.create({
  baseURL: VUE_APP_API,
  timeout: 20000
})
// const CancelToken = axios.CancelToken
// const source = CancelToken.source()
// instance.defaults.withCredentials = true // 配置跨域，需要跨域时将此配置加上，同时需要后端配合开放跨域
// 设置post请求默认 Content-Type
instance.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// 请求服务器后返回的状态提示（请求异常时提示）
// eslint-disable-next-line no-unused-vars
const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时，请检查服务器或网络'
}
// 是否直接在请求成功里去除loding
let isLoadingFlag = true
// const returnFlag = true
// 解决快速点击或并发请求出现的多个请求的问题
const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// eslint-disable-next-line no-unused-vars
const removePending = (config) => {
  const url = `${config.url}?${stringify(config.data)}`
  for (const p in pending) {
    if (pending[p].url === url) {
      pending[p].cancel('cancelToken')
      store.commit('SETSPINNING', false)
      pending.splice(p, 1)
    }
  }
}

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // config.cancelToken = source.token // 全局添加cancelToken
    const user = JSON.parse(sessionStorage.getItem(`${store.getters.getTrackId}userData`)) || {}
    if (!user.staffId) router.push('/login')
    const serverData = {
      trackId: store.state.trackId || '',
      permissionsCode: store.state.permissionsCode || '',
      user: user.staffId || ''
    }
    if (config.data instanceof FormData) {
      Object.keys(serverData).forEach(data => {
        config.data.append(data, serverData[data])
      })
    } else if (!config.data) {
      config.data = {}
    }
    // 服务器全局检索字段
    config.data = Object.assign(config.data, serverData)
    if (config.params) {
      config.params = Object.assign(config.params, serverData)
    }
    // removePending(config)
    // 添加请求cancel
    // config.cancelToken = new axios.CancelToken((cancel) => {
    //   const url = `${config.url}?${stringify(config.data)}`
    //   pending.push({ url, cancel })
    // })
    // 序列化参数
    // config.data = stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(response => {
  if (isLoadingFlag) {
    store.commit('SETSPINNING', false)
  }
  // errorCode为1时，请求成功
  // if (response.data.errorCode === 1) {
  //   // removePending(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  //   return response.data // 过滤响应对象里多余的字段，只返回需要的data
  // } else if (response.data.errorCode === -1) {
  //   // errorCode为-1时，请求失败，为服务器问题
  //   Message.error(codeMessage['500'])
  //   return Promise.reject(response.data.errorMsg)
  // } else {
  //   return Promise.reject(response.data)
  // }
  if (response.data.errorCode === -1 || response.data.errorCode === 2) {
    Message.error(codeMessage['500'])
    store.commit('SETSPINNING', false)
    return Promise.reject(response.data.errorMsg)
  } else if (response.data.errorCode === 1003) {
    store.commit('SETSPINNING', false)
    customMessage({ type: 'warning', message: '用户身份信息过期，请重新登录' })
    sessionStorage.removeItem(`${store.getters.getTrackId}userData`)
    store.dispatch('resetUserInfo')
    // 跳转登录
    setTimeout(() => {
      router.go(0)
    }, 1000)
  } else {
    return response.data
  }
}, error => {
  store.commit('SETSPINNING', false)
  // 如果错误是axios.Cancel构造出来的实例则说明多余的请求被拦截掉了，直接返回promise抛出错误信息
  // if (error.constructor === axios.Cancel) return Promise.reject(error)
  // 添加前端提示code
  let code = error.response && error.response.status
  // 如果code不存在且错误信息里包含timeout字段，判断为服务器请求超时，则code设置为504
  if (code === undefined && (error.message.includes('timeout') || error.message.includes('Network Error'))) code = 504
  Message.error(codeMessage[code])
  return Promise.reject(error)
})
// 清除请求参数的首尾空格
const trimParams = (params) => {
  for (const prop in params) {
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty(prop)) {
      if (params[prop] && typeof (params[prop]) === 'string') {
        params[prop] = params[prop].trim()
      }
    }
  }
}
/*
url：请求的地址
params：请求的参数{ key:code }形式
isLoading：请求是否添加loading，默认添加，请求时为false，去除loading
*/
export default {
  // post 请求
  post (url, params, config = { spinning: false }) {
    trimParams(params)
    if (config.timeout) instance.timeout = config.timeout
    if (config.contentType) instance.defaults.headers['Content-Type'] = config.contentType
    // 'Content-Type': 'multipart/form-data'
    if (!config.spinning) {
      isLoadingFlag = true
      store.commit('SETSPINNING', true)
    } else {
      isLoadingFlag = false
    }
    return instance.post(url, params)
  },
  // fileUpload(){

  // },
  // get 请求
  get (url, params, config = { spinning: false }) {
    if (config.timeout) instance.timeout = config.timeout
    if (config.contentType) instance.defaults.headers['Content-Type'] = config.contentType
    // 'Content-Type': 'multipart/form-data'
    if (!config.spinning) {
      isLoadingFlag = true
      store.commit('SETSPINNING', true)
    } else {
      isLoadingFlag = false
    }
    return instance.get(url, { params: { ...params } })
  },
  mock (url, params, spinning) {
    return axios.get(url, params).then(res => {
      store.commit('SETSPINNING', false)
      return res.data || {}
    })
  },
  file (url, config = {}, params = {}, spinning) {
    return axios.get(url, { ...config, params: params || arguments[2] }).then(res => {
      store.commit('SETSPINNING', false)
      return res.data
    })
  }
}
