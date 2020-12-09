<template>
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
</template>

<script>
import Vue from 'vue'
import { Search, Toast } from 'vant'

Vue.use(Search).use(Toast)
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (val) {
      Toast(val)
    },
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    this.$store.commit('hideTabber', false)
  },
  beforeDestroy () {
    this.$store.commit('showTabber', true)
  }
}
</script>

<style>

</style>
