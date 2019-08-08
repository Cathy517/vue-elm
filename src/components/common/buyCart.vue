<template>
  <section class="cart_module">
    <!-- 无规格的商品 -->
    <section v-if="!foods.specifications.length" class="cart_button">
      <!-- 减1  -->
      <transition name="showReduce">
        <span v-if="foodNum" @click="removeOutCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus" />
          </svg>
        </span>
      </transition>
      <transition name="fade">
        <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
      </transition>
      <!-- 加1 -->
      <svg
        class="add_icon"
        @click="addToCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock, $event)"
      >
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add" />
      </svg>
    </section>
    <!-- 有规格的商品 -->
    <section v-else class="choose_specification">
      <section class="choose_icon_container">
        <transition name="showReduce">
          <svg class="specs_reduce_icon" v-if="foodNum" @click="showReduceTip">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus" />
          </svg>
        </transition>
        <transition name="fade">
          <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
        </transition>
        <span class="show_chooselist" @click="showChooseList(foods)">选规格</span>
      </section>
    </section>
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      showMoveDot: [] //控制下落的小圆点显示隐藏
    };
  },
  props: ["foods", "shopId"],
  components: {},

  computed: {
    ...mapState(["cartList"]),

    // 监听cartList变化，更新当前商铺的购物车信息shopCart，同时返回一个新的对象
    shopCart() {
      return Object.assign({}, this.cartList[this.shopId]);
    },

    // shopCart变化时重新计算当前商品的数量
    foodNum() {
      let category_id = this.foods.category_id;
      let item_id = this.foods.item_id;
      if (
        this.shopCart &&
        this.shopCart[category_id] &&
        this.shopCart[category_id][item_id]
      ) {
        let num = 0;
        Object.values(this.shopCart[category_id][item_id]).forEach(
          (item, index) => {
            num += item.num;
          }
        );
        return num;
      } else {
        return 0;
      }
    }
  },

  created() {},

  mounted() {},

  methods: {
    ...mapMutations(["ADD_CART", "REDUCE_CART"]),

    // 移出购物车
    removeOutCart(
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock
    ) {
      if (this.foodNum > 0) {
        this.REDUCE_CART({
          shopid: this.shopId,
          category_id,
          item_id,
          food_id,
          name,
          price,
          specs,
          packing_fee,
          sku_id,
          stock
        });
      }
    },

    // 加入购物车，计算按钮位置
    addToCart(
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock,
      event
    ) {
      this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock})
      let elLeft = event.target.getBoundingClientRect().left;
      let elBottom = event.target.getBoundingClientRect().bottom;
      this.showMoveDot.push(true);
      this.$emit("showMoveDot", this.showMoveDot, elLeft, elBottom);
    },

    // 显示规格列表
    showChooseList(foodScroll) {
      this.$emit("showChooseList", foodScroll);
    },

    // 点击多规格商品的减按钮，弹出提示
    showReduceTip() {
      this.$emit("showReduceTip");
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../style/mixin";
.cart_module {
  .add_icon {
    position: relative;
    z-index: 11;
  }
  .cart_button {
    display: flex;
    align-items: center;
  }
  svg {
    @include wh(42px, 42px);
    fill: #3190e8;
  }
  .specs_reduce_icon {
    fill: #999;
  }
  .cart_num {
    @include sc(30px, #666);
    min-width: 47px;
    text-align: center;
  }
  .choose_specification {
    .choose_icon_container {
      display: flex;
      align-items: center;
      .show_chooselist {
        display: block;
        @include sc(26px, #fff);
        padding: 5px 9px;
        background-color: $blue;
        border-radius: 9px;
        border: 1px solid $blue; /*no*/
      }
    }
  }
}
</style>