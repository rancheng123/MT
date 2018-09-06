<template>
    <div class="mt-tab-panel">
       <div class="mt-tab-panel-group" ref="tabPanel">
          <slot></slot>
       </div>
    </div>
</template>
<script>
export default {
  name: 'tabPanel',
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    _getPanelPosition (entry) {
      let index = this.tabs.indexOf(this.value)
      let panel = this.$refs.tabPanel

      this.$nextTick(() => {
        if (!arguments.length) {
          panel.style.transition = `all .3s linear`
        }
        panel.style.transform = `translateX(${'-' + index * 100 + '%'}) translateZ(0)`
      })
    }
  },
  watch: {
    value () {
      this._getPanelPosition()
    }
  },
  mounted () {
    this._getPanelPosition('mounted')
  }
}
</script>
<style lang="less" scoped>
  .mt-tab-panel {
    position: relative;
    overflow: hidden;
    height: 100%;
    .mt-tab-panel-group {
      height: 100%;
      display: flex;
    }
  }
</style>


