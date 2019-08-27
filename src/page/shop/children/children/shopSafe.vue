<template>
  <div class="safe_shop">
    <head-top head-title="食品监督安全公示" go-back='true'></head-top>
    <section id="scroll_section " class="scroll_container">
      <section>
        <section class="shop_status_container">
          <header>食品监督安全公示</header>
          <section class="shop_statu_detail">
            <div>
              <svg class="shop_status" v-if="shopDetail.status == 1">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
              </svg>
              <svg class="res-well" v-else>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
              </svg>
            </div>
            <div class="check_date">
              <p>
                <span>监督检查结果：</span>
                <span></span>
              </p>
            </div>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import headTop from "../../../../components/header/index";
import { mapState } from "vuex";
import { getImgPath } from "../../../../components/common/mixin";
import { imgBaseUrl } from "../../../../config/env";
export default {
  data() {
    return {
    }
  },

  components: {headTop},

  computed: {
    ...mapState(['shopDetail'])
  },

  created() {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
@import "../../../../style/mixin";
.safe_shop{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 92px;
  background-color: #ebebeb;
  z-index: 102;
}
</style>