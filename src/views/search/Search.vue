<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    />
    <div class="cinema-list-wrap" :style="`height:${height}`">
      <ul class="cinema-list">
        <li class="cinema-list-item" v-for="(data,index) in computedCinemaList" :key="index">
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
import { Search, Toast } from 'vant'
import { mapMutations, mapState } from 'vuex'

Vue.use(Search).use(Toast)
export default {
  data () {
    return {
      value: '',
      height: 0,
      scroll: null
    }
  },
  methods: {
    ...mapMutations('TabbarModule', ['hideTabber', 'showTabber']),
    onSearch (val) {
      Toast(val)
    },
    onCancel () {
      // 替换当前记录
      this.$router.replace('/cinema')
    },
    onInput () {
      this.$nextTick(() => {
        /* 检测到数据变化时，此时如果不使用$nextTick方法，refresh方法会在DOM更新前直接调用 */
        this.scroll.refresh()
      })
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('CityModule', ['cityId']),
    computedCinemaList () {
      if (this.value === '') return []
      return this.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  mounted () {
    this.hideTabber()
    this.height = document.documentElement.clientHeight - 55 + 'px'
    if (this.cinemaList.length === 0) {
      // vuex 异步流程
      this.$store.dispatch('getCinemaList', this.cityId).then(res => {
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
  },
  beforeDestroy () {
    this.showTabber()
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
</style>
