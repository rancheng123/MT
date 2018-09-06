<template>
  <pagecontainer :loading="loading">
     <el-form :inline="true"  class="demo-form-inline" label-width="110px" label-position="left">
         <div class="shop-info-item item-select">
            <el-form-item label="结算账户：" :required="true">
              <el-select v-model="accountNum" @change="accountNumChange">
                <el-option
                        v-for="item in accountList"
                        :key="item.id"
                        :label="item.accountName + ' | ' + item.accountNo + ' | ' + item.bankAccountId"
                        :value="item.accountName + ' | ' + item.accountNo + ' | ' + item.bankAccountId">
                        </el-option>
                </el-select>
            </el-form-item>
         </div>
         <div class="shop-info-item item-select">
            <el-form-item label="账户类型：" :required="true">
              <el-select v-model="accountType" @change="accountTypeChange" :disabled="noEdit">
                <el-option label="对公" value="1"></el-option>
                <el-option label="对私" value="2"></el-option>
              </el-select>
            </el-form-item>
         </div>
         <div class="shop-info-item item-accountname">
           <el-form-item class="item-label" label="账户名称: " :required="true">
             <el-input @change="accountNameChang" v-model="accountName" placeholder="请输入账户名称" :disabled="noEdit"></el-input>
           </el-form-item>
         </div>
         <div class="shop-info-item item-account">
           <el-form-item class="item-label" label="账号: " :required="true">
             <el-input v-model="accountNo" placeholder="请输入账号" :disabled="noEdit"></el-input>
           </el-form-item>
         </div>
            <div class="shop-info-item">
            <fieldset>
                <legend>开户行所在地</legend>
                <div class="info-location">
                <el-form-item label="所属省份：" :required="true">
                    <el-select v-model="provinceId" @change = "proviceChange" clearable  placeholder="请选择" :disabled="noEdit">
                            <el-option
                            v-for="item in bankProvinceList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属城市：" :required="true">
                        <el-select v-model="cityId" @change = "cityChange" clearable placeholder="请选择" :disabled="noEdit">
                            <el-option
                            v-for="item in bankCityList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
             </fieldset>
         </div>
         <div class="shop-info-item item-select">
           <el-form-item class="item-label" label="开户行: " :required="true">
             <el-select v-model="bankId" filterable placeholder="请选择开户行" @change="bankChange" :disabled="noEdit">
                <el-option
                v-for="item in bankList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
             </el-select>
           </el-form-item>
         </div>
         <div class="shop-info-item item-select">
           <el-form-item class="item-label" label="银行支行: " :required="true">
             <el-select v-model="branchBankId" filterable placeholder="请选择开户行支行" :disabled="noEdit">
                <el-option
                v-for="item in bankBranchList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
             </el-select>
           </el-form-item>
         </div>
         <div class="shop-info-item item-idcard" v-show="isPublic == 0">
           <el-form-item class="item-label" label="身份证号: " :required="true">
             <el-input v-model="idCard" placeholder="请输入身份证号"></el-input>
           </el-form-item>
         </div>
          <div class="shop-info-item" v-show="isPublic == 0">
            <fieldset>
            <legend>身份证正面和反面</legend>
                <el-form-item label="上传图片：" :required="true">
                    <upload 
                      :action="action" 
                      :list="idCardPhotos_list"
                      :type="photoType[0]"
                      :photoLimit="2"
                      @onUploadSuccess="handleUploadSuccess"
                      @onPhotosRemove="handlePhotoRemove">
                    </upload>
                </el-form-item>
            </fieldset>
          </div>
          <div class="shop-info-item" v-show="isPublic == 0">
            <fieldset>
            <legend>银行卡正面和反面</legend>
                <el-form-item label="上传图片：" :required="true">
                  <upload 
                     :action="action" 
                     :list="bankCardPhotos_list"
                     :type="photoType[1]"
                     :photoLimit="2"
                     @onUploadSuccess="handleUploadSuccess"
                     @onPhotosRemove="handlePhotoRemove">
                    </upload>
                </el-form-item>
            </fieldset>
          </div>
          <div class="shop-info-item" v-show="isPublic == 1">
             <el-form-item label="开户许可证：" :required="true">
                <upload 
                    :action="action" 
                    :list="bankCardPhotos_list"
                    :type="photoType[1]"
                    :photoLimit="1"
                    @onUploadSuccess="handleUploadSuccess"
                    @onPhotosRemove="handlePhotoRemove">
                  </upload>
              </el-form-item>
          </div>
          <div class="shop-info-item" v-show="isPublic == 0 && settleShow">
            <el-form-item label="清算授权书：" :required="true">
               <upload 
                    :action="action" 
                    :type="photoType[2]"
                    :photoLimit="1"
                    :list="settleAuthorizationPhotos_list"
                    @onUploadSuccess="handleUploadSuccess"
                    @onPhotosRemove="handlePhotoRemove">
                </upload>
            </el-form-item>
          </div>
          <div class="shop-info-item submit">
            <el-button @click="onUp">上一步</el-button>
            <el-button v-loading="btnLoading" type="primary" @click="onNext">下一步</el-button>
          </div>
     </el-form>
  </pagecontainer>
