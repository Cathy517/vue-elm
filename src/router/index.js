import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('../page/home/index.vue');
const city = () => import('../page/city/index.vue');
const msite = () => import('../page/msite/index.vue');

Vue.use(Router)
export default new Router({
  routes: [
    //地址为空时跳转home页面
    {
      path: '/',
      component: home
    },
    //首页城市列表页
    {
      path: '/home',
      name: 'home',
      component: home
    },
    // 当前选择城市页
    {
      path: '/city/:cityid',
      name: 'city',
      component: city
    },
    // 所有商铺列表页
    {
      path:'/msite',
      component:msite
    }
  ]
})
