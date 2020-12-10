const module = {
  namespaced: true, // 命名空间
  state: {
    isTabberShow: true
  },

  mutations: {
    hideTabber (state) {
      state.isTabberShow = false
    },
    showTabber (state) {
      state.isTabberShow = true
    }
  },

  actions: {

  }
}

export default module
