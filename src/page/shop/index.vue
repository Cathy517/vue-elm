<template>
  <div>
    <section v-if="!showLoading" class="shop_container">
      <nav class="goback">
        <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline
            points="12,18 4,9 12,0"
            style="fill:none;stroke:rgb(255,255,255);stroke-width:3"
          />
        </svg>
      </nav>
      <header class="shop_detail_header" ref="shopheader">
        <img :src="imgBaseUrl+shopDetailData.image_path" class="header_cover_img" alt />
        <section class="description_header">
          <router-link to="shop/shopDeatil" class="description_top">
            <section class="description_left">
              <img :src="imgBaseUrl+shopDetailData.image_path" alt />
            </section>
            <section class="description_right">
              <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
              <p
                class="description_text"
              >商家配送/{{shopDetailData.order_lead_time}}分钟送达/配送费￥{{shopDetailData.float_delivery_fee}}</p>
              <p class="description_promotion ellipsis">公告：{{shopDetailData.promotion_info}}</p>
            </section>
            <svg
              width="14"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="description_arrow"
            >
              <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none" />
            </svg>
          </router-link>
        </section>
      </header>

      

    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import toast from "../../components/toast";
import {
  getMsiteAddress,
  getShopDetails,
  getFoodMenu,
  getRatingList,
  getRatingScores,
  getRatingTags
} from "../../api/index";
import { imgBaseUrl } from "../../config/env";
export default {
  data() {
    return {
      imgBaseUrl,
      geohash: this.$route.query.geohash || "", //geohash
      shopId: this.$route.query.id || null, //商店id
      showLoading: true, //显示加载动画
      changeShowType: "food", //切换显示商品或评价
      shopDetailData: null, //商铺详情
      showActivities: false, //是否显示活动详情
      menuList: [], //食品列表
      menuIndex: 0, //已选菜单索引值，默认为0
      menuIndexChange: true //解决选中index时，scroll监听事件重复判断设置index的bug
    };
  },

  components: {},

  computed: {},

  created() {},

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.shopDetailData = await getShopDetails(this.shopId);
      this.hideLoading();
    },

    //隐藏动画
    hideLoading() {
      this.showLoading = false;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../style/mixin";
.shop_container {
  height: 100%;
  .goback {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 94px;
    z-index: 11;
    padding-top: 12px;
    padding-left: 12px;
  }
  .shop_detail_header {
    overflow: hidden;
    position: relative;
    .header_cover_img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      filter: blur(10px);
    }
    .description_header {
      position: relative;
      z-index: 10;
      background-color: rgba(119, 103, 137, 0.43);
      padding: 20px 0 20px 20px;
      width: 100%;
      overflow: hidden;
      .description_top {
        display: flex;
        .description_left {
          margin-right: 14px;
          img {
            @include wh(136px, 136px);
            display: block;
            border-radius: 8px;
          }
        }
        .description_right {
          flex: 1;
          .description_title {
            @include sc(37.5px, #fff);
            font-weight: bold;
            width: 100%;
            margin-bottom: 14px;
          }
          .description_text {
            @include sc(24px, #fff);
            margin-bottom: 14px;
          }
          .description_promotion {
            @include sc(24px, #fff);
            width: 540px;
          }
        }
        .description_arrow {
          @include ct;
          right: 14px;
          z-index: 11;
        }
      }
    }
  }
}
</style>