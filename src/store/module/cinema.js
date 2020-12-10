import http from '@/until/http'

const module = {
  namespaced: true, // 命名空间
  state: {
    district: 0,
    convert: 0,
    distance: 0,
    cinemaList: [],
    districtList: [
      {
        text: '全城',
        value: 0
      }
    ],
    convertList: [
      {
        text: 'APP订票',
        value: 0
      },
      {
        text: '前台兑换',
        value: 1
      }
    ],
    distanceList: [
      {
        text: '最近去过',
        value: 0
      },
      {
        text: '距离最近',
        value: 1
      }
    ]
  },

  // getters
  getters: {
    // 给Cinema组件
    cinemaListGetByDistrictName (state) {
      var cityObj = state.districtList.find(item => item.value === state.district)
      if (cityObj.text === '全城') {
        return state.cinemaList
      }
      return state.cinemaList.filter(item => item.districtName === cityObj.text)
    }
  },

  mutations: {
    setCinemaList (state, cinemaList) {
      state.cinemaList = cinemaList
    },
    clearCinemaList (state) {
      state.cinemaList = []
    },
    setdistrictList (state, cinemaList) {
      state.districtList = [{ text: '全城', value: 0 }].concat(cinemaList)
    }
  },

  actions: {
    getCinemaList (state, cityId) {
      return http(`https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1`, {
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        state.commit('setCinemaList', res.data.data.cinemas)
        state.commit('setdistrictList', [...new Set(res.data.data.cinemas.map(item => item.districtName))].map((value, index) => {
          return { text: value, value: index + 1 }
        }))
      })
    }
  }
}

export default module
