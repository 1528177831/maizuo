<template>
  <div v-if="filmInfo">
    <div class="film" v-if="imgShow">
      <div class="back" @click='back'>
        <i class="iconfont icon-back"></i>
      </div>
      <detail-header v-top class="film-header">
        <h4>{{filmInfo.name}}</h4>
      </detail-header>
      <div class="film-poster">
        <img :src="filmInfo.poster" alt="">
      </div>
      <div class="film-detail">
        <div class="col">
          <div class="film-name">
            <span class="name">{{filmInfo.name}}</span>
            <span class="item">{{filmInfo.filmType.name}}</span>
          </div>
          <div class="film-grade">
            <span class="grade">{{filmInfo.grade}}</span>
            <span class="grade-text">分</span>
          </div>
        </div>
        <div class="film-category grey-text">
          {{filmInfo.category}}
        </div>
        <div class="film-premiere-time grey-text">
          {{filmInfo.premiereAt | formatDate}}上映
        </div>
        <div class="film-nation-runtime grey-text">
          {{filmInfo.nation}} | {{filmInfo.runtime}}分钟
        </div>
        <div class="film-synopsis grey-text" :class="isShow ? 'hide': ''">
          {{filmInfo.synopsis}}
        </div>
        <div class="toggle">
          <i class="iconfont" :class="isShow ? 'icon-moreunfold' : 'icon-less'" @click="check"></i>
        </div>
      </div>
      <div class="actors">
        <div class="actors-title-bar">
          <span class="actors-title-text">演职人员</span>
        </div>
        <detail-swiper :perslide="4" swiperclass="swiper-actors" style="height:1.4rem;padding-left:0.1rem;">
          <div class="swiper-slide" v-for="(item,index) in filmInfo.actors" :key="index">
            <div class="actors-imgbox">
              <img :src="item.avatarAddress" alt="">
            </div>
            <span class="actors-name">{{item.name}}</span>
            <span class="actors-roles">{{item.role}}</span>
          </div>
        </detail-swiper>
      </div>
      <div class="photos">
        <div class="photos-title-bar">
          <span class="photos-title-text">剧照</span>
          <span class="photos-to-all" @click="imgShow=!imgShow">全部({{filmInfo.photos.length}})</span>
        </div>
        <detail-swiper :perslide="2" swiperclass="swiper-photos" style="height:1.5rem;padding-left:0.1rem;">
          <div class="swiper-slide" v-for="(item,index) in filmInfo.photos" :key="index">
            <div class="photos-imgbox">
              <img :src="item" alt="">
            </div>
          </div>
        </detail-swiper>
      </div>
      <div class="goSchedule">
        选座购票
      </div>
    </div>
    <div class="film" v-else>
      <div class="back" @click='imgShow=!imgShow'>
        <i class="iconfont icon-back"></i>
      </div>
      <detail-header class="film-photos">
        <h4>{{filmInfo.name}}</h4>
        <ul class="photos-list">
          <li class="photos-list-item" v-for="(item,index) in filmInfo.photos" :key='index'>
            <img :src="item" alt="">
          </li>
        </ul>
      </detail-header>
    </div>
  </div>
</template>

