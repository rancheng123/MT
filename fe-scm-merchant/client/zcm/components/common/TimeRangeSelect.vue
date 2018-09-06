<template>
  <el-form-item :label="label || '申请日期:'" :required="required">
    <el-date-picker
    v-model="selectDate"
    type="daterange"
    align="right"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="change"
    :picker-options="pickerOptions">
    </el-date-picker>
  </el-form-item>
</template>
<script>
/**
 * 日期范围选择组件
 * [startTimeName] 开始日期
 * [endTimeName]   结束日期
 */
import util from '../../common/util'

export default {
  props: ['label', 'startTimeName', 'endTimeName', 'required', 'placeholder'],
  data () {
    return {
      selectDate: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    change () {
      if (this.selectDate && this.selectDate.length === 2) {
        this.startTime = util.formatDate(this.selectDate[0], 'yy-MM-dd') + ' 00:00:00'
        this.endTime = util.formatDate(this.selectDate[1], 'yy-MM-dd') + ' 23:59:59'

        let propertyStart = this.startName || 'startTime'
        let propertyEnd = this.endName || 'endTime'

        this.$eventBus.$data[propertyStart] = this.startTime
        this.$eventBus.$data[propertyEnd] = this.endTime
      }
    }
  }
}
</script>
<style>

</style>


