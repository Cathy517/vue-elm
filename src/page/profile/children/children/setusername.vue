<template>
  <div>
    <input type="text" placeholder="请输入用户名" v-model="inputValue">
    <button @click="resetName">确认修改</button>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  data() {
    return {
      inputvalue:''
    }
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    ...mapMutations(['RETSET_NAME']),

    resetName(){
      if(this.inputvalue){
        this.RETSET_NAME(this.inputvalue)
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>