import Vue from 'vue'
import axios from '@/common/network/request'
import bus from '@/common/utils/bus'
import debounce from '@/common/utils/debounce'
import { createUUID } from '@/common/utils/funcStore'
import watermark from '@/common/utils/watermark'
Vue.prototype.$request = axios // 挂载请求
Vue.prototype.$debounce = debounce // 挂载防抖函数
Vue.prototype.$createUUID = createUUID // 挂载uuid
Vue.prototype.$bus = bus // 挂载bus
Vue.prototype.$watermark = watermark
