<template>
  <div id="app">
    <tabbar></tabbar>
    <!-- 路由容器 -->
    <section class="content">
      <router-view></router-view>
    </section>
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
    font-size: 16px!important;
    background-color: #f4f4f4;
  }
  div {
    box-sizing: border-box;
  }
  .content{
    margin-bottom: 50px;
  }
</style>
