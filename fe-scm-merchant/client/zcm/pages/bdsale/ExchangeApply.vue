<template>
  <div class="apply-box" v-loading="applyPreData.loading">
     <apply-header :headData="headData"></apply-header>
     <div class="apply-list">
        <el-form :inline="true"  class="demo-form-inline" label-width="140px" label-position="right">
          <div class="apply-list-item">
            <el-form-item class="item-label" label="门店: ">
               <el-input placeholder="名称／ID" :value="applyPreData.shopName +'/'+ shopId" disabled></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item class="item-label" label="设备信息: ">
               <el-input placeholder="类型／SN／型号" :value="applyPreData.deviceType + '/' + applyPreData.deviceSn + '/' + applyPreData.deviceMode" disabled></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item class="item-label" label="签单信息: ">
               <el-input placeholder="业务方／签单城市／BD 姓名(mis)" :value="applyPreData.bizName + '/' + applyPreData.locationName + '/' + applyPreData.bdInfo" disabled></el-input>
            </el-form-item>
          </div>
           <div class="apply-list-item">
            <el-form-item class="item-label" label="销售策略: ">
               <el-input disabled :value="applyPreData.saleType + '|' + applyPreData.payType"></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item class="item-label" label="绑定天数: ">
               <el-input disabled v-model="applyPreData.useDays"></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="换机原因: ">
              <el-select @change="reasonTypeChange" v-model="reasonType" clearable placeholder="请选择">
                  <el-option
                  v-for="item in reasonList"
                  :key="item.reasonType"
                  :label="item.reasonDesc"
                  :value="item.reasonType">
                  </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="故障时间: ">
              <el-select v-model="occurProblemTime" clearable placeholder="请选择">
                 <el-option
                  v-for="item in problemTime"
                  :key="item.problemType"
                  :label="item.problemName"
                  :value="item.problemType">
                  </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="apply-list-item" v-if="(deviceType === 1 || deviceType === 7) && secondReasonList.length">
            <el-form-item :required="true" class="item-label" label="详细故障描述: ">
               <el-checkbox-group v-model="checkList">
                 <div class="checkbox-item" v-for="(item, index) in secondReasonList" :key="index">
                   <el-checkbox :label="item.reasonDesc"></el-checkbox>
                </div>
               </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="apply-list-item" v-if="deviceType === 4 || deviceType === 6">
            <el-form-item :required="true" class="item-label" label="故障位置描述: ">
               <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="brokenPoint">
                </el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="商家承担维修费: ">
              <el-radio v-model="repairCostResp" label="1">是</el-radio>
              <el-radio v-model="repairCostResp" label="2">否</el-radio>
            </el-form-item>
          </div>
           <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="换机附件: ">
               <upload 
                :action="action" 
                :type="photosTypes[0]"
                :photoLimit="2" 
                :list="photos_list"  
                @onUploadSuccess="handleUploadSuccess"
                @onPhotosRemove="handlePhotoRemove">
                </upload>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item class="item-label" label="备注: ">
               <el-input v-model="remark" placeholder="额外需要说明的内容，原因为其他时必填"></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item class="item-label" label="ask问题编号: ">
               <el-input v-model="askId" placeholder="如有ask问题编单，请填写"></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <shop-address-info :shopAddressInfo="shopAddressInfo"></shop-address-info>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="配送方式: ">
               <el-radio v-for="(item, index) in mailTypes" :key="index" :value="mailType" v-model="mailType" :label="item.mailCode">{{item.mailDesc}}</el-radio>
            </el-form-item>
          </div>
          <div class="apply-list-item" v-if="headData">
            <el-button :loading="btnLoading" @click="onSubmit" type="primary">提交申请</el-button>
          </div>
        </el-form>
     </div>
  </div>
</template>
<script>

