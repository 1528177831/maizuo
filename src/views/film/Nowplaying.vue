<template>
  <div class="content">
    <ul>
      <li v-for="item in list" :key="item.filmId" @click="handleClick(item.filmId)">
        <div class='left-img'><img :src="item.poster"></div>
        <div class='right-content'>
          <h4>{{item.name}}</h4>
          <div>
            <div class='grade' >{{item.grade ? '观众评分：' + item.grade : ""}}</div>
            <div class='actors'>
              <span>主演: </span>
              <span v-for='(val, index) in item.actors' :key='index'>{{val.name}}</span>
            </div>
            <div class='info'>
              <span>{{item.nation}}</span>
              <span>{{item.runtime}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    axios.get('/api/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=8886527', {
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606890049759706700218369"}',
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
  }
}
</script>

<style lang="scss" scoped>
.content{
  padding-bottom: 50px;
  li {
    padding: 10px 15px;
    height: 94px;
    display: flex;
    .left-img {
      height: 100%;
      img {
        height: 100%;
      }
    }
    .right-content {
      padding-left: 10px;
      h4 {
        font-size: 18px;
      }
      div {
        font: 12px/1.5 微软雅黑;
        color: #797d82;
        .grade {
          height: 18px;
        }
        .actors {
          width: 200px;
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