</template>
<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
import Upload from './common/Upload.vue'
import PageContainer from './common/PageContainer.vue'
import util from '../../common/util.js'

export default {
  data () {
    return {
      isPublic: true,
      loading: true,
      btnLoading: false,
      noEdit: false,
      settleShow: true,
      shopId: '',
      selectId: '',
      accountType: '1',
      accountName: '',
      accountNo: '',
      accountNum: '',
      bankName: '',
      bankId: '',
      bankAccountId: '',
      branchBankId: '',
      branchBankName: '',
      cityId: '',
      idCard: '',
      provinceId: '',
      accountMobile: '',
      accountList: [],
      action: 'http://mtc.pos.sankuai.com/japi/coop/uploadPicture',
      photoType: ['idCardPhotos', 'bankCardPhotos', 'settleAuthorizationPhotos'],
      idCardPhotos: [],
      bankCardPhotos: [],
      settleAuthorizationPhotos: [],
      idCardPhotos_list: [],
      bankCardPhotos_list: [],
      settleAuthorizationPhotos_list: []
    }
  },
  components: {
    upload: Upload,
    pagecontainer: PageContainer
  },
  computed: {
    ...mapGetters({
      bankProvinceList: 'bankProvinceList',
      bankCityList: 'bankCityList',
      bankList: 'bankList',
      bankBranchList: 'bankBranchList'
    })
  },
  methods: {
    bankChange () {
      this.$store.dispatch('getBankBranchList', {
        bankId: this.bankId,
        provinceId: this.provinceId
      })
      this.branchBankId = ''
    },
    proviceChange (provinceId) {
      this.provinceId = provinceId
      this.cityId = ''
      this.branchBankId = ''
      this.$store.dispatch('getBankCityList', provinceId)
      this.$store.dispatch('getBankBranchList', {
        bankId: this.bankId,
        provinceId: provinceId
      })
    },
    accountNameChang () {
      this.getNeedSettlePhoto()
    },
    cityChange (cityId) {
      this.cityId = cityId
      this.regionId = ''
      this.$store.dispatch('getRegionList', cityId)
    },
    accountNumChange (selectValue) {
      if (selectValue && selectValue.split('|').length > 2) {
        this.selectId = selectValue.replace(/\s/g, '').split('|')[2]
        this.filterData(this.selectId)
        this.getNeedSettlePhoto()
      }
    },
    accountTypeChange () {
      this.isPublic = this.accountType === '1' ? '1' : '0'
      this.getNeedSettlePhoto()
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
    redirect (sourceUrl) {
      let batchFlowId = this.$route.query.batchFlowId
      let pageNum = this.$route.query.pageNum

      if (batchFlowId) {
        sourceUrl += `&batchFlowId=${batchFlowId}`
      }
      if (pageNum) {
        sourceUrl += `&pageNum=${pageNum}`
      }
      this.$router.push(sourceUrl)
    },
    onUp () {
      this.redirect(`/bill/qrcode/shopqfc?shopId=${this.shopId}`)
    },
    onNext () {
      let self = this
      let errorMsg = ''

      if (this.btnLoading) {
        return
      }

      this.btnLoading = true

      if (+self.accountType === 2) {
        if (self.idCardPhotos.length < 2) {
          errorMsg += '必须上传身份证正反面两张图片'
        } else if (self.bankCardPhotos.length < 2) {
          errorMsg += '必须上传银行卡正反面两张图片'
        }
      }

      if (errorMsg) {
        this.$alert(errorMsg, '提示', {
          confirmButtonText: '确定'
        })
        this.btnLoading = false
        return
      }

      axios.post(`/saveBankCard`, {
        shopId: self.shopId,
        bankAccountId: self.bankAccountId,
        provinceId: self.provinceId,
        cityId: self.cityId,
        bankId: self.bankId,
        branchBankId: self.branchBankId,
        accountType: self.accountType,
        accountName: self.accountName,
        idCard: self.idCard,
        accountNo: self.accountNo,
        accountMobile: self.accountMobile,
        bankCardPhotos: self.bankCardPhotos,
        settleAuthorizationPhotos: self.settleAuthorizationPhotos,
        idCardPhotos: self.idCardPhotos
      }).then(result => {
        this.btnLoading = false
        if (result && result.status === 200) {
          if (result.data && result.data.data && result.data.data.status !== 200) {
            this.$alert(result.data.data.msg, '提示', {
              confirmButtonText: '确定'
            })

            this.btnLoading = false
          } else {
            self.saveBindCard(result.data.data.data)
          }
        } else {
          this.$alert(result.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    saveBindCard: function (bankAccountId) {
      let self = this
      axios.post(`/bindBankCard`, {
        bankCardId: bankAccountId,
        shopId: self.shopId
      }).then(result => {
        if (result && result.status === 200) {
          if (result.data && result.data.data && result.data.data.status === 200) {
            this.redirect(`/bill/qrcode/rate?shopId=${this.shopId}`)
          } else {
            this.$alert(result.data.data.msg, '提示', {
              confirmButtonText: '确定'
            })
            this.btnLoading = false
          }
        } else {
          this.$alert(result.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    filterData (selectId) {
      let filter = this.pageData.find(item => item.bankAccountId === +selectId)
      if (filter) {
        this.bankAccountId = filter.bankAccountId
        this.accountType = filter.accountType + ''
        this.bankId = filter.bankId
        this.provinceId = filter.provinceId + ''
        this.cityId = filter.cityId + ''
        this.accountNo = filter.accountNo
        this.$store.dispatch('getBankBranchList', {
          bankId: this.bankId,
          provinceId: filter.provinceId
        })

        this.noEdit = +filter.editStatus === 2
        this.branchBankId = filter.branchBankId + ''
        this.accountName = filter.accountName
        this.bankCardPhotos = filter.bankCardPhotos || []
        this.idCard = filter.idCard
        this.settleAuthorizationPhotos = filter.settleAuthorizationPhotos || []
        this.idCardPhotos = filter.idCardPhotos || []
        this.isPublic = +filter.accountType === 1 ? '1' : '0'
        this.identityNum = filter.identityNum

        this.$store.dispatch('getBankProvinceList')
        this.$store.dispatch('getBankCityList', filter.provinceId)

        this.bankCardPhotos_list = []
        this.settleAuthorizationPhotos_list = []
        this.idCardPhotos_list = []

        if (!this.accountNum) {
          this.accountNum = this.accountName + ' | ' + this.accountNo + ' | ' + this.bankAccountId
        }

        this.bankCardPhotos && this.bankCardPhotos.forEach(item => {
          this.bankCardPhotos_list.push({
            url: item
          })
        })

        this.settleAuthorizationPhotos && this.settleAuthorizationPhotos.forEach(item => {
          this.settleAuthorizationPhotos_list.push({
            url: item
          })
        })

        this.idCardPhotos && this.idCardPhotos.forEach(item => {
          this.idCardPhotos_list.push({
            url: item
          })
        })
      }
    },
    getNeedSettlePhoto () {
      axios.post('/getNeedSettlePhoto', {
        shopId: this.shopId,
        accountType: this.accountType,
        accountName: this.accountName
      }).then(result => {
        if (result.data && result.data.code === 200) {
          if (result.data.data && result.data.data.status === 200) {
            this.settleShow = result.data.data.data
          } else {
          }
        }
      })
    }
  },
  mounted () {
    this.$store.dispatch('getBankList')
    this.$store.dispatch('getBankProvinceList')
    this.shopId = this.$route.query.shopId
    axios.get(`/getShopAccountInfo?shopId=${this.shopId}`).then(result => {
      this.loading = false
      if (result && result.status === 200 && result.data.code === 200) {
        if (!result.data.data.data && result.data.data.status !== 200) {
          this.$alert(result.data.data.msg, '提示', {
            confirmButtonText: '确定'
          })
          return false
        }

        this.pageData = result.data.data.data
        this.bindBankAccountId = result.data.data.bindBankAccountId

        this.pageData && this.pageData.forEach(item => {
          this.accountList.push({
            accountName: item.accountName,
            accountNo: item.accountNo,
            bankAccountId: item.bankAccountId
          })
        })

        if (this.bindBankAccountId) {
          this.filterData(this.bindBankAccountId)
        } else if (this.accountList.length > 0) {
          let selectId = this.accountList[0].bankAccountId
          this.accountNum = this.accountList[0].accountName + ' | ' + this.accountList[0].accountNo + ' | ' + this.accountList[0].bankAccountId
          this.filterData(selectId)
        }

        this.getNeedSettlePhoto()
      } else {
        this.$alert('结算信息查询失败', '提示', {
          confirmButtonText: '确定'
        })
      }
    })
  }
}
</script>
<style>
 .shop-info-box {
   position: relative;
   overflow: hidden;
   width: 95%;
   margin: 0 auto;
   background: white;
   padding: 20px 20px
 }
 .shop-info-box .shop-info-item {
   position: relative;
   overflow: hidden;
   clear: both;
   margin-top: 20px;
   border-bottom: 1px #E4E7ED solid;
 }
 .shop-info-box .shop-info-item .el-form-item {
   float: left;
 }
 .shop-info-box .shop-info-item fieldset {
   text-align: left;
   font-size: 14px;
   border: 1px #E4E7ED solid;
   margin-bottom: 20px;
   font-size: 14px;
   color: #606266;
   padding: 20px;
 }
 fieldset .el-form-item {
   margin-bottom: 0px;
 }
 fieldset .el-form-item__label {
   font-size: 14px;
   color: #606266;
   width: 100px;
 }
 .submit .el-button--primary {
   margin-bottom: 20px;
 }
 .item-select .el-select {
   width: 300px
 }
 .item-account .el-input,
 .item-accountname .el-input,
 .item-idcard .el-input {
   width: 300px
 }
</style>