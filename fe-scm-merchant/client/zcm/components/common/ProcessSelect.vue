
<template>
  <el-form-item :label="label || '进度:'" :required="required">
    <el-select v-model="process" @change="processChange" clearable  :placeholder="placeholder || '请选择'">
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
      process: '',
      list: [],
      processList1: [{
        id: 1,
        name: '申请已提交'
      }, {
        id: 2,
        name: '申请已通过'
      }, {
        id: 4,
        name: '申请被驳回'
      }, {
        id: 8,
        name: '等待旧机入库'
      }, {
        id: 16,
        name: '等待退款/缴费'
      }, {
        id: 32,
        name: '已退款缴费'
      }],
      processList2: [{
        id: 1,
        name: '申请已提交'
      }, {
        id: 2,
        name: '申请已通过'
      }, {
        id: 4,
        name: '申请被驳回'
      }, {
        id: 8,
        name: '等待出库'
      }, {
        id: 16,
        name: '等待换绑'
      }, {
        id: 32,
        name: '等待旧机入库'
      }, {
        id: 64,
        name: '原机已入库'
      }],
      serviceTypeList: [{
        type: 1,
        name: '退机'
      }, {
        type: 2,
        name: '换机'
      }],
      trackStatusList: [{
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
    processChange () {
      let property = this.name || 'process'
      this.$eventBus.$data[property] = this.process
    }
  },
  mounted () {
    this.list = this.processList1

    this.$eventBus.$on('applyTypeChange', selectId => {
      if (+selectId === 1) {
        this.list = this.processList1
      } else {
        this.list = this.processList2
      }
    })
  }
}
</script>
<style>
.mt-select .mt-select-label {
  font-size: 14px;
  color: #606266
}
</style>

