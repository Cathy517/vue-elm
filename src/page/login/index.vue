<template>
  <div>
    <section>
      <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="phoneNumber">
      <button @click.prevent="getVerifyCode" v-show="!computedTime">获取验证码</button>
      <button @click.prevent v-show="computedTime">已发送{{computedTime}}s</button>
    </section>
    <section>
      <input type="text" placeholder="请输入验证码" maxlength="6" v-model="mobileCode">
    </section>
    <div @click="mobileLogin">登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber:null,//电话号码
      mobileCode:'123456',//短信验证码
      validate_token:null,//获取短信时返回的验证值，登录时需要
      computedTime:0,//倒计时
      userAccount:null,//用户名
      passWord:null,//密码
      codeNumber:null,//验证码
    }
  },

  components: {
    // 判断手机号
    rightPhoneNumber(){
      return /^1\d{10}$/gi.test(this.phoneNumber)
    }
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    // 获取验证码
    async getVerifyCode(){
      if(this.rightPhoneNumber){
        this.computedTime=5;
        this.timer=setInterval(()=>{
          this.computedTime--;
          if(this.computedTime==0){
            clearInterval(this.timer)
          }
        },1000)
      }
    },
    mobileLogin(){

    }
  }
}

</script>
<style lang='scss' scoped>
</style>