<template>
  <div class="city_container">
    <head-top :head-title="cityname" :go-back="true">
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input
          type="search"
          name="city"
          v-model="inputValue"
          placeholder="输入小区/学校/写字楼"
          class="city_input input_style"
          required
        />
      </div>
      <div>
        <input
          type="submit"
          name="submit"
          class="city_submit input_style"
          @click="postpois"
          value="提交"
        />
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item,index) in placelist" :key="index" @click="jumpToMsite(index,item.geohash)">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <footer v-if="historytitle&&placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import headTop from "../../components/header/index";
import toast from "../../components/toast";
import { getCurrentcity, getSearchplace } from "../../api/index";
import { getStore, setStore, removeStore } from "../../config/mUtils";

export default {
  data() {
    return {
      inputValue: "", //搜索地址
      cityid: "", //当前城市id
      cityname: "", //当前城市名字
      placelist: [], //搜索城市列表
      placeHistory: [], //历史搜索记录
      historytitle: true, //默认显示搜索历史头部，点击搜索后隐藏
      placeNone: false //搜索无结果，显示提示信息
    };
  },

  components: { headTop },

  computed: {},

  created() {},

  mounted() {
    this.cityid = this.$route.params.cityid;
    this.fetchCurrentcity();
    this.initData();
  },

  methods: {
    //当前城市
    fetchCurrentcity() {
      getCurrentcity(this.cityid)
        .then(res => {
          this.cityname = res.name;
        })
        .catch(err => {
          toast({
            message: err
          });
        });
    },

    // 获取搜索历史记录
    initData() {
      if (getStore("placeHistory")) {
        this.placelist = JSON.parse(getStore("placeHistory"));
      } else {
        this.placelist = [];
      }
    },

    // 搜索信息
    postpois() {
      if (this.inputValue) {
        getSearchplace(this.cityid, this.inputValue)
          .then(res => {
            console.log(res);
            this.historytitle = false;
            this.placelist = res;
            this.placeNone = res.length ? false : true;
          })
          .catch(err => {});
      }
    },

    /**
     * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
     * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
     */
    jumpToMsite(index, geohash) {
      let history = getStore("placeHistory");
      let choosePlace = this.placelist[index];
      if (history) {
        let checkrepeat = false;
        this.placeHistory = JSON.parse(history);
        this.placeHistory.forEach(item => {
          if (item.geohash == geohash) {
            checkrepeat = true;
          }
        });
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace);
        }
      } else {
        this.placeHistory.push(choosePlace);
      }
      setStore("placeHistory", this.placeHistory);
      this.$router.push({ path: "/msite", query: { geohash } });
    },

    clearAll() {
      removeStore('placeHistory');
      this.initData();
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../style/mixin";
.city_container {
  padding-top: 110px;
  .change_city {
    right: 18px;
    @include sc(28px, #fff);
    @include ct;
  }
  .city_form {
    background-color: #fff;
    border-top: 1px solid $bc; /*no*/
    border-bottom: 1px solid $bc; /*no*/
    padding-top: 18px;
    div {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .input_style {
        border-radius: 5px;
        margin-bottom: 18px;
        @include wh(100%, 66px);
      }
      .city_input {
        border: 1px solid $bc; /*no*/
        padding: 0 14px;
        @include sc(30px, #333);
      }
      .city_submit {
        background-color: $blue;
        @include sc(30px, #fff);
      }
    }
  }
  .pois_search_history {
    padding-left: 22px;
    border-bottom: 1px solid $bc;/*no*/
    @include font(22px, 37.5px);
  }
  .getpois_ul {
    background-color: #fff;
    border-top: 1px solid $bc;
    li {
      padding: 30px 28px;
      border-bottom: 1px solid $bc;/*no*/
      .pois_name {
        @include sc(30px, #333);
      }
      .pois_address {
        @include sc(22px, #999);
      }
    }
  }
  .clear_all_history{
    @include sc(32px,#666);
    text-align: center;
    line-height: 94px;
    background-color: #fff;
  }
  .search_none_place {
    margin: 0 auto;
    @include font(30px, 82px);
    color: #333;
    background-color: #fff;
    text-indent: 22px;
  }
}
</style>