import ApplyHeader from '../../components/bdsale/ApplyHeader.vue'
import ShopAddressInfo from '../../components/common/shopAddressInfo.vue'
import Upload from '../../components/common/Upload.vue'
import util from '../../common/util'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      shopId: '',
      askId: '',
      remark: '',
      btnLoading: false,
      brokenPoint: '',
      deviceSn: '',
      reasonType: '',
      deviceType: '',
      applyType: '',
      applySource: '2',
      repairCostResp: '1',
      checkList: [],
      contactor: '',
      contactPhone: '',
      occurProblemTime: '',
      secondReasonList: [],
      noEdit: false,
      shopAddr: '',
      broken: '1',
      action: '',
      shopAddressInfo: {},
      mailType: '',
      photosTypes: ['photos'],
      photos: [],
      photos_list: [],
      headData: {
        title: '换机申请',
        protocol: '下载解约协议',
        rule: '退机规则wiki',
        protocolUrl: '',
        ruleUrl: ''
      }
    }
  },
  methods: {
    reasonTypeChange () {
      this.secondReasonList = this.reasonList.find(item => item.reasonType === this.reasonType).secondReason
    },
    handlePhotoRemove (result) {
      let type = result.type + '_list'
      if (result) {
        this[type] = util.removePhotoItem(this[type], {
          url: result.url,
          uid: result.uid,
          status: result.status
        })
        this[result.type] = util.removePhotoItem(this[result.type], result.url)
      }
    },
    handleUploadSuccess (result) {
      let type = result.type + '_list'
      if (result) {
        this[type].push({
          url: result.serverPath
        })
        this[result.type].push(result.serverPath)
      }
    },
    onSubmit () {
      let self = this
      let secondReason = []
      let shopAddrInfo = this.$eventBus.$data['shopInfo'] || {}

      this.checkList.forEach(item => {
        this.secondReasonList.forEach(entry => {
          if (item === entry.reasonDesc) {
            secondReason.push(entry.reasonType)
          }
        })
      })

      if (self.askId && (!(/^[0-9]*$/.test(self.askId)) || +self.askId > 2147483647)) {
        this.$alert('ask问题编码只允许输入数字', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      self.btnLoading = true
      axios.post('/zcm/bdsale/exchangeApply', {
        applySource: self.applySource,
        shopId: self.shopId,
        brokenPoint: self.brokenPoint,
        deviceType: self.deviceType,
        deviceSn: self.applyPreData.deviceSn,
        reason: self.reasonType,
        repairCostResp: self.repairCostResp,
        broken: self.broken,
        contactor: shopAddrInfo.contactor,
        contactPhone: shopAddrInfo.contactPhone,
        photos: self.photos,
        remark: self.remark,
        applyUserId: self.uid,
        askId: self.askId,
        mailType: self.mailType,
        provinceId: shopAddrInfo.provinceId,
        cityId: shopAddrInfo.cityId,
        areaId: shopAddrInfo.areaId,
        detailAddress: shopAddrInfo.detailAddress,
        shopAddr: self.applyPreData.shopAddr,
        secondReason: secondReason,
        occurProblemTime: self.occurProblemTime
      }).then(result => {
        self.btnLoading = false
        if (result.data &&
            result.data.code === 200 &&
            result.data.data.status === 200) {
          self.$router.push({
            path: '/zcm/bdsale/list',
            query: {
              zcm_active_index: 101
            }
          })
        } else {
          let errorMsg = ''
          if (result.data.code !== 200) {
            errorMsg = result.data.message
          } else {
            errorMsg = result.data.data.msg
          }
          this.$alert(errorMsg, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      reasonList: 'reasonList',
      applyPreData: 'applyPreData',
      problemTime: 'problemTime',
      mailTypes: 'mailTypes',
      uid: 'uid'
    })
  },
  components: {
    applyHeader: ApplyHeader,
    upload: Upload,
    shopAddressInfo: ShopAddressInfo
  },
  watch: {
    applyPreData: function (newValue) {
      if (newValue.loadMsg) {
        this.$alert(newValue.loadMsg, '提示', {
          confirmButtonText: '确定'
        })
      }
    }
  },
  mounted () {
    this.applyType = this.$route.query.applyType
    this.shopId = this.$route.query.shopId
    this.deviceSn = this.$route.query.deviceSn
    this.deviceType = +this.$route.query.deviceType
    this.applyId = this.$route.query.applyId

    this.action = util.getUploadPictrueAction()
    this.$store.dispatch('getReasonList', {
      applyType: this.applyType,
      shopId: this.shopId,
      deviceSn: this.deviceSn,
      deviceType: this.deviceType
    })

    this.$store.dispatch('setTipShow', false)
    this.$store.dispatch('getApplyPreData', {
      applyType: this.applyType,
      shopId: this.shopId,
      deviceSn: this.deviceSn,
      deviceType: this.deviceType
    }).then(result => {
      if (this.applyPreData.exchangeApplyDetail) {
        this.contactor = this.applyPreData.exchangeApplyDetail.contactor
        this.contactPhone = this.applyPreData.exchangeApplyDetail.contactPhone
        this.repairCostResp = this.applyPreData.exchangeApplyDetail.repairCostResp + ''
        this.askId = this.applyPreData.exchangeApplyDetail.askId
        this.remark = this.applyPreData.exchangeApplyDetail.remark
        this.reasonType = this.applyPreData.exchangeApplyDetail.reason
        this.brokenPoint = this.applyPreData.exchangeApplyDetail.brokenPoint
        this.reasonTypeChange()
        this.secondReasons = this.applyPreData.exchangeApplyDetail.secondReasons
        this.occurProblemTime = +this.applyPreData.exchangeApplyDetail.occurProblemTime
        if (this.secondReasons && this.secondReasons.length) {
          this.secondReasons.forEach(item => {
            this.secondReasonList.forEach(entry => {
              if (item === entry.reasonType) {
                this.checkList.push(entry.reasonDesc)
              }
            })
          })
        }

        this.photos = this.applyPreData.exchangeApplyDetail.photos
        this.photos && this.photos.forEach(item => {
          this.photos_list.push({
            url: item
          })
        })
      }

      if (this.applyPreData.shopInfo) {
        this.shopAddressInfo = this.applyPreData.shopInfo
      }

      this.$store.dispatch('getMailType', {
        applyType: 2,
        trackingType: 1,
        shopId: this.applyPreData.shopId,
        deviceType: this.applyPreData.deviceTypeId,
        deviceMode: this.applyPreData.deviceMode
      }).then(() => {
        this.mailType = this.applyPreData.mailType
      })
    })

    this.$store.dispatch('setBreadRequired', true)

    this.$store.dispatch('getProblemTime')
    this.from = this.$route.query.from
    if (this.from === 'view') {
      this.headData = ''
    }
  }
}
</script>
<style>
 .apply-list {
   background: #fff;
   margin-top: 5px
 }
 .apply-list .apply-list-item {
   position: relative;
   overflow: hidden;
   clear: both;
   border-bottom: 1px #E4E7ED solid;
   padding: 10px 0;
   margin: 0 10px;
 }
 .apply-list .el-form-item {
   float: left;
   margin-bottom: 0
 }
 .apply-list textarea {
   width: 300px;
 }
 .apply-list .el-input {
   width: 250px;
 }
 .apply-list .checkbox-item {
   position: relative;
   overflow: hidden;
   text-align: left;
 }
</style>


