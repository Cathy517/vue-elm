import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('../page/home/index.vue');
const city = () => import('../page/city/index.vue');
const msite = () => import('../page/msite/index.vue');
const food = () => import('../page/food/index.vue');
const shop = () => import('../page/shop/index.vue');
const foodDetail = () => import('../page/shop/children/foodDetail.vue');
const shopDetail = () => import('../page/shop/children/shopDetail.vue');
const shopSafe = () => import('../page/shop/children/children/shopSafe.vue');

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
      path: '/msite',
      component: msite
    },
    // 特色商铺列表页
    {
      path: '/food',
      component: food
    },
    // 商铺详情页
    {
      path: '/shop',
      component: shop,
      children: [
        {
          path: 'foodDetail',//食品详情页
          component: foodDetail,
        },
        {
          path: 'shopDetail',//商铺详情页
          component: shopDetail,
          children:[{
            path:'shopSafe',//商铺安全认证页
            component:shopSafe,
          }]
        }]
    }
  ]
})
