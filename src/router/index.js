import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/TabBar/Index.vue'),
        redirect: '/home/index/recommand',
        children: [
          {
            path: 'recommand',
            component: () => import('@/views/TabBar/Index/Recommand.vue'),
          },
          {
            path: 'phone',
            component: () => import('@/views/TabBar/Index/Phone.vue')
          },
          {
            path: 'ai',
            component: () => import('@/views/TabBar/Index/Ai.vue')
          },
          {
            path: 'tv',
            component: () => import('@/views/TabBar/Index/Tv.vue')
          },
          {
            path: 'book',
            component: () => import('@/views/TabBar/Index/Book.vue')
          },
          {
            path: 'appliance',
            component: () => import('@/views/TabBar/Index/Appliance.vue')
          },
          {
            path: 'around',
            component: () => import('@/views/TabBar/Index/Around.vue')
          },
        ]
      },
      {
        path: 'category',
        component: () => import('@/views/TabBar/Category.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/TabBar/Cart.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/TabBar/Profile.vue')
      },
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/User.vue'),
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        component: () => import ('@/views/User/Login.vue')
      },
      {
        path: 'register',
        component: () => import ('@/views/User/Register.vue')
      }
    ]
  },
  {
    path:'/test',
    component: () => import ('@/views/Test.vue')
  },
  {
    path: '/detail/:id',
    component: () => import ('@/views/Detail.vue')
  },
  {
    path: '/search',
    component: () => import ('@/views/Search.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
