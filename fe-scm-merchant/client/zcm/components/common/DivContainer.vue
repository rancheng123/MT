<template>
    <div class="mt-div">
        <slot></slot>
    </div>
</template>
<script>
export default {
  props: ['loading']
}
</script>
<style lang="less" scoped>
  .mt-div {
      position: relative;
      overflow: hidden;
      background: #fff;
  }
</style>


