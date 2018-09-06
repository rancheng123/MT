<template>
  <el-dialog 
   :visible="saleApplyPop"
   @close="close">
     <el-form :inline="true" class="sale-apply apply-pop" label-width="100px">
        <div class="apply-user">
            <div class="user-item">
                <label>受理人：</label>
                <label>{{umis}}</label>
            </div>
        </div>
        <div class="form-item">
         <el-form-item :required="true" label="门店ID: ">
           <el-input placeholder="请输入门店ID" v-model="shopId"></el-input>
         </el-form-item>
       </div>
        <div class="form-item">
          <el-form-item label="设备类型: " :required="true">
            <el-select  v-model="deviceType" clearable placeholder="请选择">
                <el-option
                v-for="item in deviceTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </div>
       <div class="form-item">
         <el-form-item :required="true" label="设备SN: ">
           <el-input placeholder="请输入设备SN" v-model="deviceSn"></el-input>
         </el-form-item>
       </div>
       <div class="form-item" v-if="uRole && uRole.split(',').some(item => item === '运营售后特殊申请')">
          <el-form-item label="特殊撤机:">
             <el-checkbox v-model="specialRecall" @change="specialRecallChange"></el-checkbox>
          </el-form-item>
       </div>
       <div class="form-item">
        <el-form-item label="服务:" :required="true">
          <el-select v-model="applyType" :disabled="applyTypeDisabled" clearable placeholder="请选择">
            <el-option
            v-for="item in serviceTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
       </div>
       <div class="form-item form-btn">
         <el-button :loading="loading" @click="next" type="primary">下一步</el-button>
         <el-button @click="cancel" plain>取消</el-button>
       </div>
     </el-form>
  </el-dialog>
</template>
<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  props: ['saleApplyPop'],
  data () {
    return {
      deviceType: '',
      shopId: '',
      loading: false,
      applyType: '',
      deviceSn: '',
      specialRecall: false,
      applyTypeDisabled: false,
      zcm_active_index: '',
      deviceTypeList: [
        {
          id: 1,
          name: 'POS'
        }, {
          id: 4,
          name: '小白盒'
        }, {
          id: 6,
          name: '音箱'
        }, {
          id: 7,
          name: '小美收银'
        }, {
          id: 8,
          name: '轻收银'
        }
      ],
      serviceTypeList: [{
        id: 1,
        name: '退机'
      }, {
        id: 2,
        name: '换机'
      }]
    }
  },
  computed: {
    ...mapGetters({
      umis: 'umis',
      uRole: 'uRole',
      mailTypes: 'mailTypes'
    })
  },
  methods: {
    close () {
      this.$emit('popClose')
    },
    cancel () {
      this.close()
    },
    specialRecallChange () {
      if (this.specialRecall) {
        this.applyType = 1
        this.applyTypeDisabled = true
      } else {
        this.applyType = ''
        this.applyTypeDisabled = false
      }
    },
    next () {
      let self = this
      let errorMsg = ''

      if (!self.deviceType) {
        errorMsg += '设备类型不能为空'
      } else if (!self.shopId) {
        errorMsg += '门店ID不能为空'
      } else if (!(/^[0-9]*$/.test(self.shopId))) {
        errorMsg += '门店ID格式不对'
      } else if (!self.deviceSn) {
        errorMsg += '设备SN号不能为空'
      } else if (!self.applyType) {
        errorMsg += '服务类型不能为空'
      }

      if (errorMsg) {
        this.$alert(errorMsg, '提示', {
          confirmButtonText: '确定'
        })
        return false
      }

      self.loading = true
      axios.post(`/zcm/bdsale/applyPreCheck`, {
        deviceType: self.deviceType,
        shopId: self.shopId,
        applyType: self.applyType,
        deviceSn: self.deviceSn
      }).then(result => {
        this.loading = false
        if (result &&
            result.data.data &&
            result.data.data.status === 200) {
          if (self.applyType === 2) {
            this.$router.push({
              path: '/zcm/bdsale/device/exchangeApply',
              query: {
                deviceType: self.deviceType,
                shopId: self.shopId,
                applyType: self.applyType,
                deviceSn: self.deviceSn,
                zcm_active_index: self.zcm_active_index
              }
            })
          } else {
            this.$router.push({
              path: '/zcm/bdsale/device/recallApply',
              query: {
                deviceType: self.deviceType,
                shopId: self.shopId,
                applyType: self.applyType,
                deviceSn: self.deviceSn,
                zcm_active_index: self.zcm_active_index,
                sceneCode: +self.applyTypeDisabled
              }
            })
          }
        } else {
          this.$alert(result.data.data.msg, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  },
  mounted () {
    this.zcm_active_index = this.$route.query.zcm_active_index
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
 .sale-apply .form-item {
     position: relative;
     overflow: hidden;
     margin: 15px 0px 0px 0px;
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

