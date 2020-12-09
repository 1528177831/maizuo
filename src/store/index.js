import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// store "全局的对象"
export default new Vuex.Store({
  // 共享的状态
  state: {
    cityId: '110100',
    cityName: '北京',
    isTabberShow: true
  },
  // 集中式修改状态--被监控
  mutations: {
    changeCity (state, { id, name }) {
      state.cityId = id
      state.cityName = name
    },
    hideTabber (state) {
      state.isTabberShow = false
    },
    showTabber (state) {
      state.isTabberShow = true
    }
  },
  actions: {
  },
  modules: {
  }
})

// store 只是存在内存中

// store 配置持久化
