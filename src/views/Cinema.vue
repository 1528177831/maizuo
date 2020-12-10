<template>
  <div>
    <van-nav-bar title="影院" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
          <span>{{cityName}}</span>
          <van-icon name="arrow-down" size="18" color="#000" />
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#000"/>
      </template>
    </van-nav-bar>
    <div class='operate'>
      <van-dropdown-menu>
        <van-dropdown-item v-model="district" :options="districtList" @change="ondistrictChange(value)" />
      </van-dropdown-menu>
      <van-dropdown-menu>
        <van-dropdown-item v-model="convert" :options="convertList" />
      </van-dropdown-menu>
      <van-dropdown-menu>
        <van-dropdown-item v-model="distance" :options="distanceList" />
      </van-dropdown-menu>
    </div>
    <div class="cinema-list-wrap" :style="`height:${height}`">
      <ul class="cinema-list">
        <li class="cinema-list-item" v-for="(data,index) in cinemaListGetByDistrictName" :key="index">
          <div class="cinema-item-wrap">
            <div class="cinema-info-lf cinema-info">
              <span class="cinema-name">{{data.name}}</span>
              <span class="cinema-address">{{data.address}}</span>
            </div>
            <div class="cinema-info-rt cinema-info">
              <div>
                <span class="cinema-lowPrice price-fmt">￥{{data.lowPrice/100}}</span>
                <span class="upon"> 起</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BetterScroll from 'better-scroll'
import { Icon, NavBar, DropdownMenu, DropdownItem } from 'vant'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
Vue.use(Icon).use(NavBar).use(DropdownMenu).use(DropdownItem)
export default {
  data () {
    return {
      height: 0,
      scroll: null
    }
  },
  methods: {
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    ...mapActions('CinemaModule', ['getCinemaList']),
    onClickLeft () {
      this.clearCinemaList()
      this.$router.push('/city')
    },
    onClickRight () {
      this.$router.push('/cinema/search')
    },
    ondistrictChange (value) {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  computed: {
    ...mapState('CityModule', ['cityId', 'cityName']),
    ...mapState('CinemaModule', ['cinemaList', 'districtList', 'convertList', 'distanceList']),
    ...mapGetters('CinemaModule', ['cinemaListGetByDistrictName']),
    district: {
      get () {
        return this.$store.state.CinemaModule.district
      },
      set (value) {
        this.$store.state.CinemaModule.district = value
      }
    },
    convert: {
      get () {
        return this.$store.state.CinemaModule.convert
      },
      set (value) {
        this.$store.state.CinemaModule.convert = value
      }
    },
    distance: {
      get () {
        return this.$store.state.CinemaModule.distance
      },
      set (value) {
        this.$store.state.CinemaModule.distance = value
      }
    }
  },
  mounted () {
    // 访问cityid，cityName
    this.height = document.documentElement.clientHeight - 148 + 'px'
    if (this.cinemaList.length === 0) {
      // vuex 异步流程
      this.getCinemaList(this.cityId).then(res => {
        // 状态立即更新，但是dom异步渲染
        this.$nextTick(() => {
          this.scroll = new BetterScroll('.cinema-list-wrap', {
            scrollbar: {
              fade: true
            },
            click: true, // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
            probeType: 2, // 这个属性设置之后可以监听得到了
            mouseWheel: true
          })
        })
      })
    } else {
      // 走缓存的时候
      // 状态立即更新，但是dom异步渲染
      this.$nextTick(() => {
        this.scroll = new BetterScroll('.cinema-list-wrap', {
          scrollbar: {
            fade: true
          },
          click: true, // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
          probeType: 2, // 这个属性设置之后可以监听得到了
          mouseWheel: true
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .cinema-list-wrap{
    overflow: hidden;
    position: relative; // 修正滚动条的位置
    .cinema-list{
      list-style: none;
      padding: 0;
      margin: 0;
      .cinema-list-item{
        position: relative;
        background-color: #fff;
        padding: 0.15rem;
        .cinema-item-wrap{
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: start;
          -ms-flex-pack: start;
          justify-content: flex-start;
          -webkit-box-align: center;
          .cinema-info-lf {
            width: calc(100% - 0.65rem);
            text-align: left;
            padding-right: 0.15rem;
            float: left;
            span{
              display: block;
              max-width: 80%;
              overflow: hidden;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .cinema-name{
              color: #191a1b;
              font-size: 0.15rem;
            }
            .cinema-address{
              color: #797d82;
              font-size: 0.12rem;
              margin-top: 0.05rem;
            }
          }
          .cinema-info-rt {
            width: 0.7rem;
            text-align: center;
            float: right;
            margin-right: -0.05rem;
            .price-fmt{
              font-size: 0.15rem;
              color: #ff5f16;
              height: 0!important;
              display: inline-table!important;
            }
            .upon{
              color: #ff5f16;
              font-size: 0.1rem;
            }
          }
        }
      }
    }
  }
  .operate {
    display: flex;
    .van-dropdown-menu {
      flex: 1;
    }
  }
</style>
