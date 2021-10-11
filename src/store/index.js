import Vue from 'vue'
import Vuex from 'vuex'
import { createUUID } from '@/common/utils/funcStore'
import listMenu from '@/common/utils/listMenu'
import { generatorDynamicRouter } from '@/router/asyncRouter'
import commonModule from './modules/common'
import axios from '@/common/network/request'
import { Message } from 'element-ui'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    spinning: false, // 加载loading的状态
    slideMenu: [],
    breadCurmb: [],
    userData: {},
    trackId: '',
    permissionsCode: '',
    dynamicRouters: [],
    asyncRouters: []
  },
  getters: {
    menus: (state) => {
      return listMenu(state.slideMenu)
    },
    getBreadCurmb: state => state.breadCurmb,
    getTrackId: state => state.trackId,
    dynamicRouters: state => state.dynamicRouters,
    asyncRouters: state => state.asyncRouters
  },
  mutations: {
    // 突变配置加载loading的状态
    SETSPINNING (state, payload) {
      state.spinning = payload
    },
    SETBASICMUTATION (state, payloadObj) {
      state[payloadObj.storeName] = payloadObj.payload
    },
    // 设置面包屑
    SEtBREADCURMB (state, payload) {
      state.breadCurmb = payload
    },
    SAVEROUTER (state, routersData) {
      state.dynamicRouters = routersData
    },
    SETROUTER (state) {
      return new Promise((resolve, reject) => {
        generatorDynamicRouter(state.slideMenu).then(res => {
          state.dynamicRouters = []
          state.dynamicRouters = [...res]
          state.dynamicRouters.push({
            path: '*',
            name: 'None',
            component: () => import('@/views/404/index.vue')
          })
          resolve(state.dynamicRouters)
        })
      })
    },
    SAVEPERMISSIONSCODE (state, payload) {
      state.permissionsCode = payload
    },
    SAVETRACKID (state, payload) {
      state.trackId = payload
    },
    RESETHEADERDATA (state) {
      state.trackId = ''
      state.permissionsCode = ''
      state.slideMenu = []
      state.userData = {}
      state.permissionsCode = ''
    }
  },
  // 配置异步提交状态
  actions: {
    getUserInfo ({ commit }, form) {
      sessionStorage.removeItem(`${this.getters.getTrackId}userData`)
      commit('RESETHEADERDATA')
      commit('SAVETRACKID', createUUID())
      return new Promise((resolve, reject) => {
        axios.post('/interfacecommon/login', form).then(res => {
          const { data } = res
          if (res.errorCode === 1) {
            // 将用户信息保存在session中
            sessionStorage.setItem(`${this.getters.getTrackId}userData`, JSON.stringify({
              staffId: data.userName
            }))
            commit('SETBASICMUTATION', { payload: data.menuPermissions, storeName: 'slideMenu' })
            commit('SAVEPERMISSIONSCODE', data.permissionsCode)
            resolve(true)
          } else if (res.errorCode === 1000) {
            Message.warning('用户名或密码有误，请核对用户名或密码')
          } else if (res.errorCode === 1001) {
            Message.error('当前账号无访问权限，请联系管理员')
          }
        })
      })
    },
    setRouter ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SETROUTER')
        resolve()
      })
    },
    // 重置vuex
    resetUserInfo ({ commit }) {
      commit('RESETHEADERDATA')
    }
  },
  // 配置store模块
  modules: {
    commonModule: commonModule
    // routerModule: routerModule
  },
  plugins: [
    createVuexAlong({
      name: 'system',
      local: {
        list: ['slideMenu', 'breadCurmb', 'trackId', 'permissionsCode', 'spinning', 'dynamicRouters'],
        isFilter: true
      },
      session: {
        // slideMenu: [],
        // breadCurmb: [],
        // trackId: '',
        // permissionsCode: '',
        // activityLevels: []
        list: ['slideMenu', 'breadCurmb', 'trackId', 'permissionsCode']
      }
    })
  ]
})
