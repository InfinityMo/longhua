const commonModule = {
  namespaced: true,
  state: {
    activityLevels: []
  },
  getters: {
    activityLevels: state => state.activityLevels
  },
  mutations: {
    SETBASICMUTATION (state, payloadObj) {
      state[payloadObj.storeName] = payloadObj.payload
    }
  }
}
export default commonModule
