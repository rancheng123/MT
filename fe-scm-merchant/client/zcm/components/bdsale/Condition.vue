<template>
    <el-form :inline="true" class="demo-form-inline" label-width="75px">
       <div class="form-inline-item">
         <div>
            <el-form-item label="门店ID: ">
                <el-input placeholder="请输入门店ID" v-model="shopId"></el-input>
            </el-form-item>
            <el-form-item label="S/N号: ">
                <el-input placeholder="请输入S/N号" v-model="deviceSn"></el-input>
            </el-form-item>
            <el-form-item label="单号: ">
                <el-input placeholder="请输入单号" v-model="applyIds"></el-input>
            </el-form-item>
            <!-- <el-form-item label="业务方:">
              <el-select v-model="applyType" clearable placeholder="请选择" @change="applyTypeChange">
                  <el-option
                  v-for="item in serviceTypeList"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织:">
              <el-select v-model="applyType" clearable placeholder="请选择" @change="applyTypeChange">
                  <el-option
                  v-for="item in serviceTypeList"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                  </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="服务类型:">
              <el-select v-model="applyType" clearable placeholder="请选择" @change="applyTypeChange">
                  <el-option
                  v-for="item in serviceTypeList"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type">
                  </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form-inline-item">
            <el-form-item label="进度:">
              <el-select v-model="process" clearable placeholder="请选择">
                  <el-option
                  v-for="item in processList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请日期:">
              <el-date-picker
                v-model="selectDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="selectDateChange"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="快递单号: ">
                <el-input placeholder="请输入快递单号" v-model="mailno"></el-input>
            </el-form-item>
            <el-form-item label="配送方式:">
              <el-select v-model="postMailType" clearable placeholder="请选择">
                  <el-option
                  v-for="item in mailTypes"
                  :key="item.mailCode"
                  :label="item.mailDesc"
                  :value="item.mailCode">
                  </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="取回方式:">
              <el-select v-model="postMailType" clearable placeholder="请选择">
                  <el-option
                  v-for="item in mailTypes"
                  :key="item.mailCode"
                  :label="item.mailDesc"
                  :value="item.mailCode">
                  </el-option>
              </el-select>
            </el-form-item> -->
             <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
               <el-button @click="exportExcel" icon="el-icon-printer" type="warning" plain>导出</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
/* eslint-disable */

import util from '../../common/util'
import { mapGetters } from 'vuex'
export default {
  name: 'condition',
  props: ['provinceList'],
  data () {
    return {
      shopId: '',
      deviceSn: '',
      applyIds: '',
      startTime: '',
      endTime: '',
      applyType: 1,
      flowStatus: '',
      selectDate: '',
      process: '',
      mailno: '',
      postMailType: '',
      distributionList: [{
        id: 0,
        name: '请选择'
      }, {
        id: 1,
        name: 'BD上门'
      }, {
        id: 2,
        name: '仓库邮寄'
      }],
      processList: [],
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
        name: '等待退款\缴费'
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
      }],
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
  computed: {
    ...mapGetters({
      searchCondition: 'searchCondition',
      mailTypes: 'mailTypes'
    })
  },
  methods: {
    applyTypeChange () {
      if (this.applyType == 2) {
        this.processList = this.processList2
      } else {
        this.processList = this.processList1
      }
    },
    exportExcel () {
      let self = this
      this.condition = this.getSearchCondition()
      window.location.href = `${util.getHostMapping('SALE')}/japi/device/audit/export/detail/v1?${util.paramSerialize(this.condition)}`
    },
    getSearchCondition () {
      let self = this
      return {
        shopId: self.shopId,
        deviceSn: self.deviceSn,
        applyIds: self.applyIds,
        applyType: self.applyType,
        process: self.process,
        flowStatus: self.flowStatus,
        startTime: self.startTime,
        endTime: self.endTime,
        mailno: self.mailno,
        postMailType: self.postMailType
      }
    },
    selectDateChange () {
      if (!this.selectDate) {
        this.startTime = ''
        this.endTime = ''
      }
    },
    onSearch () {
      let self = this
      
      if (self.selectDate && self.selectDate.length === 2) {
        self.startTime = util.formatDate(self.selectDate[0], 'yy-MM-dd') + ' 00:00:00'
        self.endTime = util.formatDate(self.selectDate[1], 'yy-MM-dd') + ' 23:59:59'
      }

      this.condition = this.getSearchCondition()
      this.condition = Object.assign(self.searchCondition, this.condition)
      this.$store.dispatch('setSearchCondition', this.condition)
      this.$emit('conditionSearch')
    }
  },
  mounted () {
    this.processList = this.processList1
    this.$store.dispatch('getMailType', {
      applyType: 2,
      trackingType: 1
    })
  }
}
</script>

<style lang="css">
 .list-condition {
    border: 1px solid #EBEEF5;
    padding: 20px 0 0 20px;
    clear: both;
    position: relative;
    overflow: hidden;
    background: #fff;
  }
 .list-condition .el-form-item {
   float: left;
   margin-bottom: 15px;
 }
 .list-condition .el-input {
    width: 170px
 }
 .list-condition .el-button {
   margin-left: 10px
 }
 .list-condition .el-date-editor {
   width: 250px
 }
</style>

