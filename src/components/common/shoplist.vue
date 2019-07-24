<template>
  <div class="shoplist_container" v-if="shopListArr.length">
    <ul>
      <router-link to="#" tag="li" class="shop_li" v-for="(item,index) in shopListArr" :key="index">
        <section><img src="" alt=""></section>
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <h4 class="shop_title ellipsis">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li class="supports" v-for="i in item.supports" :key="i.id">{{i.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <div class="rating_section">
                <span>{{item.rating}}</span>
              </div>
              <div class="order_section">月售{{item.recent_order_num}}单</div>
            </section>
            <section class="rating_order_num_right">
              <span class="delivery_style delivery_left">蜂鸟专送</span>
              <span class="delivery_style delivery_right">准必达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <p></p>
          </h5>
        </hgroup>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {imgBaseUrl} from '../../config/env'
import toast from "../../components/toast";
import { getShopList } from "../../api/index";
export default {
  data() {
    return {
      offset: 0, //批次加载店铺列表，每次加载20个，limit=20
      shopListArr: [], //店铺列表数据
      preventRepeatRequest: false, //到达底部加载数据，防止重复加载
      showBackStatus: true, //显示返回顶部按钮
      showLoading: true, //显示加载动画
      touchend: false, //没有更多数据
      imgBaseUrl: ""
    };
  },
  props: ["geohash","restaurantCategoryId"],
  components: {},

  computed: {
    ...mapState(["latitude", "longitude"])
  },

  created() {},

  mounted() {
    console.log(this.latitude);
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
      this.hideLoading();
      this.shopListArr = [...res];
      if (res.length < 20) {
        this.touchend = true;
        return;
      }
    },

    hideLoading() {
      this.showLoading = false;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>