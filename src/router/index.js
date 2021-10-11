import Vue from 'vue'
import VueRouter from 'vue-router'
// import baseLayout from '@/layouts/baseLayout'
// import tabLayout from '@/layouts/tabLayout'
// import './asyncRouter'
import routes from './baseRouter'
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
// 捕获路由异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
