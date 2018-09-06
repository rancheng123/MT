<template>
  <datetime-picker type="date" ref="picker" @confirm="handleChange"></datetime-picker>
</template>
<script>
/**
 * 该组件用了mint-ui中相关组件
 * 到@/less/mint-bass.less中修改样式
 */
import { DatetimePicker } from 'mint-ui'
export default {
  name: 'dataPicker',
  components: {
    DatetimePicker
  },
  methods: {
    show () {
      this.$refs.picker.open()
    },
    handleChange (value) {
      this.$emit('confirm', value)
    }
  }
}
</script>
<style lang="less" scoped>
 .picker-toolbar {
   height: 100px;
 }
</style>


