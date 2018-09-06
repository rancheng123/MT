
<template>
  <el-form-item :label="label" :required="required">
    <el-select v-model="selectId" @change = "selectChange" clearable  :placeholder="placeholder || '请选择'">
        <el-option
        v-for="item in list"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
    </el-select>
  </el-form-item>   
</template>
<script>

export default {
  props: ['label', 'name', 'required', 'placeholder', 'list'],
  data () {
    return {
      selectId: ''
    }
  },
  methods: {
    selectChange () {
    }
  }
}
</script>
<style lang="less" scoped>
.mt-select .mt-select-label {
  font-size: 14px;
  color: #606266
}
</style>

