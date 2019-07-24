<template>
  <transition name="mint-toast-pop">
    <div class="mint-toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10PX' : '30PX 25PX' }">
      <i class="mint-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="mint-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10PX' }">{{ message }}</span>
      <span class="mint-toast-text" v-if="submessage">{{ submessage }}</span>
    </div>
  </transition>
</template>

<style>
.mint-toast {
  position: fixed;
  width: 4rem;
  background: rgba(51, 51, 51, 0.6);
  border-radius: 10px;
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 10000;
  transition: opacity 0.3s linear;
}
.mint-toast.is-placebottom {
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.mint-toast.is-placemiddle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.mint-toast.is-placetop {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.mint-toast-icon {
  display: block;
  background: url('~../../images/icon_toast_wrong.png') no-repeat;
  width: 1.333333rem;
  height: 1.333333rem;
  background-size: 1.333333rem 1.333333rem;
  margin: 0 auto;
}
.icon-toast-fail {
  display: block;
  background: url('~../../images/fail.png') no-repeat;
  width: 1.333333rem;
  height: 1.333333rem;
  background-size: 1.333333rem 1.333333rem;
  margin: 0 auto;
}
.icon-toast-success {
  display: block;
  background: url('~../../images/success.png') no-repeat;
  width: 1.333333rem;
  height: 1.333333rem;
  background-size: 1.333333rem 1.333333rem;
  margin: 0 auto;
}
.mint-toast-text {
  font-size: 26px;
  display: block;
  text-align: center;
}
.mint-toast-pop-enter,
.mint-toast-pop-leave-active {
  opacity: 0;
}
</style>

<script type="text/babel">
export default {
  props: {
    message: String,
    submessage: String,
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    customClass() {
      var classes = [];
      switch (this.position) {
        case 'top':
          classes.push('is-placetop');
          break;
        case 'bottom':
          classes.push('is-placebottom');
          break;
        default:
          classes.push('is-placemiddle');
      }
      classes.push(this.className);
      return classes.join(' ');
    }
  }
};
</script>
