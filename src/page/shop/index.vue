<template>
  <div class="shop_wrap">
    <section v-if="!showLoading" class="shop_container">
      <nav class="goback">
        <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline
            points="12,18 4,9 12,0"
            style="fill:none;stroke:rgb(255,255,255);stroke-width:3"
          />
        </svg>
      </nav>
      <!-- 商家顶部信息 -->
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
      <!-- 活动详情蒙层 -->
      <transition name="fade">
        <section class="activities_details" v-if="showActivities">
          <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
          <h3 class="activities_ratingstar">
            <rating-star :rating="shopDetailData.rating"></rating-star>
          </h3>
          <section class="activities_list">
            <header class="activities_title_style">
              <span>优惠信息</span>
            </header>
            <ul>
              <li v-for="item in shopDetailData.activities" :key="item.id">
                <span
                  class="activities_icon"
                  :style="{backgroundColor:'#'+item.icon_color}"
                >{{item.icon_name}}</span>
                <span>{{item.description}}(App专享)</span>
              </li>
            </ul>
          </section>
          <section class="activities_shopinfo">
            <header class="activities_title_style">
              <span>商家公告</span>
            </header>
            <p>{{promotionInfo}}</p>
          </section>
          <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
            <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
            <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
            <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
          </svg>
        </section>
      </transition>
      <!-- tab切换 -->
      <section class="change_show_type" ref="chooseType">
        <div>
          <span :class="{activity_show:changeShowType=='food'}">商品</span>
        </div>
        <div>
          <span :class="{activity_show:changeShowType=='rating'}">评价</span>
        </div>
      </section>
      <!-- 商品 -->
      <transition name="fade-choose">
        <section class="food_container" v-show="changeShowType=='food'">
          <!-- 菜单 -->
          <section class="menu_container">
            <!-- 菜单左侧 -->
            <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
              <ul>
                <li v-for="(item,index) in menuList" :key="index" class="menu_left_li">
                  <img :src="getImgPath(item.icon_url)" alt />
                  <span>{{item.name}}</span>
                  <span class="category_num">1</span>
                </li>
              </ul>
            </section>
            <!-- 菜单右侧 -->
            <section class="menu_right" ref="menuFoodList">
              <ul>
                <li v-for="(item,index) in menuList" :key="index">
                  <header class="menu_detail_header">
                    <section class="menu_detail_header_left">
                      <strong class="menu_item_title">{{item.name}}</strong>
                      <span class="menu_item_description">{{item.description}}</span>
                    </section>
                    <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                    <p class="description_tip" v-if="index==titleDetailIndex">
                      <span>{{item.name}}</span>
                      {{item.description}}
                    </p>
                  </header>
                  <section
                    v-for="(foods,foodindex) in item.foods"
                    :key="foodindex"
                    class="menu_detail_list"
                  >
                    <router-link to="#" tag="div" class="mennu_detail_link">
                      <section class="menu_food_img">
                        <img :src="imgBaseUrl+foods.image_path" alt />
                      </section>
                      <section class="menu_food_description">
                        <h3 class="food_description_head">
                          <strong class="description_foodname">{{foods.name}}</strong>
                          <ul v-if="foods.attributes.length" class="attributes_ul">
                            <li
                              v-for="(attribute,foodindex) in foods.attributes"
                              :key="foodindex"
                              :style="{color:'#'+attribute.icon_color,borderColor:'#'+attribute.icon_color}"
                              :class="{attribute_new:attribute.icon_name=='新'}"
                            >
                              <p
                                :style="{color:attribute.icon_name=='新'?'#fff':'#'+attribute.icon_color}"
                              >{{attribute.icon_name=='新'?'新品':attribute.icon_name}}</p>
                            </li>
                          </ul>
                        </h3>
                        <p class="food_description_content">{{foods.description}}</p>
                        <p class="food_description_sale_rating">
                          <span>月售{{foods.monnth_sales}}份</span>
                          <span>好评率{{foods.satisfy_rate}}%</span>
                        </p>
                        <p v-if="foods.activity" class="food_activity">
                          <span
                            :style="{color:`#${foods.activity.image_text_color}`,borderColor:`#${foods.activity.icon_color}`}"
                          >{{foods.activity.image_text}}</span>
                        </p>
                      </section>
                    </router-link>
                    <footer class="menu_detail_footer">
                      <section class="food_price">
                        <span>￥</span>
                        <span>{{foods.specfoods[0].price}}</span>
                        <span v-if="foods.specifications.length">起</span>
                      </section>
                      <!-- 选 规格|数量 -->
                      <buy-cart
                        :shopId="shopId"
                        :foods="foods"
                        @showChooseList="showChooseList"
                        @showReduceTip="showReduceTip"
                        @showMoveDot="showMoveDotFun"
                      ></buy-cart>
                    </footer>
                  </section>
                </li>
              </ul>
            </section>
          </section>
          <!-- 底部购物车 -->
          <section class="buy_cart_container">
            <!-- 购物车商品数量 -->
            <section class="cart_icon_num">
              <div
                class="cart_icon_container"
                ref="cartContainer"
                :class="{cart_icon_activity:totalPrice>0}"
              >
                <span v-if="totalNum" class="cart_list_length">{{totalNum}}</span>
                <svg class="cart_icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon" />
                </svg>
              </div>
              <div class="cart_num">
                <div>￥{{totalPrice}}</div>
                <div>配送费￥{{deliveryFee}}</div>
              </div>
            </section>
            <!-- 结算 -->
            <section class="gotopay" :class="{gotopay_acitvity:minimumOrderAmount<=0}">
              <span
                class="gotopay_button_style"
                v-if="minimumOrderAmount>0"
              >还差￥{{minimumOrderAmount}}起送</span>
              <router-link
                class="gotopay_button_style"
                :to="{path:'/confirmOrder',query:{geohash,shopId}}"
                v-else
              >去结算</router-link>
            </section>
          </section>
          <!-- 购物车列表 -->
          <transition name="toggle-cart">
            <section class="cart_food_list" v-show="showCartList && cartFoodList.length">
              <header>
                <h4>购物车</h4>
                <div @click="clearCart">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove" />
                  </svg>
                  <span class="clear_cart">清空</span>
                </div>
              </header>
              <section class="cart_food_details" id="cartFood">
                <ul>
                  <li v-for="(item,index) in cartFoodList" :key="index" class="cart_food_li">
                    <div class="cart_list_num">
                      <p class="ellipsis">{{item.name}}</p>
                      <p class="ellipsis">{{item.specs}}</p>
                    </div>
                    <div class="cart_list_price">
                      <span>￥</span>
                      <span>{{item.price}}</span>
                    </div>
                    <section class="cart_list_control">
                      <span></span>
                    </section>
                  </li>
                </ul>
              </section>
            </section>
          </transition>
        </section>
      </transition>
      <!-- 评价 -->
      <transition></transition>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  getMsiteAddress,
  getShopDetails,
  getFoodMenu,
  getRatingList,
  getRatingScores,
  getRatingTags
} from "../../api/index";
import { loadMore, getImgPath } from "../../components/common/mixin";
import toast from "../../components/toast";
import ratingStar from "../../components/common/ratingStar";
import buyCart from "../../components/common/buyCart";
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
      menuIndexChange: true, //解决选中index时，scroll监听事件重复判断设置index的bug
      shopListTop: [], //商品列表的高度集合
      titleDetailIndex: null, //点击展示列表头部详情
      categoryNum: [], //商品类型右上角已加入购物车数量
      totalPrice: 0, //总共价格
      cartFoodList: [], //购物车商品列表
      showCartList: false, //显示购物车列表
      receiveInCart: false, //购物车组件下落的圆点是否到达目标位置

      showSpecs: false, //控制显示食品规格
      specsIndex: 0, //当前选中的规格索引值
      choosedFoods: null, //当前选中规格数据
      showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
      showMoveDot: [], //控制下落的小圆点显示隐藏
      windowHeight: null, //屏幕高度
      elLeft: 0, //当前点击加按钮在网页中的绝对left值
      elBottom: 0, //当前点击加按钮在网页中的绝对bottom值

      imgBaseUrl
    };
  },

  components: { ratingStar, buyCart },
  mixins: [loadMore, getImgPath],
  computed: {
    ...mapState(["latitude", "longitude", "cartList"]),
    promotionInfo() {
      return (
        this.shopDetailData.promotion_info ||
        "欢迎光临，用餐高峰期请提前下单，谢谢。"
      );
    },
    // 配送费
    deliveryFee() {
      if (this.shopDetailData) {
        return this.shopDetailData.float_delivery_fee;
      } else {
        return null;
      }
    },
    //还差多少元起送，为负数时显示去结算按钮
    minimumOrderAmount() {
      if (this.shopDetailData) {
        return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
      } else {
        return null;
      }
    },

    //当前商店购物信息
    shopCart() {
      return { ...this.cartList[this.shopId] };
    },

    // 购物车总共商品数量
    totalNum() {
      let num = 0;
      this.cartFoodList.forEach(item => {
        num += item.num;
      });
      return num;
    }
  },

  watch: {
    // 显示加载动画
    showLoading(value) {
      if (!value) {
        this.$nextTick(() => {
          this.initCategoryNum();
        });
      }
    },

    shopCart(value) {
      this.initCategoryNum();
    },

    // 购物车列表发生变化，没有商铺时 隐藏
    cartFoodList(value) {
      if (!value.length) {
        this.showCartList = false;
      }
    }
  },

  created() {},

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.shopDetailData = await getShopDetails(this.shopId);
      this.menuList = await getFoodMenu(this.shopId);
      this.hideLoading();
    },

    //初始化和shopCart变化时，重新获取购物车改变过的数据，赋值categoryNum,totalPrice,cartFoodList,整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
    initCategoryNum() {
      let newArr = [];
      let cartFoodNum = 0;
      this.totalPrice = 0;
      this.cartFoodList = [];
      this.menuList.forEach((item, index) => {
        if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
          let num = 0;
          Object.keys(this.shopCart[item.foods[0].category_id]).forEach(
            itemid => {
              Object.keys(
                this.shopCart[item.foods[0].category_id][itemid]
              ).forEach(foodid => {
                let foodItem = this.shopCart[item.foods[0].category_id][itemid][
                  foodid
                ];
                num += foodItem.num;
                if (item.type == 1) {
                  
                }
              });
            }
          );
        }
      });
    },

    clearCart() {},

    //隐藏动画
    hideLoading() {
      this.showLoading = false;
    },

    // 显示规格列表
    showChooseList(foods) {
      if (foods) {
        this.choosedFoods = foods;
      }
      this.showSpecs = !this.showSpecs;
      this.specsIndex = 0;
    },

    // 记录当前所选规格的索引值
    chooseSpecs(index) {
      this.specsIndex = index;
    },

    //显示提示，无法减去商品
    showReduceTip() {
      this.showDeleteTip = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.showDeleteTip = false;
      }, 3000);
    },

    // 显示下落圆球
    showMoveDotFun(showMoveDot, elLeft, elBottom) {
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      this.elLeft = elLeft;
      this.elBottom = elBottom;
    },

    showTitleDetail(index) {
      this.titleDetailIndex = this.titleDetailIndex == index ? null : index;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../style/mixin";
.shop_wrap {
  @include wh(100%, 100%);
}
.shop_container {
  @include wh(100%, 100%);
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
  .activities_details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 200;
    padding: 58px;
    .activities_shoptitle {
      text-align: center;
      @include sc(37.5px, #fff);
    }
    .activities_ratingstar {
      display: flex;
      justify-content: center;
      transform: scale(2.2);
      margin-top: 32px;
    }
    .activities_list {
      margin: 70px 0 45px;
      @include sc(24px, #fff);
      li {
        margin-bottom: 10px;
        .activities_icon {
          padding: 0 1px; /*no*/
          display: inline-block;
          border: 1px solid #fff;
          border-radius: 5px;
        }
        span {
          color: #fff;
          line-height: 28px;
        }
      }
    }
    .activities_shopinfo {
      p {
        line-height: 32px;
        @include sc(24px, #fff);
      }
    }
    .activities_title_style {
      text-align: center;
      margin-bottom: 45px;
      span {
        @include sc(24px, #fff);
        border: 1px solid #555; /*no*/
        padding: 10px 18px;
        border-radius: 24px;
      }
    }
    .close_activities {
      position: absolute;
      bottom: 46px;
      @include cl;
    }
  }
  .change_show_type {
    display: flex;
    background-color: #fff;
    padding: 14px 0 28px;
    border-bottom: 1px solid #ebebeb; /*no*/
    div {
      flex: 1;
      text-align: center;
      span {
        @include sc(30px, #666);
        padding: 8px 4px;
        border-bottom: 4px solid #fff;
      }
      .activity_show {
        color: #3190e8;
        border-color: #3190e8;
      }
    }
  }
  .food_container {
    display: flex;
    padding-bottom: 94px;
    height: 100%;
  }
  .menu_container {
    height: 100%;
    display: flex;
    flex: 1;
    overflow-y: hidden;
    position: relative;
    .menu_left {
      width: 178px;
      .menu_left_li {
        padding: 32px 14px;
        border-bottom: 1px solid #ededed;
        box-sizing: border-box;
        border-left: 2px solid #f8f8f8;
        position: relative;
        img {
          @include wh(23px, 28px);
        }
        span {
          @include sc(28px, #666);
        }
        .category_num {
          display: inline-block;
          position: absolute;
          top: 8px;
          right: 4px;
          background-color: #ff461d;
          line-height: 28px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #ff461d;
          min-width: 28px;
          height: 28px;
          @include sc(24px, #fff);
        }
      }
    }
    .menu_right {
      flex: 4;
      overflow-y: auto;
      .menu_detail_header {
        width: 100%;
        padding: 18px;
        position: relative;
        @include fj;
        align-items: center;
        .menu_detail_header_left {
          width: 515px;
          white-space: nowrap;
          overflow: hidden;
          .menu_item_title {
            @include sc(32px, #666);
            font-weight: bold;
          }
          .menu_item_description {
            @include sc(24px, #999);
            width: 30%;
            overflow: hidden;
          }
        }
        .menu_detail_header_right {
          @include wh(24px, 47px);
          display: block;
          @include bis("~../../images/icon_point.png");
          background-size: 100% 18px;
          background-position: left center;
        }
        .description_tip {
          background-color: #39373a;
          opacity: 0.95;
          @include sc(24px, #fff);
          position: absolute;
          top: 70px;
          right: 9px;
          z-index: 14;
          width: 375px;
          padding: 24px 18px;
          border: 1px; /*no*/
          border-radius: 9px;
          span {
            color: #fff;
            line-height: 28px;
            font-size: 26px;
          }
          &::after {
            content: "";
            position: absolute;
            @include wh(18px, 18px);
            background-color: #39373a;
            top: -20px;
            right: 32px;
            transform: rotate(-45deg) translateY(16px);
          }
        }
      }
      .menu_detail_list {
        background-color: #fff;
        padding: 28px 18px;
        border-bottom: 1px solid #f8f8f8; /*no*/
        position: relative;
        overflow: hidden;
        .mennu_detail_link {
          display: flex;
          .menu_food_img {
            margin-right: 18px;
            img {
              @include wh(94px, 94px);
              display: inline-block;
              flex-shrink: 0;
            }
          }
          .menu_food_description {
            width: 100%;
            .food_description_head {
              @include fj;
              margin-bottom: 9px;
              .description_foodname {
                @include sc(32px, #333);
              }
              .attributes_ul {
                display: flex;
                li {
                  font-size: 14px;
                  height: 24px;
                  line-height: 16px;
                  padding: 4px;
                  border: 1px solid #666;
                  border-radius: 14px;
                  margin-right: 4px;
                  transform: scale(0.8);
                  p {
                    white-space: nowrap;
                  }
                }
                .attribute_new {
                  position: absolute;
                  top: 0;
                  left: 0;
                  background-color: #4cd964;
                  @include wh(94px, 94px);
                  display: flex;
                  align-items: flex-end;
                  transform: rotate(-45deg) translate(-4px, -70px);
                  border: none;
                  border-radius: 0;
                  p {
                    @include sc(18px, #fff);
                    text-align: center;
                    flex: 1;
                    transform: scale(0.8) translate(4px, -4px);
                  }
                }
              }
            }
            .food_description_content {
              @include sc(24px, #999);
              line-height: 28px;
            }
            .food_description_sale_rating {
              line-height: 38px;
              span {
                @include sc(23px, #333);
              }
            }
            .food_activity {
              line-height: 18px;
              span {
                font-size: 14px;
                border: 1px solid currentColor;
                border-radius: 14px;
                padding: 3px;
                display: inline-block;
                transform: scale(0.8);
                margin-left: -16px;
              }
            }
          }
        }
        .menu_detail_footer {
          margin-left: 112px;
          font-size: 0;
          margin-top: 14px;
          @include fj;
          .food_price {
            span:nth-of-type(1) {
              @include sc(24px, #f60);
              margin-right: 2px;
            }
            span:nth-of-type(2) {
              @include sc(32px, #f60);
              margin-right: 14px;
              font-weight: bold;
            }
            span:nth-of-type(3) {
              @include sc(24px, #666);
            }
          }
        }
      }
    }
  }
  .buy_cart_container {
    position: fixed;
    background-color: #3d3d3f;
    bottom: 0;
    left: 0;
    z-index: 13;
    display: flex;
    @include wh(100%, 94px);
    .cart_icon_num {
      flex: 1;
      .cart_icon_container {
        display: flex;
        background-color: #3d3d3f;
        position: absolute;
        padding: 18px;
        border: 8px solid #444;
        border-radius: 50%;
        left: 23px;
        top: -32px;
        .cart_list_length {
          position: absolute;
          top: -12px;
          right: -12px;
          background-color: #ff461d;
          line-height: 32px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #ff461d; /*no*/
          min-width: 32px;
          height: 32px;
          @include sc(24px, #fff);
        }
        .cart_icon {
          @include wh(56px, 56px);
        }
      }
      .cart_icon_activity {
        background-color: #3190e8;
      }
      .cart_num {
        @include ct;
        left: 164px;
        div {
          color: #fff;
        }
        div:nth-of-type(1) {
          font-size: 37.5px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        div:nth-of-type(2) {
          font-size: 18px;
        }
      }
    }
    .gotopay {
      @include wh(234px, 100%);
      background-color: #535356;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .gotopay_button_style {
        @include sc(33px, #fff);
        font-weight: bold;
      }
    }
    .gotopay_acitvity {
      background-color: #4cd964;
    }
  }
  .cart_food_list {
    position: fixed;
    width: 100%;
    padding-bottom: 94px;
    z-index: 12;
    bottom: 0;
    left: 0;
    background-color: #fff;
    header {
      @include fj;
      align-items: center;
      padding: 14px 28px;
      background-color: #fff;
      svg {
        @include wh(28px, 28px);
        vertical-align: middle;
      }
      h4 {
        @include sc(32px, #666);
      }
      .clear_cart {
        @include sc(28px, #666);
      }
    }
  }
}
</style>