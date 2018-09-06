<template>
 <transition name="fade">
  <div class="mt-alert-wrapper" v-show="isVisible">
    <div class="mt-alert">
      <!-- <div class="mt-alert-header" v-if="title">
          <div class="mt-alert-title">{{ title }}</div>
      </div> -->
      <div class="mt-alert-body" v-html="content">
      </div>
      <div class="mt-alert-footer" v-if="isCancel ||isOk ">
          <a class="mt-alert-btn" 
           :class="{'mt-alert-close': isCancel && !isOk}" 
           v-show="isCancel" 
           @click="close">
           {{ cancelText }}
          </a>
          <a class="mt-alert-btn btn-ok" 
           :class="{'mt-alert-ok': isOk && !isCancel}" 
           v-show="isOk" 
           @click="submit">
          {{ okText }}
          </a>
      </div>
    </div>
  </div>
 </transition>
</template>
<script>
export default {
  name: 'mt-alert',
  data () {
    return {
      isVisible: true,
      isCancel: true,
      isOk: true,
      cancelText: '取消',
      okText: '确定'
    }
  },
  methods: {
    /**
     * 关闭弹窗
     */
    close () {
      this.isVisible = false
      this.removeElement()
      this.isFunction(this.onClose) && this.onClose()
    },
    /**
     * 移除弹窗
     */
    removeElement () {
      if (this.$el) {
        this.$el.remove()
      }
    },
    /**
     * 点击确定
     */
    submit () {
      this.isVisible = false
      this.removeElement()
      this.isFunction(this.onSubmit) && this.onSubmit()
    },
    /**
     * 显示弹窗
     */
    show () {
      this.isVisible = true
      this.isFunction(this.onShow) && this.onShow()
    },
    /**
     * 判断是不是函数
     */
    isFunction (fn) {
      return fn && typeof fn === 'function'
    }
  }
}
</script>
<style lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .mt-alert-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: rgba(0,0,0,.5);
    z-index: 100;
    .mt-alert {
      width: 5.4rem;
      background: #fff;
      border-radius: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      color: black;
      font-size: 14px;
      .mt-alert-body {
        padding: .4rem;
        font-family: PingFangSC-Regular;
        font-size: .28rem;
        color: #333333;
      }
      .mt-alert-footer {
        height: 1rem;
        line-height: 1rem;
        font-family: PingFangSC-Regular;
        font-size: .32rem;
        color: #333333;
        .btn-ok {
          color: #06C1AE
        }
        .mt-alert-btn {
          width: 50%;
          text-align: center;
          display: block;
          float: left;
          border-top: solid #ebebeb 1px;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          &::after {
            content: '';
            height: 1rem;
            width: 1px;
            background: #ebebeb;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        .mt-alert-close {
          width: 100%;
        }
        .mt-alert-ok {
          width: 100%;
        }  
      }
    }
  }
</style>


