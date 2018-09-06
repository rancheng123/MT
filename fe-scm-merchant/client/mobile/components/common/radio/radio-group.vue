<template>
   <div class="mt-radio-group" ref="radioGroup">
     <slot></slot>
   </div>
</template>
<script>
import emitter from '../../../src/mixins/emitter'

export default {
  name: 'radioGroup',
  componentName: 'radioGroup',
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  created () {
    this.$on('handleRadioClick', value => {
      this.$emit('input', value)
    })
  }
}
</script>
<style lang="less" scoped>
</style>


