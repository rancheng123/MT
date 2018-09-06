<template>
  <el-dialog 
   :visible="deliverGoodsPop"
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
            <legend>去向信息</legend>
            <div class='form-item-info'>
                <el-form-item label="去向业务方: ">
                  <span>{{toBiz}}</span>
                </el-form-item>
                <el-form-item label="去向组织: ">
                  <span>{{toLocation}}</span>
                </el-form-item>
                <el-form-item label="员工姓名: ">
                  <span>{{tobd}}</span>
                </el-form-item>
            </div>
            <div class='form-item-info'>
             <el-form-item label="商户联系人: ">
                <span>{{contactor}}</span>
             </el-form-item>
            </div>
            <div class='form-item-info'>
               <el-form-item label="商户联系电话: ">
                  <span>{{contactPhone}}</span>
                </el-form-item>
            </div>
            <div class='form-item-info'>
              <el-form-item label="详细地址: ">
                <span>{{address}}</span>
              </el-form-item>
            </div>
          </fieldset>
        </div>
        <div class="form-item">
          <fieldset>
            <legend>发货信息</legend>
            <div class='form-item-info'>
                <el-form-item label="设备信息: ">
                  <span>{{deviceType + '/' + deviceMode}}</span>
                </el-form-item>
            </div>
            <div class='form-item-info'>
              <el-form-item label="SN码: ">
                <el-input placeholder="请输入SN码" v-model="deviceSn"></el-input>
              </el-form-item>
            </div>
            <div class="form-item-info">
               <el-form-item :required="true" class="item-label" label="配送方式: ">
                 <el-radio v-for="(item, index) in mailTypes" :key="index" :value="mailType" v-model="mailType" :label="item.mailCode">{{item.mailDesc}}</el-radio>
               </el-form-item>
            </div>
            <div class='form-item-info' v-if="mailType === 4">
               <express></express>
            </div>
            <div class='form-item-info' v-if="mailType === 4">
              <el-form-item label="快递单号: ">
                <el-input placeholder="请输入快递单号" v-model="mailno"></el-input>
              </el-form-item>
            </div>
          </fieldset>
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
import Express from '../common/Express.vue'

export default {
  props: ['deliverGoodsPop', 'deviceInfo'],
  data () {
    return {
      loading: false,
      toBiz: '',
      toLocation: '',
      tobd: '',
      contactor: '',
      contactPhone: '',
      address: '',
      deviceType: '',
      deviceMode: '',
      company: '',
      deviceSn: '',
      mailType: '1',
      mailno: '',
      shopInfo: {}
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
    express: Express
  },
  watch: {
    deliverGoodsPop: function () {
      if (this.deliverGoodsPop) {
        this.$store.dispatch('deliverGoodsPreData', {
          applyId: this.deviceInfo.applyId
        }).then(result => {
          if (result.data &&
              result.data.data &&
              result.data.data.status === 200) {
            let obj = result.data.data.data
            this.toBiz = obj.toBiz
            this.toLocation = obj.toLocation
            this.tobd = obj.tobd
            this.contactor = obj.contactor
            this.contactPhone = obj.contactPhone
            this.address = obj.address
            this.deviceType = obj.deviceType
            this.deviceMode = obj.deviceMode
            this.company = this.$eventBus.$data['company']
            this.mailno = obj.mailno
          } else {
            this.$alert('发货信息查询失败', '提示')
          }
        })
      }

      this.$store.dispatch('getMailType', {
        applyType: 2,
        trackingType: 1,
        shopId: this.deviceInfo.shopId,
        deviceType: this.deviceInfo.deviceType,
        deviceMode: this.deviceInfo.deviceMode
      })
    }
  },
  methods: {
    close () {
      this.$emit('popClose')
    },
    cancel () {
      this.close()
    },
    next () {
      let self = this
      if (self.mailno && (!(/^[0-9a-zA-Z]+$/.test(self.mailno)))) {
        this.$alert('快递单号只允许输入数字和字母', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      self.loading = true
      this.$store.dispatch('postDevice', {
        applyId: this.deviceInfo.applyId,
        deviceSn: self.deviceSn,
        deviceMode: self.deviceMode,
        mailno: self.mailno,
        mailType: self.mailType,
        company: this.$eventBus.$data['company'],
        operator: self.uid
      }).then(result => {
        self.loading = false
        if (result.data &&
            result.data.code === 200 &&
            result.data.data.status === 200) {
          this.$alert('发货成功！', '提示', {
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
     margin: 10px 0px 0px 0px;
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
   margin-bottom: 5px
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

