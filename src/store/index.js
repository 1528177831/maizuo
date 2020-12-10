import Vue from 'vue'
import Vuex from 'vuex'
import CinemaModule from './module/cinema'
import TabbarModule from './module/tabbar'
import CityModule from './module/city'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// store "全局的对象"
export default new Vuex.Store({
  plugins: [createPersistedState()],
  // 共享的状态
  state: {
  },
  // 集中式修改状态--被监控
  mutations: {
  },
  // 异步
  actions: {
  },
  modules: {
    CinemaModule,
    TabbarModule,
    CityModule
  }
})

// store 只是存在内存中

// store 配置持久化
