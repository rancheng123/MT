<template>
  <div class="mt-tab-panel-item">
      <slot></slot>
  </div> 
</template>
<script>
export default {
  name: 'tabPanelItem'
}
</script>
<style lang="less" scoped>
 .mt-tab-panel-item {
   width: 100%;
   -webkit-box-flex: 1;
   flex: 1 0 auto;
   height: 100%;
   position: relative;
   overflow: hidden;
 }
</style>


