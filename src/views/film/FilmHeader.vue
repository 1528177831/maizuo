<template>
  <div class="header">
    <van-tabs v-model="active" sticky>
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
      sticky: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    background-color: #fff;
    position: sticky;
    top: -1px;
    z-index: 999;
    overflow: hidden;
  }
</style>
