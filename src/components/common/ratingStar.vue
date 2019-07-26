<template>
  <div class="rating_container" v-if="rating">
    <section class="star_container">
      <svg class="grey_fill" v-for="num in 5" :key="num">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star" />
      </svg>
    </section>
    <div :style="'width:'+ rating * 1.24 / 5+'rem'" class="star_overflow">
      <section class="star_container">
        <svg class="orange_fill" v-for="num in 5" :key="num">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star" />
        </svg>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
@import "../../style/mixin";
.rating_container {
  position: relative;
  top: 9px;
  @include wh(94px, 18px);
  .star_overflow {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .star_container {
    position: absolute;
    display: flex;
    width: 94px;
    height: 18px;
    top: -1px; /*no*/
    left: -1px; /*no*/
    .grey_fill {
      fill: #d1d1d1;
    }
    .orange_fill {
      fill: #ff9a0d;
    }
  }
}
</style>