<template>
  <div>
    <div class="web-login">
      <div class="logo">
        <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" alt="">
      </div>
      <div class="login-form">
        <div class="form-group">
          <input type="text" v-model="username" placeholder="用户名">
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="login-btn" @click="send">
          <span>登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations('TabbarModule', ['hideTabber', 'showTabber']),
    send () {
      // 发送异步请求
      axios({
        method: 'post',
        url: 'http://10.30.10.217:3000/api/user/signin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        },
        // 通过 transformRequest来进行配置数据 这个函数的作用是在发送请求之前 处理数据
        transformRequest: [(data) => {
          return this.$qs.stringify((data))
        }],
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then((res) => {
          if (res.data.msg.token) {
            // 将本地存储中 存储token数据
            localStorage.setItem('token', res.data.msg.token)
            // 当请求成功的时候 我们要跳转路由到/center这个页面
            this.$router.push('/center')
          }
        })
    }
  },
  mounted () {
    // this.$store.commit('hideTabber')
    this.hideTabber()
  },
  beforeDestroy () {
    // this.$store.commit('showTabber')
    this.showTabber()
  }
}
</script>

<style lang="scss" scoped>
  .web-login{
    .logo{
      margin: 0.8rem auto 0.4rem;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      img{
        height: 60px;
      }
    }
    .login-form {
      width: 100%;
      position: relative;
      .form-group{
        line-height: 55px;
        margin: 0 25px;
        position: relative;
        input{
          height: 15px;
          line-height: 15px;
          padding: 20px 0;
          width: 100%;
          font-size: 15px;
          color: #191a1b;
          border: 0;
          outline-width: 0;
        }
      }
      .login-btn{
        margin-top: 70px;
        line-height: 45px;
        font-size: 16px;
        margin: 70px 25px 0;
        border-radius: 3px;
        text-align: center;
        background-color: #ff5f16;
        height: 44px;
        color: #fff;
        border: none;
        span{
          opacity: .3;
        }
      }
    }
  }
</style>