<script>
import http from '@/until/http'
import moment from 'moment'
import detailSwiper from './detail/DetailSwiper'
import detailHeader from './detail/DetailHeader'
export default {
  data () {
    return {
      filmInfo: null,
      isShow: true,
      imgShow: true
    }
  },
  components: {
    detailSwiper,
    detailHeader
  },
  directives: {
    top: {
      inserted: function (el) {
        window.onscroll = function () {
          el.style.display = 'none'
          if ((document.body.scrollTop || document.documentElement.scrollTop) > 44) {
            el.style.display = 'block'
          } else {
            el.style.display = 'none'
          }
        }
      },
      unbind: function () {
        window.onscroll = null
      }
    }
  },
  methods: {
    check () {
      this.isShow = !this.isShow
    },
    back () {
      this.$router.back()
    }
  },
  mounted () {
    // this.$route：当前匹配的路由信息
    // console.log('利用获取的id，ajax请求后端接口',this.$route.params.myid)
    // query传参进入详情页
    // console.log('利用获取的id，ajax请求后端接口',this.$route.query)
    http(`/api/gateway?filmId=${this.$route.params.myid}`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  },
  filters: {
    formatDate: (value) => {
      return moment(value * 1000).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
  .film{
    .back {
      width: .3rem;
      height: .3rem;
      background-color: #ccc;
      font-size: .18rem;
      line-height: .3rem;
      text-align: center;
      border-radius: 50%;
      position: fixed;
      top: .07rem;
      left: .07rem;
      opacity: .5;
      z-index: 12;
    }
    .film-header {
      position: fixed;
      top: 0;
      left: 0;
      right:0;
      height: .44rem;
      background-color: white;
      z-index: 10;
      text-align: center;
      line-height: .44rem;
      transition: all .3s;
      h4 {
        transition: all .3s;
      }
      &.hide {
        background-color: transparent;
        h4 {
          color: transparent;
        }
      }
    }
    .film-poster{
      height: 200px;
      overflow: hidden;
      position: relative;
      img{
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .film-detail{
      padding:0.1rem;
      padding-top:0.15rem;
      background: #fff;
      .col{
        display: flex;
        justify-content: space-between;
        .film-name{
          .name{
            color: #191a1b;
            font-size: 0.18rem;
            height: 0.24rem;
            line-height: 0.24rem;
            margin-right: 0.07rem;
          }
          .item{
            font-size: 0.09rem;
            color: #fff;
            background-color: #d2d6dc;
            height: 0.14rem;
            line-height: 14px;
            padding: 0 0.02rem;
            border-radius: 0.02rem;
            display: inline-block;
          }
        }
        .film-grade{
          text-align: right;
          color:#ffb232;
          .grade{
            font-size: 0.18rem;
            font-style: italic;
          }
          .grade-text{
            font-size: 0.1rem;
          }
        }
      }
      .grey-text{
        line-height: 0.20rem;
        font-size: 0.13rem;
        letter-spacing: 0.01rem;
        color: #797d82;
        margin-top: 0.04rem;
      }
      .film-synopsis{
        overflow: hidden;
        height: 1.8rem;
        transition: all .3s;
        &.hide{
          height: .38rem;
        }
      }
      .toggle{
        text-align: center;
      }
    }
    .actors{
      margin-top: 0.1rem;
      background-color: #fff;
      .actors-title-bar{
        width: 100%;
        padding: 0.15rem;
        .actors-title-text{
          display: inline-block;
          height: 0.225rem;
          line-height: 0.22rem;
          font-size: 0.16rem;
          text-align: left;
          color: #191a1b;
        }
      }
      .actors-imgbox{
        width: 100%;
        height: 0.85rem;
        overflow: hidden;
        position: relative;
        img{
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .actors-name{
        display: block;
        text-align: center;
        padding-top: 0.10rem;
        font-size: 0.12rem;
        color: #191a1b;
        width: 0.85rem;
        height: 0.18rem;
        display: block;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .actors-roles{
        display: block;
        text-align: center;
        font-size: 0.10rem;
        color: #797d82;
      }
    }
    .photos{
      margin-top: 0.10rem;
      margin-bottom: 0.60rem;
      background-color: #fff;
      .photos-title-bar{
        height: 0.62rem;
        padding: 0.15rem;
        display: flex;
        justify-content: space-between;
        span{
          display: inline-block;
          height: 0.225rem;
          line-height: 0.22rem;
        }
        .photos-title-text{
          font-size:0.16rem;
          color: #191a1b;
        }
        .photos-to-all{
          font-size: 0.13rem;
          color: #797d82;
        }
      }
      .photos-imgbox{
        width: 100%;
        height: 1.20rem;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
    }
    .goSchedule {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 49px;
      width: 100%;
      text-align: center;
      background-color: #ff5f16;
      color: #fff;
      font-size: 16px;
      line-height: 49px;
    }
    .film-photos {
      position: fixed;
      top: 0;
      left: 0;
      right:0;
      height: .44rem;
      background-color: white;
      z-index: 10;
      text-align: center;
      line-height: .44rem;
      transition: all .3s;
      h4 {
        transition: all .3s;
      }
      &.hide {
        background-color: transparent;
        h4 {
          color: transparent;
        }
      }
    }
    .photos-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &::after {
        content: "";
        display: block;
        width: 1.24rem;
        height: 1.24rem;
      }
      .photos-list-item {
        width: 1.24rem;
        height: 1.24rem;
        padding-bottom: .02rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
