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
 * 获取商铺列表
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