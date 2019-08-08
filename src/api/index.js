import axios from '../config/services';

/**
 * 获取首页默认城市
 */
export function getCityGuess() {
  return axios({
    method: 'get',
    url: `/api/v1/cities`,
    params: {
      type: 'guess'
    }
  })
}

/**
 * 获取首页热门城市
 */
export function getHotcity() {
  return axios({
    method: 'get',
    url: `/api/v1/cities`,
    params: {
      type: 'hot'
    }
  })
}

/**
 * 获取首页所有城市
 */
export function getGroupcity() {
  return axios({
    method: 'get',
    url: `/api/v1/cities`,
    params: {
      type: 'group'
    }
  })
}

/**
 * 获取当前所在城市
 */
export function getCurrentcity(number) {
  return axios({
    method: 'get',
    url: `/api/v1/cities/${number}`,
  })
}

/**
 * 获取搜索地址
 */
export function getSearchplace(city_id, keyword) {
  return axios({
    method: 'get',
    url: `/api/v1/pois`,
    params: {
      city_id: city_id,
      keyword: keyword,
      type: 'search'
    }
  })
}

/**
 * 获取msite页面 地址信息
 */
export function getMsiteAddress(geohash) {
  return axios({
    method: 'get',
    url: `/api/v2/pois/${geohash}`
  })
}

/**
 * 获取msite页面 食品分类列表
 */
export function getMsiteFoodTypes(geohash) {
  return axios({
    method: 'get',
    url: `/api/v2/index_entry`,
    params: {
      geohash: geohash,
      group_type: '1',
      'flags[]': 'F'
    }
  })
}

/**
 * 获取msite商铺列表
 */
export function getShopList(latitude, longitude, offset, restaurant_category_id = '', order_by = '', delivery_mode = [], support_ids = [], restaurant_category_ids = '' ) {
  return axios({
    method: 'get',
    url: `/api/shopping/restaurants`,
    params: {
      latitude,
      longitude,
      offset,
      limit: '20',
      restaurant_category_id,
      order_by,
      delivery_mode,
      support_ids,
      restaurant_category_ids
    }
  })
}



//获取shop页面商铺详情
export function getShopDetails(shopid){
  return axios({
    method:'get',
    url:`/api/shopping/restaurant/${shopid}`,
  })
}

//获取shop页面菜单列表
export function getFoodMenu(restaurant_id){
  return axios({
    method:'get',
    url:`/api/shopping/v2/menu`,
    params:{
      restaurant_id
    }
  })
}

// 获取商铺评价列表
export function getRatingList(restaurant_id,tag_name,offset,limit){
  return axios({
    method:'get',
    url:`/api/ugc/v2/restaurants/${restaurant_id}/ratings`,
    params:{
      tag_name,
      offset,
      limit:10
    }
  })
}

// 获取商铺评价分数
export function getRatingScores(restaurant_id){
  return axios({
    method:'get',
    url:`/api/ugc/v2/restaurants/${restaurant_id}/ratings/scores`,
  })
}

// 获取商铺评价分类
export function getRatingTags(restaurant_id){
  return axios({
    method:'get',
    url:`/api/ugc/v2/restaurants/${restaurant_id}/ratings/tags`,
  })
}




// 获取短信验证码
export function getMobileCode(phone){
  return axios({
    method:'POST',
    url:`/api/v4/mobile/verify_code/send`,
    data:{
      mobile:phone,
      scene:'login',
      type:'sms'
    }
  })
}

// 获取图片验证码
export function getCaptchas(){
  return axios({
    method:'POST',
    url:`/api/v1/captchas`
  })
}

// 检测账号是否存在
export function checkExsis(checkNumber,type){
  return axios({
    method:'get',
    
  })
}

// 发送账号
export function sendMobile(sendData,captcha_code,type,password){
  return axios({
    method:'POST',
    url:`/api/v1/mobile/verify_code/send`,
    data:{
      action:'send',
      captcha_code,
      [type]:sendData,
      type:'sms',
      way:type,
      password
    }
  })
}