<template>
  <div class="msite_wrap">
    <head-top signin-up="msite">
      <router-link to="/search/geohash" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>

    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide food_types_container"
            v-for="(item,index) in foodTypes"
            :key="index"
          >
            <router-link to="/food" class="link_to_food" v-for="(foodItem,idx) in item" :key="idx">
              <figure>
                <img :src="imgBaseUrl+foodItem.image_url" alt />
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>

    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop" />
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import toast from "../../components/toast";
import Swiper from "swiper";
import {
  getCityGuess,
  getMsiteAddress,
  getMsiteFoodTypes
} from "../../api/index";
import headTop from "../../components/header/index";
import shopList from "../../components/common/shoplist";
import footGuide from '../../components/footer/footGuide'
export default {
  data() {
    return {
      geohash: "", //cit页面传递来的地址geohash
      msiteTitle: "请选择地址...", //msite页面头部标题
      foodTypes: [], //食品分类列表
      hasGetData: false, //是否已经获取地理位置数据，成功后再获取商铺列表信息
      imgBaseUrl: "https://fuss10.elemecdn.com" //图片域名地址
    };
  },

  components: {
    headTop,
    shopList,
    footGuide
  },

  computed: {},

  created() {},
  async beforeMount() {
    if (!this.$route.query.geohash) {
      const address = await getCityGuess();
      console.log(address);
      this.geohash = address.latitude + "," + address.longitude;
    } else {
      this.geohash = this.$route.query.geohash;
    }
    this.SAVE_GEOHASH(this.geohash); //保存geohash到vuex

    let msiteInfo = await getMsiteAddress(this.geohash); //获取位置信息
    console.log(msiteInfo);
    this.msiteTitle = msiteInfo.name;
    this.RECORD_ADDRESS(msiteInfo); //记录当前经纬度

    this.hasGetData = true;
  },
  mounted() {
    this.fetchFoodTypes();
  },

  methods: {
    ...mapMutations(["SAVE_GEOHASH", "RECORD_ADDRESS"]),
    //获取导航食品类型列表
    fetchFoodTypes() {
      getMsiteFoodTypes(this.geohash)
        .then(res => {
          console.log(res);
          let resArr = [...res];
          let foodArr = [];
          for (let i = 0, j = 0; i < res.length; i += 8, j++) {
            foodArr[j] = resArr.splice(0, 8);
          }
          this.foodTypes = foodArr;
          this.$nextTick(() => {
            const mySwiper = new Swiper(".swiper-container", {
              pagination: {
                el: ".swiper-pagination"
              }
            });
          });
        })
        .catch(err => {});
    },

    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id;
      } else {
        return "";
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../style/mixin";

.swiper-container {
  @include wh(100%, auto);
  padding-bottom: 28px;
}
.swiper-pagination {
  bottom: 9px;
  position: absolute;
  width: 100vw;
  text-align: center;
  bottom: 30px;
}
</style>

<style lang='scss' scoped>
@import "../../style/mixin";
@import "~../../../node_modules/swiper/dist/css/swiper.min.css";
.msite_wrap {
  .link_search {
    left: 37.5px;
    @include wh(42px, 42px);
    @include ct;
  }
  .msite_title {
    @include center;
    width: 50%;
    color: #ffffff;
    text-align: center;
    margin-left: -23px;
    .title_text {
      @include sc(38px, #fff);
      text-align: center;
      display: block;
    }
  }
  .msite_nav {
    padding-top: 98px;
    background-color: #fff;
    border-bottom: 2px solid $bc;
    height: 496px;

    .food_types_container {
      display: flex;
      flex-wrap: wrap;
      .link_to_food {
        width: 25%;
        padding: 14px 0;
        @include fj(center);
        figure {
          img {
            margin-bottom: 14px;
            @include wh(84px, 84px);
          }
          figcaption {
            text-align: center;
            @include sc(26px, #666);
          }
        }
      }
    }
  }
  .shop_list_container {
    margin-top: 18px;
    border-top: 1px solid $bc; /*no*/
    background-color: #fff;
    .shop_header {
      .shop_icon {
        fill: #999;
        margin-left: 28px;
        vertical-align: middle;
        @include wh(28px, 28px);
      }
      .shop_header_title {
        color: #999;
        vertical-align: middle;
        @include font(26px, 75px);
      }
    }
  }
}
</style>