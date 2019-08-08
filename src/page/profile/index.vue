<template>
  <div>
    <p>{{username}}</p>
    <set-username></set-username>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import {setUsername} from '../profile/children/children/setusername';
export default {
  data() {
    return {
      username:''
    }
  },

  components: {},

  computed: {
    ...mapState(['userInfo'])
  },

  created() {},

  mounted() {
    this.initData();
  },
  watch:{
    userInfo(n,o){
      this.initData();
    }
  },
  methods: {
    initData(){
      if(this.userInfo && this.userInfo.user_id){
        this.username=this.userInfo.username;
      }else{
        this.username='登录/注册'
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>