<template>
  <div class="apply-box" v-loading="applyPreData.loading">
     <apply-header :headData="headData"></apply-header>
     <div class="apply-list">
        <el-form :inline="true"  class="demo-form-inline" label-width="140px" label-position="right">
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="门店: ">
               <el-input placeholder="名称／ID" :value="applyPreData.shopName +'/'+ shopId" disabled></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="设备信息: ">
               <el-input placeholder="类型／SN／型号" :value="applyPreData.deviceType + '/' + applyPreData.deviceSn + '/' + applyPreData.deviceMode" disabled></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="签单信息: ">
               <el-input placeholder="业务方／签单城市／BD 姓名(mis)" :value="applyPreData.bizName + '/' + applyPreData.locationName + '/' + applyPreData.bdInfo" disabled></el-input>
            </el-form-item>
          </div>
           <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="销售策略: ">
               <el-input disabled :value="applyPreData.saleType + '|' + applyPreData.payType"></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="绑定天数: ">
               <el-input disabled v-model="applyPreData.useDays"></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" :label="amountLabel">
               <el-input disabled v-model="amount"></el-input>
            </el-form-item>
          </div>
          <div class="apply-list-item" v-if="switchFlag">
            <el-form-item label="打款账号: " :required="true">
              <el-select v-model="bankAccountId">
                <el-option
                        v-for="item in bankAccountList"
                        :key="item.id"
                        :label="item.accountName + ' | ' + item.accountNo + ' | ' + item.accountTypeName"
                        :value="item.bankAccountId">
                        </el-option>
                </el-select>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="撤机原因: ">
              <el-select v-model="reasonType" clearable placeholder="请选择">
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
            <el-form-item :required="true" class="item-label" label="是否开过发票: ">
              <el-radio v-model="receiptCheck" label="1">是</el-radio>
              <el-radio v-model="receiptCheck" label="2">否</el-radio>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="是否退还发票原件: ">
              <el-radio v-model="receiptReturn" label="1">是</el-radio>
              <el-radio v-model="receiptReturn" label="2">否</el-radio>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="设备是否损坏: ">
              <el-radio v-model="broken" label="1">是</el-radio>
              <el-radio v-model="broken" label="2">否</el-radio>
            </el-form-item>
          </div>
           <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="撤机附件: ">
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
          <div class="apply-list-item" v-if="sceneCode">
            <el-form-item class="item-label" label="特殊业务: " :required="true">
               <el-select v-model="specialRecallType" clearable placeholder="请选择">
                  <el-option
                  v-for="item in specialRecallList"
                  :key="item.sceneCode"
                  :label="item.sceneDesc"
                  :value="item.sceneCode">
                  </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="apply-list-item">
            <shop-address-info :shopAddressInfo="shopInfo"></shop-address-info>
          </div>
          <div class="apply-list-item">
            <el-form-item :required="true" class="item-label" label="取回方式: ">
              <el-radio v-for="(item, index) in mailTypes" 
                :value="mailType" v-model="mailType"
                :key="index" 
                :label="item.mailCode">
                {{ item.mailDesc }}
              </el-radio>
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
import Upload from '../../components/common/Upload.vue'
import util from '../../common/util'
import ShopAddressInfo from '../../components/common/shopAddressInfo.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      amount: 0,
      applyPreInfo: '',
      switchFlag: false,
      shopId: '',
      bankAccountId: '',
      bankAccountList: [],
      askId: '',
      remark: '',
      specialRecallType: '',
      btnLoading: false,
      reasonType: '',
      applyType: '',
      deviceType: '',
      deviceSn: '',
      applySource: '2',
      receiptReturn: '2',
      receiptCheck: '2',
      sceneCode: '',
      broken: '2',
      action: '',
      mailType: '',
      shopInfo: {},
      photosTypes: ['photos'],
      photos: [],
      photos_list: [],
      amountLabel: '',
      headData: {
        title: '撤机申请',
        protocol: '下载解约协议',
        rule: '退机规则wiki',
        protocolUrl: 'http://s0.meituan.net/bs/tempfs/file/wukong/20180507.pdf',
        ruleUrl: 'https://wiki.sankuai.com/pages/viewpage.action?pageId=1425086968'
      }
    }
  },
  methods: {
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
      let shopAddrInfo = this.$eventBus.$data['shopInfo'] || {}

      if (self.askId && (!(/^[0-9]*$/.test(self.askId)) || +self.askId > 2147483647)) {
        this.$alert('ask问题编码只允许输入数字', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      if (self.applyTypeDisabled && !self.specialRecallType) {
        this.$alert('请选择特殊业务场景', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }

      axios.post('/zcm/bdsale/recallApply', {
        applySource: self.applySource,
        shopId: self.shopId,
        deviceType: self.deviceType,
        deviceSn: self.applyPreData.deviceSn,
        reason: self.reasonType,
        receiptCheck: self.receiptCheck,
        receiptReturn: self.receiptReturn,
        broken: self.broken,
        photos: self.photos,
        remark: self.remark,
        applyUserId: self.uid,
        askId: self.askId,
        mailType: self.mailType,
        sceneCode: self.specialRecallType,
        contactor: shopAddrInfo.contactor,
        contactPhone: shopAddrInfo.contactPhone,
        provinceId: shopAddrInfo.provinceId,
        cityId: shopAddrInfo.cityId,
        areaId: shopAddrInfo.areaId,
        detailAddress: shopAddrInfo.detailAddress,
        bankAccountId: self.bankAccountId
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
      specialRecallList: 'specialRecallList',
      uid: 'uid',
      mailTypes: 'mailTypes'
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
    this.deviceType = this.$route.query.deviceType
    this.sceneCode = +this.$route.query.sceneCode
    this.specialRecallType = this.sceneCode

    this.$store.dispatch('setTipShow', +this.sceneCode)
    this.action = util.getUploadPictrueAction()
    this.$store.dispatch('bankInfo', {
      shopId: this.shopId,
      deviceType: this.deviceType,
      applyType: this.applyType
    }).then(result => {
      if (result.data &&
          result.data.code === 200 &&
          result.data.data &&
          result.data.data.status === 200) {
        this.switchFlag = result.data.data.data.switchFlag
        this.bankAccountList = result.data.data.data.list
      }
    })

    this.$store.dispatch('getReasonList', {
      applyType: this.applyType,
      shopId: this.shopId,
      deviceSn: this.deviceSn,
      deviceType: this.deviceType
    })

    this.$store.dispatch('getApplyPreData', {
      applyType: this.applyType,
      shopId: this.shopId,
      deviceSn: this.deviceSn,
      deviceType: this.deviceType
    }).then(result => {
      this.amount = Math.abs(this.applyPreData.amount) + ''
      this.amountLabel = +this.applyPreData.amount > 0 ? '缴费金额：' : '退款金额：'
      if (this.applyPreData.refundApplyDetail) {
        this.askId = this.applyPreData.refundApplyDetail.askId
        this.remark = this.applyPreData.refundApplyDetail.remark
        this.reasonType = this.applyPreData.refundApplyDetail.reason
        this.receiptReturn = this.applyPreData.refundApplyDetail.receiptReturn + ''
        this.receiptCheck = this.applyPreData.refundApplyDetail.receiptCheck + ''
        this.broken = this.applyPreData.refundApplyDetail.broken + ''
        this.bankAccountId = this.applyPreData.refundApplyDetail.bankAccountId
        this.photos = this.applyPreData.refundApplyDetail.photos
        this.photos && this.photos.forEach(item => {
          this.photos_list.push({
            url: item
          })
        })
      }

      this.$store.dispatch('getMailType', {
        applyType: 1,
        trackingType: 2,
        shopId: this.applyPreData.shopId,
        deviceType: this.applyPreData.deviceTypeId,
        deviceMode: this.applyPreData.deviceMode
      }).then(() => {
        this.mailType = this.applyPreData.mailType
      })

      this.shopInfo = this.applyPreData.shopInfo
    })
    this.$store.dispatch('setTab', 'info')
    this.$store.dispatch('setBreadRequired', true)

    this.$store.dispatch('getSpecialRecallList', {
      applyType: 1
    })

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
 .apply-list .el-input {
   width: 250px;
 }
 .apply-list .el-select .el-input {
   width: 300px
 }
</style>


