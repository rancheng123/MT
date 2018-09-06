<template>
  <div class="process" :style="{
    width: percent + '%',
    opacity: hide ? 0 : 1
  }"></div>
</template>
<script>
export default {
  data () {
    return {
      percent: 0,
      delay: 1000,
      hide: false
    }
  },
  methods: {
    /**
     * 显示进度条
     */
    start () {
      this.percent = 0
      this.hide = false

      if (this.timer) {
        clearInterval(this.timer)
      }

      this.cut = 10000 / Math.floor(300)
      this.timer = setInterval(() => {
        this.increase(this.cut * Math.random())
        if (this.percent > 98) {
          this.finish()
        }
      }, 100)
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
    },
    /**
     * 掩藏进度条
     */
    finish () {
      if (this.timer) {
        clearInterval(this.timer)
      }

      this.percent = 0
      this.hide = true
    }
  }
}
</script>
<style>
.process {
  position: fixed;
  height: 1px;
  background: #E6A23C;
  top: 0;
  opacity: 1;
  transition: width .2s, opacity .4s
}
</style>


