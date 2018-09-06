<template>
  <div class="data-wrapper">
    <div class="data-group">
       <slot></slot>
    </div>
    <div class="data-loading" v-show="loading">
      <loading :size="20"></loading>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scrollToBottom',
  props: {
    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    /**
     * 简单实现函数节流
     */
    throttle (delay, action) {
      let last = new Date()
      let timer = null

      return () => {
        let current = new Date()
        if (timer) {
          clearTimeout(timer)
        }
        if (current - last > delay) {
          last = current
          action.call(this)
        } else {
          timer = setTimeout(() => {
            action.call(this)
          }, delay)
        }
      }
    },
    /**
     * 判断是否滚动到底部
     */
    scrollToBottom () {
      this.$nextTick(() => {
        let handle = this.throttle(100, this._scrollToBottom)
        document.removeEventListener('scroll', handle, false)
        document.addEventListener('scroll', handle, false)
      })
    },
    _scrollToBottom () {
      let clientHeigth = document.body.clientHeight || document.documentElement.clientWidth
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      let scrollHeight = document.body.scrollHeight

      if (scrollHeight <= scrollTop + clientHeigth + 2) {
        this.$emit('scrollToBottom', true)
      } else {
        this.$emit('scrollToBottom', false)
      }
    }
  },
  mounted () {
    this.scrollToBottom()
  }
}
</script>
<style lang="less" scoped>
  .data-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    .data-loading {
      position: relative;
      overflow: hidden;
      height: 30px;
    }
  }
</style>


