<template>
  <div class="mt-tab-bar-wapper" v-show="isVisible && tabs.length">
     <div class="mt-tab-body">
       <div class="mt-tab-item" 
        v-for="(item, index) in tabList"
        :class="{'tab-item-selectd': item.isActive}"
        :key="index" 
        @click="onClick(item, index, $event)">
         {{ item.tab }}
       </div>
       <div ref="slider" class="mt-tab-slider"></div>
     </div>
  </div>
</template>
<script>
export default {
  name: 'tab-bar',
  data () {
    return {
      selected: '',
      tabList: []
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    onClick (item, index, event) {
      this.resetTab()
      this.tabList[index].isActive = true
      this._getSliderPosition(event, index)
      this.$emit('input', item.tab)
    },
    resetTab () {
      this.tabList.forEach(item => {
        item.isActive = false
      })
    },
    initSlider () {
      let initIndex = this.tabs.indexOf(this.value)
      let offsetWidth = document.body.clientWidth / this.tabs.length

      this._setSliderStyle(initIndex, offsetWidth)
    },
    _getSliderPosition (event, index) {
      let target = event.target || event.srcElement
      if (target) {
        let offsetWidth = target.offsetWidth
        this._setSliderStyle(index, offsetWidth)
      }
    },
    _setSliderStyle (index, offsetWidth) {
      let slider = this.$refs.slider
      let offsetLeft = this._getSliderOffsetLeft(index, offsetWidth)

      this.$nextTick(() => {
        slider.style.width = offsetWidth + 'px'
        slider.style.transition = `all .2s linear`
        slider.style.transform = `translateX(${offsetLeft + 'px'}) translateZ(0)`
      })
    },
    _getSliderOffsetLeft (index, offsetWidth) {
      let offset = index * (+offsetWidth)
      return offset
    }
  },
  mounted () {
    this.tabs.forEach(item => {
      this.tabList.push({
        isActive: item === this.value,
        tab: item
      })
    })
    this.initSlider()
  }
}
</script>
<style scoped lang="less">
  @tabItemHeight: .7rem;
  .mt-tab-bar-wapper {
    font-size: .36rem;
    .mt-tab-body {
      display: flex;
      height: @tabItemHeight;
      line-height: @tabItemHeight;
      background: #efefef;
      position: relative;
      overflow: hidden;
      .mt-tab-item {
        flex: 1
      }
      .tab-item-selectd {
        color: orange
      }
    }
    .mt-tab-slider {
      position: absolute;
      bottom: 0;
      left:0;
      height: 1px;
      background: orange
    }
  }
</style>

