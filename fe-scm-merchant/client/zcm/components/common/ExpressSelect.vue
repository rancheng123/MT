
<template>
  <el-form-item :label="label || '回收快递:'" :required="required">
    <el-select v-model="selectId" @change = "expressChange" clearable  :placeholder="placeholder || '请选择'">
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
  props: ['label', 'name', 'required', 'placeholder'],
  data () {
    return {
      selectId: '',
      list: [{
        id: null,
        name: '全部'
      }, {
        id: false,
        name: '未录入'
      }, {
        id: true,
        name: '已录入'
      }]
    }
  },
  methods: {
    expressChange () {
      let property = this.name || 'flowStatus'
      this.$eventBus.$data[property] = this.selectId
    }
  }
}
</script>
<style>
.mt-select .mt-select-label {
  font-size: 14px;
  color: #606266
}
</style>

