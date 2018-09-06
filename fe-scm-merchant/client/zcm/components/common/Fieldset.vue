<template>
  <fieldset>
     <legend>{{legend}}</legend>
     <slot></slot>
  </fieldset>
</template>

<script>
export default {
  props: ['legend']
}
</script>

<style lang="less" scoped>
  fieldset {
    text-align: left;
    font-size: 14px;
    border: 1px #E4E7ED solid;
    margin-bottom: 20px;
    font-size: 14px;
    color: #606266;
    padding: 20px;
  }
</style>

