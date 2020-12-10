<template>
  <div>
    <van-nav-bar
      title="当前城市-"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="cross" size="18" color="#000"/>
      </template>
    </van-nav-bar>
    <van-search v-model="value" placeholder="请输入搜索关键词" @focus="showAction" :show-action="isCannel" background="#f4f4f4" @cancel="onCancel" />
    <van-index-bar v-if="!isShow" :index-list="indexList">
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" style="background:#f4f4f4">{{data.type}}</van-index-anchor>
        <van-cell :title="item.name" v-for="(item,index) in data.list" :key="index" @click="handleChangePage(item.cityId,item.name)"/>
      </div>
    </van-index-bar>
    <van-list v-else>
      <van-cell v-for="item in computedCityList" :key="item.cityId" :title="item.name" @click="handleChangePage(item.cityId,item.name)"/>
    </van-list>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Search, IndexBar, IndexAnchor, cell, List } from 'vant'
import http from '@/until/http'
import { mapMutations } from 'vuex'

Vue.use(NavBar).use(Icon).use(Search).use(List).use(IndexBar).use(IndexAnchor).use(cell)
export default {
  data () {
    return {
      value: '',
      isCannel: false,
      cityList: [],
      isShow: false,
      citySearchList: []
    }
  },
  mounted () {
    this.hideTabber()
    http({
      url: '/api/gateway',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    })
      .then(res => {
        this.citySearchList = res.data.data.cities
        this.cityList = this.handleCityData(res.data.data.cities)
      })
  },
  watch: {
    value () {
      this.isShow = true
    }
  },
  beforeDestroy () {
    this.showTabber()
  },
  methods: {
    ...mapMutations('TabbarModule', ['hideTabber', 'showTabber']),
    ...mapMutations('CityModule', ['changeCity']),
    onClickLeft () {
      this.$router.back()
    },
    showAction () {
      this.isCannel = true
    },
    onCancel () {
      this.isCannel = false
      this.isShow = false
    },
    handleCityData (cities) {
      const letter = []
      const newCityList = []
      for (let code = 65; code < 91; code++) {
        letter.push(String.fromCharCode(code))
      }
      letter.forEach(letter => {
        const list = cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        if (list.length > 0) {
          newCityList.push({
            type: letter,
            list: list
          })
        }
      })
      return newCityList
    },
    handleChangePage (id, name) {
      // cityId cityName记录下来
      // 提交
      // this.$store.commit('changeCity', { id, name })
      this.changeCity({ id, name })
      // this.$store.state.cityId = id
      // this.$store.state.cityName = name
      this.$router.back()
    }
  },
  computed: {
    indexList () {
      return this.cityList.map(item => item.type)
    },
    computedCityList () {
      if (this.value === '') return []
      return this.citySearchList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.pinyin.toUpperCase().includes(this.value.toUpperCase()))
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-search__content{
    background: #fff;
  }
</style>
