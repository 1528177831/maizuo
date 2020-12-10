<template>
  <div class="header" ref="header">
    <van-tabs v-if="offsetTop" v-model="active" sticky :offset-top="offsetTop">
      <van-tab title="正在热映" to="/film/nowplaying"></van-tab>
      <van-tab title="即将上映" to="/film/comingsoon"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs } from 'vant'

Vue.use(Tab)
Vue.use(Tabs)
export default {
  data () {
    return {
      active: 2,
      offsetTop: ''
    }
  },
  mounted () {
    this.offsetTop = this.$refs.header.offsetHeight
  }
}
</script>

<style lang="scss" scoped>
.header{
  background-color: #fff;
  height: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 999;
  overflow: hidden;
}
</style>
