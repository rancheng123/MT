<template>
  <div class="mt-wrapper__input">
    <div class="mt-cell mt-title">
        {{ label }}
    </div>
    <div class="mt-cell mt-cell__input">
      <input class="mt-input" :value="value" @change="change" :placeholder="placeholder" type="text"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mtInput',
  props: {
    placeholder: {
      type: String,
      default: () => {
        return '请输入'
      }
    },
    label: {
      type: String,
      default: () => {
        return ''
      }
    },
    value: {}
  },
  methods: {
    change () {
      this.$emit('input', this.value)
    }
  }
}
</script>
<style lang="less" scoped>
  .mt-wrapper__input {
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
    .mt-cell__input {
      width: 80%;
      outline: none;
      & > input {
        width: 100%;
        height: 1.12rem;
        font-family: PingFangSC-Regular;
        font-size: .32rem;
        color: #999999;
        text-align: right;
        box-sizing: border-box;
      }
    }
  }
</style>


