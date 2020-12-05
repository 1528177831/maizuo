<template>
  <div>
    <!-- detail====>{{list}} -->
    <div>
      <img :src="filmInfo.poster">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      filmInfo: {}
    }
  },
  mounted () {
    // this.$route：当前匹配的路由信息
    // console.log('利用获取的id，ajax请求后端接口',this.$route.params.myid)
    // query传参进入详情页
    // console.log('利用获取的id，ajax请求后端接口',this.$route.query)
    axios.get(`/api/gateway?filmId=${this.$route.params.myid}`, {
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606891400760514154070017","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.info',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Token': 'undefined'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  }
}
</script>

<style>

</style>
