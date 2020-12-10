const module = {
  namespaced: true, // 命名空间
  state: {
    cityId: '110100',
    cityName: '北京'
  },

  mutations: {
    changeCity (state, { id, name }) {
      state.cityId = id
      state.cityName = name
    }
  },

  // 异步
  actions: {

  }
}

export default module
