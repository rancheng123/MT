<template>
    <div class="mt-btn-wrapper">
        <div class="mt-btn" @click="btnClick">
           　<slot></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'botton',
  props: {
    btnText: {
      type: String,
      default: () => {
        return '确定'
      }
    }
  },
  methods: {
    btnClick () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="less" scoped>
 @btnHeigth: .88rem;
 .mt-btn-wrapper {
  .mt-btn {
    background: #06C1AE;
    border-radius: 2.5px;
    font-family: PingFangSC-Semibold;
    font-size: .36rem;
    color: #FFFFFF;
    text-align: center;
    height: @btnHeigth;
    line-height: @btnHeigth;
    width: 92%;
    margin: 0 auto;
  }
 }
</style>

