<template>
  <el-form :label-width="labelWidth" :inline="true" class="mt-form-inline">
    <slot></slot>
  </el-form>
</template>
<script>
export default {
  props: ['labelWidth']
}
</script>
<style>
 .mt-form-inline {
   position: relative;
   overflow: hidden;
 }
 .mt-page .el-form {
   background: #ffffff;
   padding: 10px
 }
 .mt-page .el-form .el-form-item {
  float: left;
  margin-right: 0px
 }
 .mt-page .el-form .el-form-item .el-date-editor {
   width: 250px
 }
 .mt-page .el-form .el-form-item .el-input {
   width: 170px
 }
</style>


 