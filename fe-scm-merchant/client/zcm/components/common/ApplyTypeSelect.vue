
<template>
  <el-form-item :label="label || '服务类型:'" :required="required">
    <el-select v-model="selectId" @change = "applyTypeChange" clearable  :placeholder="placeholder || '请选择'">
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
      selectId: 1,
      list: [{
        id: 1,
        name: '退机'
      }, {
        id: 2,
        name: '换机'
      }]
    }
  },
  methods: {
    applyTypeChange () {
      let property = this.name || 'applyType'
      this.$eventBus.$data[property] = this.selectId
      this.$eventBus.$emit('applyTypeChange', this.selectId)
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

