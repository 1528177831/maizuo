<template>
  <div class="content" style="background:#fff;">
    <ul>
      <li v-for="item in list" :key="item.filmId" @click="handleClick(item.filmId)">
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
      </li>
    </ul>
  </div>
</template>

<script>
import http from '@/until/http'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    http('/api/gateway?cityId=310100&pageNum=1&pageSize=10&type=2', {
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res);
      this.list = res.data.data.films
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
  li {
    padding: 0.1rem;
    height: 0.94rem;
    display: flex;
    .left-img {
      height: 100%;
      img {
        height: 100%;
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
          width: 0.2rem;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
