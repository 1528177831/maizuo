<template>
  <nav>
    <ul>
      <!-- 声明式导航 -->
      <router-link v-for="(item,index) in list" :key="index" :to="item.path" tag="li" active-class="linkactive">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.name}}</span>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          name: '电影',
          path: '/film/nowplaying',
          icon: 'icon-training'
        },
        {
          name: '影院',
          path: '/cinema',
          icon: 'icon-store'
        },
        {
          name: '我的',
          path: '/center',
          icon: 'icon-account'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  nav{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 25px;
    text-align: center;
    background: #fff;
    z-index: 10;
    ul{
      display: flex;
      li{
        flex: 1;
        display: flex;
        flex-direction: column;
        i{
          font-size:18px;
        }
        span{
          font-size:12px;
        }
      }
    }
  }

  .linkactive{
    color:red;
  }
</style>
