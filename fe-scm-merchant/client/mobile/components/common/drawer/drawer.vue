<template>
    <div>
        <div @click="show()"><slot name="enablePoint"></slot></div>
        <div class="mt-drawer-panel" v-show="isVisible">
            <div class="mt-drawer-master"></div>
            <div :class="{'mt-drawer-list': drawerLeave, 'mt-drawer-enter': drawerEnter}">
                <div class="mt-drawer-header">
                    <div class="mt-drawer-header-cancel" @click="cancel()">取消</div>
                    <div class="mt-drawer-header-title">
                        {{ title }}
                    </div>
                    <div class="mt-drawer-header-sure" @click="submit()">确定</div>
                </div>
                <div class="mt-drawer-main">
                    <slot>
                        <ul class="mt-drawer-main-ul" ref="drawerMainUL">
                            <li class="mt-drawer-main-item"
                                v-for="(item, index) in list"
                                :key="index"
                                @click="select(item, index, $event)">
                                {{ item.text }}
                            </li>
                        </ul>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'drawer',
  data () {
    return {
      drawerLeave: true,
      drawerEnter: false,
      isVisible: false,
      selectItemIndex: '',
      selectItem: '',
      timer: null
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  methods: {
    /**
     * 清除所有的选中状态
     */
    removeSeleced () {
      let $ul = this.$refs.drawerMainUL
      if ($ul) {
        let $li = $ul.children
        for (let i = 0; i < $li.length; i++) {
          $li[i].classList.remove('mt-drawer-item-selected')
        }
      }
    },
    /**
     * 隐藏弹层
     */
    cancel () {
      this.drawerLeave = true
      this.drawerEnter = false

      this.selectItemIndex = ''
      this.selectItem = ''

      this.timer = setTimeout(() => {
        this.removeSeleced()
        this.isVisible = false
      }, 200)
    },
    /**
     * 选中列表项
     */
    select (item, index, event) {
      this.selectItemIndex = index
      this.selectItem = item.text

      let $el = event.target || event.srcElement
      if ($el) {
        this.removeSeleced()
        $el.classList.add('mt-drawer-item-selected')
      }
    },
    /**
     * 点击确定
     */
    submit () {
      let result = null
      if (this.selectItemIndex > -1 && this.selectItem) {
        result = {
          selectItemIndex: this.selectItemIndex,
          selectItem: this.selectItem
        }
      }

      this.$emit('onSelect', result)
      this.hide()
    },
    /**
     * 显示
     */
    show () {
      this.isVisible = true
      this.timer = setTimeout(() => {
        this.drawerLeave = false
        this.drawerEnter = true
      }, 100)
    },
    /**
     * 隐藏
     */
    hide () {
      this.cancel()
    }
  },
  destroyed () {
    if (this.timer) {
      window.clearTimeout(this.timer)
    }
  }
}
</script>
<style lang="less" scoped>
  @drawerHeaderHeight: 1rem;
  @drawerMainItemHeight: 1rem;

  .mt-drawer-panel {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    font-size: .18rem;
    z-index: 101;
    .mt-drawer-master {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.5;
    }
    .mt-drawer-enter {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40%;
      background: #fff;
      transition: all .2s;
    }
    .mt-drawer-list {
      position: absolute;
      bottom: -40%;
      width: 100%;
      height: 40%;
      background: #fff;
      transition: all .3s;
    }
    .mt-drawer-main {
      height: 100%;
      width: 100%;
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      background: #ffff;
      .mt-drawer-main-ul {
        list-style: none;
        padding: 0;
        margin: 0 10px;
        font-family: PingFangSC-Regular;
        font-size: .32rem;
        color: #999999;
        .mt-drawer-main-item {
          list-style: none;
          width: 100%;
          height: @drawerMainItemHeight;
          line-height: @drawerMainItemHeight;
          text-align: center;
          border-bottom: 1px solid #efefee;
        }
        .mt-drawer-item-selected {
          font-family: PingFangSC-Medium;
          font-size: .4rem;
          color: #333333;
        }
      }
    }
    .mt-drawer-header {
        height: @drawerHeaderHeight;
        border-bottom: 1px solid #efefef;
        position: relative;
        overflow: hidden;
        font-size: .32rem;
        font-family: PingFangSC-Regular;
        color: #06C1AE;
        letter-spacing: 0;
        .mt-drawer-header-cancel {
            position: absolute;
            left: 5px;
            height: 100%;
            line-height: @drawerHeaderHeight;
        }
        .mt-drawer-header-title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-family: PingFangSC-Regular;
          font-size: .32rem;
          color: #333333;
        }
        .mt-drawer-header-sure {
            position: absolute;
            right: 5px;
            height: 100%;
            line-height: @drawerHeaderHeight;
        }
    }
  }
</style>


