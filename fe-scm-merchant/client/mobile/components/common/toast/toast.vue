<template>
  <transition name="fade">
    <div class="mt-toast-wrapper" v-show="isVisible">
        <div class="mt-toast-body" v-text="contentText">
        </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'toast',
  data () {
    return {
      contentText: '',
      timer: null,
      delay: 1000
    }
  },
  methods: {
    hide () {
      this.isVisible = false
      this.removeChild()
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    /**
     * toast消失之后移除当前的元素
     */
    removeChild () {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  mounted () {
    this.contentText = this.content || '这是一个Toast'
    this.timer = setTimeout(() => {
      this.hide()
    }, this.delay)
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
  .mt-toast-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .mt-toast-body {
      width: 60%;
      opacity: 0.8;
      background: #000000;
      color: #ffff;
      border-radius: .02rem;
      position: absolute;
      overflow: hidden;
      z-index: 102;
      top: 50%;
      left: 50%;
      text-align: center;
      font-size: .28rem;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 2px;
      height: .88rem;
      line-height: .88rem;
      padding: 5px;
    }
  }
</style>


