<template>
  <div id="app">
    <tabbar></tabbar>
    <!-- 路由容器 -->
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from './components/Tabbar'
export default {
  data () {
    return {

    }
  },
  components: {
    tabbar
  }
}
</script>

<style lang="scss">
  body{
    font-size: 16px;
  }
</style>
