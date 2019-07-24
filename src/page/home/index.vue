<template>
  <div>
    <head-top>
      <span slot="logo" class="head_logo" @click="reload">ele.me</span>
    </head-top>

    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/'+guessCityid" class="guess_city">
        <span>{{guessCity}}</span>
        <svg class="arrow_right" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <use xmls:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
        </svg>
      </router-link>
    </nav>

    <section id="hot_city_containner">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear">
        <router-link
          tag="li"
          v-for="(item,index) in hotcity"
          :key="index"
          :to="'/city/'+item.id"
        >{{item.name}}</router-link>
      </ul>
    </section>

    <section class="group_city_container">
      <ul class="letter_classify">
        <li v-for="(value,key,index) in sortgroupcity" :key="index" class="letter_classify_li">
          <h4 class="city_title">{{key}}
            <span v-if="index==0">(按字母排序)</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <router-link
              tag="li"
              v-for="item in value"
              :to="'/city/'+item.id"
              :key="item.id"
              class="ellipsis"
            >{{item.name}}</router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import headTop from "../../components/header/index";
import { getCityGuess, getHotcity, getGroupcity } from "../../api/index";

export default {
  components: {
    headTop
  },
  data() {
    return {
      guessCity: "", //当前城市
      guessCityid: "", //当前城市id
      hotcity: [], //热门城市列表
      groupcity: {} //所有城市列表
    };
  },
  created() {},
  mounted() {
    this.fetchCityGuess();
    this.fetchHotcity();
    this.fetchGroupcity();
  },
  computed: {
    //将获取的数据按照A-Z字母开头排序
    sortgroupcity() {
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupcity[
            String.fromCharCode(i)
          ];
        }
      }
      return sortobj;
    }
  },
  methods: {
    //获取当前城市
    fetchCityGuess() {
      getCityGuess()
        .then(res => {
          this.guessCity = res.name;
          this.guessCityid = res.id;
        })
        .catch(err => {});
    },

    //热门城市
    fetchHotcity() {
      getHotcity()
        .then(res => {
          this.hotcity = res;
        })
        .catch(err => {});
    },

    // 所有城市
    fetchGroupcity() {
      getGroupcity()
        .then(res => {
          this.groupcity = res;
        })
        .catch(err => {});
    },

    reload() {
      window.location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/mixin";
.head_logo {
  left: 18.5px;
  font-weight: 400;
  @include sc(32px, #ffffff);
  @include wh(108px, 32px);
  @include ct;
}
.city_nav {
  padding-top: 110px;
  border-top: 1px solid $bc; /*no*/
  background-color: #ffffff;
  margin-bottom: 18px;
  .city_tip {
    @include fj;
    line-height: 68px;
    padding: 0 21px;
    span:nth-of-type(1) {
      @include sc(26px, #666666);
    }
    span:nth-of-type(2) {
      font-weight: 900;
      @include sc(22px, #9f9f9f);
    }
  }
  .guess_city {
    @include fj;
    align-items: center;
    height: 85px;
    padding: 0 0.45rem;
    border-top: 1px solid $bc; /*no*/
    border-bottom: 2px solid $bc;
    @include font(34px, 85px);
    span:nth-of-type(1) {
      color: $blue;
    }
    .arrow_right {
      @include wh(28px, 28px);
      fill: #999;
    }
  }
}
#hot_city_containner {
  background-color: #ffffff;
  margin-bottom: 18px;
}
.city_title {
  color: #666666;
  font-weight: 400;
  text-indent: 21px;
  border-top: 2px solid $bc;
  border-bottom: 1px solid $bc; /*no*/
  @include font(26px, 68px);
  span {
    @include sc(22px, #999999);
  }
}
.citylistul {
  li {
    float: left;
    text-align: center;
    color: $blue;
    border-bottom: 1px solid $bc; /*no*/
    border-right: 1px solid $bc; /*no*/
    @include wh(25%, 82px);
    @include font(28px, 82px);
  }
  li:nth-of-type(4n) {
    border-right: none;
  }
}
.letter_classify_li{
  margin-bottom: 18px;
  background-color: #ffffff;
  .groupcity_name_container{
    li{
      color: #666666
    }
  }
}
</style>
