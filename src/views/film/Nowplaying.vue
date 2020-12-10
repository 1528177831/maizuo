<template>
  <div class="content" style="background:#fff;">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是底线的"
      @load="onLoad"
      :immediate-check = "false"
    >
      <van-cell v-for="item in list" :key="item.filmId" @click="handleClick(item.filmId)">
        <div class='left-img'><img :src="item.poster"></div>
        <div class='right-content'>
          <h4>{{item.name}}</h4>
          <div>
            <div class='grade' >{{item.grade ? '观众评分：' + item.grade : ""}}</div>
            <div class='actors'>
              <span>主演: </span>
              <span>{{item.actors | actorsFilter}}</span>
            </div>
            <div class='info'>
              <span>{{item.nation}}</span> | <span>{{item.runtime}}分钟</span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import http from '@/until/http'
import Vue from 'vue'
import { List, cell } from 'vant'
import { mapState } from 'vuex'

Vue.use(List).use(cell)
export default {
  data () {
    return {
      list: [],
      loading: false, // 是否正在加载中，防止多次触发
      finished: false,
      current: 1, // 记录第几页
      total: 0 // 总数据长度
    }
  },
  computed: {
    ...mapState('CityModule', ['cityId'])
  },
  mounted () {
    http(`/api/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1`, {
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res);
      this.list = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    handleClick (id) {
      // 编程式导航
      // this.$router:所有的路由信息
      // 1、动态路由
      this.$router.push(`/detail/${id}`)
      // 2、命名式路由
      // this.$router.push({
      //   name:'showDetail',
      //   params:{
      //     myid:id
      //   }
      // })
      // 3、query传参跳转详情页
      // this.$router.push(`/detail?id=${id}`)
    },
    onLoad () {
      if (this.list.length === this.total && this.list.length !== 0) {
        this.finished = true
        return
      }
      this.current++
      http(`/api/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1`, {
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.list = [...this.list, ...res.data.data.films]
        this.loading = false
      })
    }
  },
  filters: {
    actorsFilter: (value) => {
      if (value === undefined) return '暂无主演'
      return value.map(item => item.name).join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-cell {
    padding: 0.1rem;
    display: flex;
    .van-cell__value{
      display: flex;
      flex-direction: row;
      .left-img {
        width: 0.6rem;
        img {
          width: 100%;
        }
      }
      .right-content {
        padding-left: 0.1rem;
        h4 {
          font-size: 0.18rem;
        }
        div {
          font: 0.12rem/1.5 微软雅黑;
          color: #797d82;
          .grade {
            height: 0.18rem;
          }
          .actors {
            width: 2.0rem;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
