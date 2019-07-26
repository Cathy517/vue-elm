<template>
  <div class="shoplist_container">
    <ul v-if="shopListArr.length" v-load-more="loaderMore" type="1">
      <router-link :to="{path:'shop',query:{geohash,id:item.id}}" tag="li" class="shop_li" v-for="(item,index) in shopListArr" :key="index">
        <section>
          <img :src="imgBaseUrl+item.image_path" class="shop_img" />
        </section>
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <h4 class="shop_title ellipsis" :class="item.is_premium?'premium':''">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li class="supports" v-for="i in item.supports" :key="i.id">{{i.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <div class="rating_section">
                <rating-star :rating="item.rating"></rating-star>
                <span class="rating_num">{{item.rating}}</span>
              </div>
              <div class="order_section">月售{{item.recent_order_num}}单</div>
            </section>
            <section class="rating_order_num_right">
              <span class="delivery_style delivery_left">蜂鸟专送</span>
              <span class="delivery_style delivery_right">准必达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <p class="fee">
              ￥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </p>
            <p class="distance_time">
              <span>{{item.distance}}</span>
              <span class="segmentation">/</span>
              <span class="order_time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <ul v-else class="animation_opactiy">
      <li class="list_back_li" v-for="item in 10" :key="item">
        <img src="../../images/shopback.svg" class="list_back_svg" alt />
      </li>
    </ul>
    <p v-if="touchend" class="enpty_data">没有更多了</p>
    <aside class="return_top" @click="backTop" v-if="showBackStatus">
      <svg class="back_top_svg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop" />
      </svg>
    </aside>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { imgBaseUrl } from "../../config/env";
import toast from "../../components/toast";
import ratingStar from "./ratingStar";
import loading from "./loading";
import { getShopList } from "../../api/index";
import { showBack, animate } from "../../config/mUtils";
import { loadMore, getImgPath } from "./mixin";
export default {
  data() {
    return {
      offset: 0, //批次加载店铺列表，每次加载20个，limit=20
      shopListArr: [], //店铺列表数据
      preventRepeatRequest: false, //到达底部加载数据，防止重复加载
      showBackStatus: false, //显示返回顶部按钮
      showLoading: true, //显示加载动画
      touchend: false, //没有更多数据
      imgBaseUrl
    };
  },
  props: ["geohash", "restaurantCategoryId"],
  mixins:[loadMore,getImgPath],
  components: { ratingStar, loading },

  computed: {
    ...mapState(["latitude", "longitude"])
  },

  created() {},

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      let res = await getShopList(
        this.latitude,
        this.longitude,
        this.offset,
        this.restaurantCategoryId
      );
      this.shopListArr = [...res];
      if (res.length < 20) {
        this.touchend = true;
      }
      this.hideLoading();
      //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
      showBack(status => {
        this.showBackStatus = status;
      });
    },

    hideLoading() {
      this.showLoading = false;
    },

    backTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    // 到达底部加载更多数据
    async loaderMore() {
      if (this.touchend) {
        return;
      }
      //防止重复请求
      if (this.preventRepeatRequest) {
        return;
      }
      this.showLoading = true;
      this.preventRepeatRequest = true;

      // 数据的定位加20位
      this.offset += 20;
      let res = await getShopList(
        this.latitude,
        this.longitude,
        this.offset,
        this.restaurantCategoryId
      );
      this.hideLoading();
      this.shopListArr = [...this.shopListArr, ...res];
      //当数据小于20，说明没有更多数据，不需要再次请求数据
      if (res.length < 20) {
        this.touchend = true;
        return;
      }
      this.preventRepeatRequest = false;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../style/mixin";
.shoplist_container {
  background-color: #ffffff;
  margin-bottom: 94px;
  overflow: hidden;
  ul {
    .shop_li {
      display: flex;
      border-bottom: 1px solid $bc; /*no*/
      padding: 32px 18px;
      .shop_img {
        @include wh(127px, 127px);
        display: inline-block;
        flex-shrink: 0;
        margin-right: 18px;
      }
      .shop_right {
        flex: 1;
        .shop_detail_header {
          @include fj;
          align-items: center;
          .shop_title {
            width: 400px;
            color: #333;
            @include font(30px, 30px);
            font-weight: 700;
          }
          .premium::before {
            content: "品牌";
            display: inline-block;
            font-size: 24px;
            line-height: 28px;
            color: #333;
            background: #ffd930;
            padding: 0 5px;
            border-radius: 5px;
            margin-right: 8px;
          }
          .shop_detail_ul {
            display: flex;
            transform: scale(0.8);
            margin-right: -14px;
            .supports {
              @include sc(23px, #999);
              border: 1px solid #f1f1f1; /*no*/
              padding: 0 3px;
              border-radius: 8px;
              margin-left: 2px;
            }
          }
        }
        .rating_order_num {
          @include fj;
          height: 28px;
          margin-top: 24px;
          .rating_order_num_left {
            @include fj(flex-start);
            .rating_section {
              .rating_num {
                @include sc(18px, #ff6000);
                margin: 0 10px;
              }
            }
            .order_section {
              transform: scale(0.8);
              margin-left: -10px;
              @include sc(18px, #666);
            }
          }
          .rating_order_num_right {
            display: flex;
            align-items: center;
            transform: scale(0.7);
            min-width: 235px;
            justify-content: flex-end;
            margin-right: -37.5px;
            .delivery_style {
              font-size: 18px;
              padding: 2px 4px 0;
              margin-left: 4px;
            }
            .delivery_left {
              color: #fff;
              background-color: $blue;
              border: 1px solid $blue; /*no*/
            }
            .delivery_right {
              color: $blue;
              border: 1px solid $blue; /*no*/
            }
          }
        }
        .fee_distance {
          @include fj;
          @include sc(23px, #333);
          margin-top: 24px;
          .fee {
            transform: scale(0.9);
            @include sc(24px, #666);
          }
          .distance_time {
            transform: scale(0.9);
            span {
              color: #999;
            }
            .order_time {
              color: $blue;
            }
            .segmentation {
              color: #ccc;
            }
          }
        }
      }
    }
    .list_back_li {
      height: 210px;
      .list_back_svg {
        @include wh(100%, 100%);
      }
    }
  }
  .enpty_data {
    @include sc(23px, #666);
    text-align: center;
    line-height: 94px;
  }
  .return_top {
    position: fixed;
    bottom: 140px;
    right: 47px;
    .back_top_svg {
      @include wh(94px, 94px);
    }
  }
}
</style>