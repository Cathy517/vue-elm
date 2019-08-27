<template>
  <div class="rating_page">
    <head-top head-title="商家详情" go-back="true"></head-top>
    <!-- 活动与属性 -->
    <section class="activities_container">
      <header>活动与属性</header>
      <ul class="actibities_ul">
        <li v-for="item in shopDetail.activities" :key="item.id">
          <span :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>
          <span>{{item.description}}(App专享)</span>
        </li>
      </ul>
      <ul class="actibities_ul">
        <li v-for="item in shopDetail.supports" :key="item.id">
          <span :style="{backgroundColor: '#' + item.icon_color}">{{item.icon_name}}</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
    </section>
    <!-- 食品监督安全公示 -->
    <section class="shop_status_container">
      <router-link to="/shop/shopDetail/shopSafe" class="shop_status_header">
        <span class="shop_detail_title">食品监督安全公示</span>
        <div>
          <span class="identification_detail">企业认证详情</span>
          <svg
            width="14"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            class="description_arrow"
          >
            <path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
          </svg>
        </div>
      </router-link>
      <section class="shop_statu_detail">
        <div>
          <svg class="shop_status" v-if="shopDetail.status==1">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well" />
          </svg>
          <svg class="shop_status" v-else>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad" />
          </svg>
        </div>
        <div class="check_date">
          <p>
            <span>监督检查结果：</span>
            <span class="shop_status_well" v-if="shopDetail.status==1">良好</span>
            <span class="shop_Status_bad" v-else>差</span>
          </p>
          <p>
            <span>检查日期：</span>
            <span>{{shopDetail.identification.identificate_date&&shopDetail.identification.identificate_date.split('T')[0]}}</span>
          </p>
        </div>
      </section>
    </section>
    <!-- 商家信息 -->
    <section class="shop_status_info">
      <header>商家信息</header>
      <p>{{shopDetail.name}}</p>
      <p>地址：{{shopDetail.address}}</p>
      <p>营业时间：[{{shopDetail.opening_hours[0]}}]</p>
      <p @click="showLicenseImg(shopDetail.license.business_license_image)">
        <span>营业执照</span>
        <svg
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          class="description_arrow"
        >
          <path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
        </svg>
      </p>
      <p @click="showLicenseImg(shopDetail.license.catering_service_license_image)">
        <span>餐饮服务许可证</span>
        <svg
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          class="description_arrow"
        >
          <path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
        </svg>
      </p>
    </section>

    <transition name="fade">
      <section class="license_container" v-if="showlicenseImg" @click="showlicenseImg = false">
        <img :src="imgBaseUrl + licenseImg" />
      </section>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headTop from "../../../components/header/index";
import { mapState } from "vuex";
import { getImgPath } from "../../../components/common/mixin";
import { imgBaseUrl } from "../../../config/env";
export default {
  data() {
    return {
      licenseImg: null,
      showlicenseImg: false,
      imgBaseUrl
    };
  },

  components: { headTop },
  mixins: [getImgPath],
  computed: {
    ...mapState(["shopDetail"])
  },

  created() {},

  mounted() {},

  methods: {
    showLicenseImg(img) {
      this.licenseImg = img;
      this.showlicenseImg = true;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../../style/mixin";
.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 92px;
  background-color: #ebebeb;
  z-index: 18;
  .activities_container {
    background-color: #fff;
    margin: 18px 0;
    padding-bottom: 28px;
    header {
      @include sc(36px, #333);
      line-height: 84px;
      padding-left: 28px;
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 14px;
    }
    .actibities_ul {
      padding: 0 28px;
      li {
        margin-bottom: 9px;
        span:nth-of-type(1) {
          @include sc(21px, #fff);
          padding: 4px;
          border: 1px; /*no*/
          border-radius: 4px;
          margin-right: 8px;
        }
        span:nth-of-type(2) {
          @include sc(26px, #666);
        }
      }
    }
  }
  .shop_status_container {
    background-color: #fff;
    margin-bottom: 18px;
    .shop_status_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 84px;
      padding: 0 28px;
      border-bottom: 1px solid #f1f1f1;
      .shop_detail_title {
        @include sc(36px, #333);
      }
      .identification_detail {
        @include sc(32px, #bbb);
        vertical-align: middle;
      }
      svg {
        @include wh(28px, 28px);
        vertical-align: middle;
      }
    }
    .shop_statu_detail {
      display: flex;
      padding: 28px;
      svg {
        @include wh(94px, 94px);
        margin-right: 28px;
      }
      .check_date {
        span {
          @include sc(26px, #666);
        }
        .shop_status_well {
          color: rgb(126, 211, 33);
        }
        .shop_Status_bad {
          color: red;
        }
      }
    }
  }
  .shop_status_info {
    background-color: #fff;
    margin-bottom: 18px;
    header {
      line-height: 84px;
      padding: 0 28px;
      @include sc(36px, #333);
      border-bottom: 1px solid #f5f5f5; /*no*/
    }
    p {
      @include sc(28px, #666);
      padding: 32px 28px 32px 0;
      margin-left: 28px;
      border-bottom: 1px solid #f5f5f5; /*no*/
    }
    span {
      color: #666;
    }
    p:nth-of-type(4),
    p:nth-of-type(5) {
      display: flex;
      justify-content: space-between;
    }
  }
  .license_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 101;
    img {
      width: 100%;

      @include center;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .router-slid-enter-active,
  .router-slid-leave-active {
    transition: all 0.4s;
  }
  .router-slid-enter,
  .router-slid-leave-active {
    transform: translate3d(94px, 0, 0);
    opacity: 0;
  }
}
</style>
