import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 注册模块，已经创建全局组件router-view

const routes = [
  {
    // 实现路由懒加载
    path: '/film',
    component: () => import('../views/Film.vue'),
    // 嵌套路由
    children: [
      {
        path: '/film/nowplaying',
        component: () => import('../views/film/Nowplaying.vue')
      },
      {
        path: '/film/comingsoon',
        component: () => import('../views/film/Comingsoon.vue')
      },
      {
        path: '',
        component: () => import('../views/film/Nowplaying.vue')
      }
    ]
  },
  {
    path: '/cinema',
    component: () => import('../views/Cinema.vue')
  },
  {
    path: '/center',
    component: () => import('../views/Center.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/detail/:myid', // 动态路由,':'：占位符
    component: () => import('../views/Detail.vue'),
    name: 'showDetail' // 命名式路由
  },
  // {
  //   path: '/detail',
  //   component: Detail
  // },
  {
    path: '*', // 通配符：优先级最低
    redirect: '/film/nowplaying'
  }
]

const router = new VueRouter({
  // mode: 'history',// 路由模式：hash模式和history模式
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const auth = ['/center']
  if (auth.includes(to.fullPath)) {
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
