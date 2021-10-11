
const routerModule = {
  namespaced: true,
  state: {
    asyncRouters: []
  },
  getters: {
    asyncRouters: state => state.asyncRouters
  },
  mutations: {
    SETROUTER (state, routersData) {
      state.asyncRouters = routersData
    }
  }
}
export default routerModule
