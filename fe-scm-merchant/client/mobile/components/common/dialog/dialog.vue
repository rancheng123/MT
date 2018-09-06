<template>
 <transition name="fade">
  <div class="mt-dialog-wrapper" v-show="isVisible">
    <div class="mt-dialog">
      <div class="mt-dialog-header" v-if="titleText">
          <div class="mt-dialog-title">{{ titleText }}</div>
      </div>
      <div class="mt-dialog-body">
        <slot></slot>
      </div>
      <div class="mt-dialog-footer">
          <a class="mt-dialog-btn" @click="hide">
           确定
          </a>
      </div>
    </div>
  </div>
 </transition>
</template>
<script>
export default {
  name: 'mt-dialog',
  data () {
    return {
      isVisible: false,
      titleText: '提示'
    }
  },
  methods: {
    /**
     * 显示
     */
    show () {
      this.isVisible = true
    },
    /**
     * 隐藏
     */
    hide () {
      if (typeof this.callback === 'function') {
        if (this.callback() !== false) {
          this.isVisible = false
        }
      } else {
        this.isVisible = false
      }
    }
  },
  mounted () {
    this.titleText = this.title || this.titleText
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
  .mt-dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: rgba(0,0,0,.5);
    z-index: 101;
    border-radius: 2px;
    .mt-dialog-title {
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      font-family: PingFangSC-Regular;
      font-size: .4rem;
      color: #333333;
      margin-top: .6rem;
    }
    .mt-dialog {
      width: 5.4rem;
      background: #fff;
      border-radius: 2px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      color: black;
      font-size: 14px;
      .mt-dialog-body {
        padding: 10px;
        color: #333333;
      }
      .mt-dialog-footer {
        height: 30px;
        line-height: 30px;
        .mt-dialog-btn {
          width: 100%;
          text-align: center;
          display: block;
          float: left;
          border-top: solid #ebebeb 1px;
          position: relative;
          overflow: hidden;
          font-family: PingFangSC-Semibold;
          font-size:.32rem;
          color: #06C1AE;
          height: 1rem;
          line-height: 1rem;
        }
      }
    }
  }
</style>


