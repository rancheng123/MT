<template>
  <el-dialog 
   :visible="bindChangePop"
   width="55%"
   @close="close">
     <el-form :inline="true" class="apply-pop" label-width="120px">
        <div class="apply-user">
            <div class="user-item">
                <label>受理人：</label>
                <label>{{umis}}</label>
            </div>
        </div>
        <div class="form-item form-item-old">
          <fieldset>
            <legend>旧设备信息</legend>
            <div class='form-item-info'>
                <el-form-item label="类型: ">
                  <span>{{oldDeviceType}}</span>
                </el-form-item>
                <el-form-item label="型号: ">
                  <span>{{oldDeviceMode}}</span>
                </el-form-item>
            </div>
            <div class='form-item-info'>
              <el-form-item label="SN码: ">
                <span>{{oldDeviceSn}}</span>
              </el-form-item>
            </div>
          </fieldset>
        </div>
        <div class="form-item">
          <fieldset>
            <legend>新设备信息</legend>
            <div class='form-item-info'>
                <el-form-item label="类型: ">
                  <span>{{newDeviceType}}</span>
                </el-form-item>
                <el-form-item label="型号: ">
                  <span>{{newDeviceMode}}</span>
                </el-form-item>
            </div>
            <div class='form-item-info'>
              <el-form-item label="SN码: ">
                <el-input placeholder="请输入SN码" v-model="newDeviceSn"></el-input>
              </el-form-item>
            </div>
          </fieldset>
        </div>
        <div class="form-item">
          <fieldset>
            <legend>取回方式</legend>
             <div class='form-item-info'>
              <el-form-item :required="true" class="item-label" label="取回方式: ">
                <el-radio @change='mailTypeChange' v-for="(item, index) in mailTypes" :value="mailType" :key="index" v-model="mailType" :label="item.mailCode">{{item.mailDesc}}</el-radio>
              </el-form-item>
             </div>
             <div class='form-item-info' v-if="mailType === 3">
              <express :required="true"></express>
             </div>
             <div class='form-item-info' v-if="mailType === 3">
              <el-form-item label="快递单号: ">
                <el-input placeholder="请输入快递单号" v-model="mailno"></el-input>
              </el-form-item>
             </div>
          </fieldset>

        </div>
        <div class="form-item" v-if="false">
          <shop-address-info :shopAddressInfo="shopInfo"></shop-address-info>
        </div>
       <div class="form-item form-btn">
         <el-button :loading="loading" @click="next" type="primary">提交</el-button>
         <el-button @click="cancel" plain>取消</el-button>
       </div>
     </el-form>
  </el-dialog>
</template>
<script>

import { mapGetters } from 'vuex'
import ShopAddressInfo from '../common/shopAddressInfo.vue'
import Express from '../common/Express.vue'

export default {
  props: ['bindChangePop', 'deviceInfo'],
  data () {
    return {
      loading: false,
      newDeviceMode: '',
      newDeviceSn: '',
      newDeviceType: '',
      oldDeviceMode: '',
      oldDeviceSn: '',
      oldDeviceType: '',
      mailType: '',
      shopInfo: {},
      mailno: '',
      expressNeed: false
    }
  },
  computed: {
    ...mapGetters({
      umis: 'umis',
      uid: 'uid',
      mailTypes: 'mailTypes'
    })
  },
  components: {
    shopAddressInfo: ShopAddressInfo,
    express: Express
  },
  watch: {
    bindChangePop: function () {
      this.$store.dispatch('getMailType', {
        applyType: 2,
        trackingType: 2,
        shopId: this.deviceInfo.shopId,
        deviceType: this.deviceInfo.deviceType,
        deviceMode: this.deviceInfo.deviceMode
      })
      if (this.bindChangePop) {
        this.$store.dispatch('bindChangePreData', {
          applyId: this.deviceInfo.applyId
        }).then(result => {
          if (result.data &&
              result.data.data &&
              result.data.data.status === 200) {
            let obj = result.data.data.data
            this.newDeviceMode = obj.newDeviceMode
            this.newDeviceSn = obj.newDeviceSn
            this.newDeviceType = obj.newDeviceType
            this.oldDeviceMode = obj.oldDeviceMode
            this.oldDeviceSn = obj.oldDeviceSn
            this.oldDeviceType = obj.oldDeviceType
            this.shopInfo = obj.shopInfo
          }
        })
      }
    }
  },
  methods: {
    close () {
      this.$emit('popClose')
    },
    cancel () {
      this.close()
    },
    mailTypeChange () {
      if (+this.mailType === 3) {
        this.expressNeed = true
      } else {
        this.expressNeed = false
      }
    },
    next () {
      let self = this
      let shopAddrInfo = this.$eventBus.$data['shopInfo'] || {}

      if (self.mailno && (!(/^[0-9a-zA-Z]+$/.test(self.mailno)))) {
        this.$alert('快递单号只允许输入数字和字母', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }

      self.loading = true

      this.$store.dispatch('bindChange', {
        applyId: this.deviceInfo.applyId,
        newDeviceSn: self.newDeviceSn,
        newDeviceMode: self.newDeviceMode,
        mailType: self.mailType,
        contactor: shopAddrInfo.contactor,
        contactPhone: shopAddrInfo.contactPhone,
        provinceId: shopAddrInfo.provinceId,
        cityId: shopAddrInfo.cityId,
        areaId: shopAddrInfo.areaId,
        detailAddress: shopAddrInfo.detailAddress,
        company: self.$eventBus.$data['company'],
        mailno: self.mailno,
        operator: self.uid
      }).then(result => {
        self.loading = false
        if (result.data &&
            result.data.code === 200 &&
            result.data.data.status === 200) {
          this.$alert('换绑成功！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              self.close()
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
  }
}
</script>
<style>
 .apply-pop .apply-user {
    display: -webkit-box;
    height: 30px;
    border-bottom: 1px solid #E4E7ED;
 }
 .apply-pop .apply-user .user-item {
   -webkit-box-flex: 1;
   text-align: left;
 }
 .el-dialog__body {
    padding: 0px 20px 0px 20px;
    position: relative;
    overflow: hidden;
 }
 .apply-pop .form-item {
     position: relative;
     overflow: hidden;
 }
 .apply-pop .form-item fieldset {
   text-align: left;
   border: solid 1px #E4E7ED;
 }
 .apply-pop .form-item-old fieldset {
    border: solid 2px #cdcfd2;
 }
 .apply-pop .form-item .form-item-info {
   position: relative;
   overflow: hidden;
 }
 .apply-pop .el-form-item {
   margin: 0px;
   float: left;
 }
 .apply-pop .el-input {
   width: 250px
 }
 .apply-pop .form-btn {
    border-top: solid 1px #E4E7ED;
    padding: 10px 0px;
    text-align: right;
    padding-right: 5%;
 }
</style>

