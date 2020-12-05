<template>
  <div>
    <film-swiper>
      <div class="swiper-slide" v-for="(item,index) in imgList" :key="index">
        <img :src="item" alt="">
      </div>
    </film-swiper>
    <film-header></film-header>
    <router-view></router-view>
  </div>

</template>

<script>
import filmHeader from './film/FilmHeader.vue'
import filmSwiper from './film/FilmSwiper.vue'
export default {
  data () {
    return {
      imgList: ['https://pic.maizuo.com/usr/movie/e8bd96531f01c1d2f64d45e847433c89.jpg?x-oss-process=image/quality,Q_70', 'https://pic.maizuo.com/usr/movie/fb7a16a8dd601247d680c9976b5be542.jpg?x-oss-process=image/quality,Q_70', 'https://pic.maizuo.com/usr/movie/0033bbc9ee55f9c6a146054c3063b12c.jpg?x-oss-process=image/quality,Q_70']
    }
  },
  components: {
    filmHeader,
    filmSwiper
  }
}
</script>

<style lang="scss" scoped>

</style>
