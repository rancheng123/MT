<template>
<div>
  <div class="cell" :label="label"  :value="value">
    <span class="label">{{label}}</span>
    <span class="name">{{value}}</span>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['label', 'value'],
  methods: {

  }
}
</script>

<style lang="less">
.cell {
  text-align: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  .label {
    display: inline-block;
    width: 130px;
    }
  .name {
    display: inline-block;
  }
  }
</style>