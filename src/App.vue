<template>
  <div id="app">
    <tabbar v-show="$store.state.isTabberShow"></tabbar>
    <!-- 路由容器 -->
    <section class="container">
      <transition name="app" mode="out-in">
        <router-view></router-view>
      </transition>
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
  }
  div {
    box-sizing: border-box;
  }
  .container{
    margin-bottom: 50px;
  }
  .app-enter-active{
    animation: aaa 0.3s;
  }
  .app-leave-active{
    animation: aaa 0.3s reverse;
  }

  @keyframes aaa{
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px)
    }
  }
</style>
