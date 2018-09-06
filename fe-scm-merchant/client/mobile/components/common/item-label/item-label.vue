<template>
  <div class="mt-wrapper__item">
    <div class="mt-cell mt-title">
        {{ label }}
    </div>
    <div class="mt-cell mt-cell__label" :style="{'width': width}">
      {{ value }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'mtItemLabel',
  data () {
    return {
      width: '80%'
    }
  },
  props: {
    label: {
      type: String,
      default: () => {
        return ''
      }
    },
    value: {}
  }
}
</script>
<style lang="less" scoped>
  .mt-wrapper__item {
    background: #ffff;
    height: 1.12rem;
    line-height: 1.12rem;
    position: relative;
    overflow: hidden;
    font-family: PingFangSC-Regular;
    font-size: .32rem;
    color: #333333;
    padding: 0 .3rem;
    .mt-cell {
      float: left;
    }
    .mt-title {
      width: 20%;
      text-align: left;
    }
    .mt-cell__label {
      outline: none;
      text-align: right;
    }
    .right-arrow {
      border-top: #999999 1px solid;
      border-right: #999999 1px solid;
      height: .15rem;
      width: .15rem;
      transform: rotate(45deg) translate(-50%);
      position: absolute;
      right: .3rem;
      top: 50%;
    }
  }
</style>


