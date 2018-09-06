<template>
<div>
  <el-collapse-transition>
  <el-table
    v-loading="deviceAuditInfo.pageLoading"
    :data="deviceAuditInfo.deviceAuditList"
    border
    stripe
    style="width: 100%">
    <el-table-column
      label="单号"
      width="150">
      <template slot-scope="scope">
        <el-tag type="info">{{ scope.row.applyId }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="applyTypeDesc"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="processDesc"
      label="进度"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopInfo"
      label="门店"
      width="200">
    </el-table-column>
     <el-table-column
      label="设备"
      width="150">
      <template slot-scope="scope">  
        <el-tag size="medium">{{ scope.row.deviceTypeDesc }}</el-tag>
      </template>
    </el-table-column>
     <el-table-column
      prop="deviceMode"
      label="型号"
      width="150">
    </el-table-column>
     <el-table-column
      prop="deviceSn"
      label="SN"
      width="150">
    </el-table-column>
     <el-table-column
      prop="bizName"
      label="业务方"
      width="120">
    </el-table-column>
    <el-table-column
      prop="cityName"
      label="组织"
      width="100">
    </el-table-column>
    <el-table-column
      prop="postMailType"
      label="配送方式"
      width="100">
    </el-table-column>
    <el-table-column
      prop="postTrackNo"
      label="寄出快递单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="recycleTrackNo"
      label="回收快递单号"
      width="120">
    </el-table-column>
    <!-- <el-table-column
      prop="postMailType"
      label="取回方式"
      width="100">
    </el-table-column> -->
    <el-table-column
      prop="applyTime"
      label="申请日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="applyUserInfo"
      label="申请人"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope" v-if="deviceAuditInfo.deviceAuditList.length">
        <el-button icon="el-icon-view" @click="detail(scope.row)" type="text" size="small">查看</el-button>
        <el-button v-if="scope.row.status === 3" icon="el-icon-edit" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button v-if="(scope.row.process === 16 || scope.row.process === 8) && scope.row.applyType === 2" icon="el-icon-sort" @click="exchange(scope.row)" type="text" size="small">换绑</el-button>
        <!-- <el-button v-if="scope.row.enableRecycleTrackingNo === true" icon="el-icon-delete" @click="recovery(scope.row)" type="text" size="small">回收快递</el-button> -->
        <!-- <el-button icon="el-icon-sold-out" @click="warehouse(scope.row)" type="text" size="small">入库</el-button> -->
        <el-button icon="el-icon-goods" v-if="scope.row.process === 8 && scope.row.applyType == 2" @click="deliverGoods(scope.row)" type="text" size="small">发货</el-button>
        <!-- <el-button icon="el-icon-goods" v-if="scope.row.process === 8 && scope.row.applyType == 2" @click="deliverGoods(scope.row)" type="text" size="small">重新发货</el-button> -->
      </template>
      </el-table-column>
    </el-table>
  </el-collapse-transition>
    <bind-change :bindChangePop="bindChangePop" @popClose="popClose" :deviceInfo="deviceInfo"></bind-change>
    <recovery-express :recoveryExpressPop="recoveryExpressPop" @popClose="popClose" :deviceInfo="deviceInfo"></recovery-express>
    <deliver-Goods :deliverGoodsPop="deliverGoodsPop" @popClose="popClose" :deviceInfo="deviceInfo"></deliver-Goods>
    <warehouse-dialog :warehousePop="warehousePop" @popClose="popClose" :deviceInfo="deviceInfo"></warehouse-dialog>
</div>
</template>
<script>

import { mapGetters } from 'vuex'
import BindChange from './BindChange.vue'
import RecoveryExpress from './RecoveryExpress.vue'
import DeliverGoods from './DeliverGoods.vue'
import WarehouseDialog from './WarehouseDialog.vue'

export default {
  data () {
    return {
      zcm_active_index: '',
      bindChangePop: false,
      recoveryExpressPop: false,
      warehousePop: false,
      deliverGoodsPop: false,
      deviceInfo: {}
    }
  },
  computed: {
    ...mapGetters({
      deviceAuditInfo: 'deviceAuditInfo'
    })
  },
  components: {
    bindChange: BindChange,
    recoveryExpress: RecoveryExpress,
    deliverGoods: DeliverGoods,
    warehouseDialog: WarehouseDialog
  },
  methods: {
    detail (row) {
      let self = this

      if (row.applyType === 2) {
        this.$router.push({
          path: '/zcm/bdsale/device/exchange/info',
          query: {
            deviceType: row.deviceType,
            shopId: row.shopId,
            applyType: row.applyType,
            applyId: row.applyId,
            deviceSn: row.deviceSn,
            zcm_active_index: self.zcm_active_index,
            from: 'view'
          }
        })
      } else {
        this.$router.push({
          path: '/zcm/bdsale/device/recall/info',
          query: {
            deviceType: row.deviceType,
            shopId: row.shopId,
            applyId: row.applyId,
            applyType: row.applyType,
            deviceSn: row.deviceSn,
            sceneCode: row.sceneCode,
            zcm_active_index: self.zcm_active_index,
            from: 'view'
          }
        })
      }
    },
    edit (row) {
      let self = this
      if (row.applyType === 2) {
        this.$router.push({
          path: '/zcm/bdsale/device/exchangeApply',
          query: {
            deviceType: row.deviceType,
            shopId: row.shopId,
            applyType: row.applyType,
            deviceSn: row.deviceSn,
            zcm_active_index: self.zcm_active_index
          }
        })
      } else {
        this.$router.push({
          path: '/zcm/bdsale/device/recallApply',
          query: {
            deviceType: row.deviceType,
            shopId: row.shopId,
            applyType: row.applyType,
            deviceSn: row.deviceSn,
            sceneCode: row.sceneCode,
            zcm_active_index: self.zcm_active_index
          }
        })
      }
    },
    /**
     * 换绑
     */
    exchange (row) {
      this.deviceInfo = row
      this.bindChangePop = true
    },
    /**
     * 关闭弹窗
     */
    popClose () {
      this.bindChangePop = false
      this.recoveryExpressPop = false
      this.deliverGoodsPop = false
      this.warehousePop = false
    },
    /**
     * 回收快递
     */
    recovery (row) {
      this.deviceInfo = row
      this.recoveryExpressPop = true
    },
    /**
     * 入库
     */
    warehouse (row) {
      this.deviceInfo = row
      this.warehousePop = true
    },
    /**
     * 发货
     */
    deliverGoods (row) {
      this.deviceInfo = row
      this.deliverGoodsPop = true
    }
  },
  mounted () {
    this.zcm_active_index = this.$route.query.zcm_active_index
  }
}
</script>
<style lang="less">
 .el-table {
   .warning-row {
     background: #f6f7f5;
     transition: all .3s;
   }
 }
 .el-button {
   cursor: pointer;
 }
</style>


