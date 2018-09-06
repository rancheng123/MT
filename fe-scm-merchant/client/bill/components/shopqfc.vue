<template>
  <pagecontainer :loading="loading">
     <el-form :inline="true" label-width="140px"  class="demo-form-inline" label-position="left">
         <div class="shop-info-item">
            <el-form-item label="资质类型：" :required="true">
              <el-select v-model="qualificationType" @change="qualificationChange" :disabled="noEdit">
                <el-option label="企业" value="1"></el-option>
                <el-option label="个人" value="2"></el-option>
              </el-select>
            </el-form-item>
         </div>
         <div v-show="isEnterprise"> 
            <div class="shop-info-item" >
                <fieldset>
                <legend>资质图片</legend>
                    <el-form-item label="营业执照：" :required="true">
                      <upload 
                        :action="cdcAction" 
                        :list="taxCardCDCPhotos_list"
                        :type="photoType[5]"
                        :photoLimit="1"
                        @onUploadSuccess="handleUploadSuccess"
                        @onPhotosRemove="handlePhotoRemove">
                      </upload>
                    </el-form-item>
                    <el-form-item label="组织机构代码证：">
                    <upload 
                     :action="action" 
                     :list="orgCodeCardPhotos_list"
                     :type="photoType[1]"
                     :photoLimit="1"
                     @onUploadSuccess="handleUploadSuccess"
                     @onPhotosRemove="handlePhotoRemove">
                    </upload>
                    </el-form-item>
                     <el-form-item label="税务登记证：">
                      <upload 
                      :action="action" 
                      :list="taxCardPhotos_list"
                      :type="photoType[2]"
                      :photoLimit="1"
                      @onUploadSuccess="handleUploadSuccess"
                      @onPhotosRemove="handlePhotoRemove">
                      </upload>
                    </el-form-item>
                </fieldset>
            </div>
            <div class="shop-info-item">
            <el-form-item class="item-label" label="资质编号: " :required="true">
                <el-input v-model="businessLicence" placeholder="请输入资质编号" :disabled="noEdit"></el-input>
            </el-form-item>
            </div>
            <div class="shop-info-item">
            <el-form-item class="item-label" label="资质名称: " :required="true">
                <el-input v-model="businessName" placeholder="请输入资质名称" :disabled="noEdit"></el-input>
            </el-form-item>
            </div>
            <div class="shop-info-item">
            <el-form-item class="item-label" label="注册地址: " :required="true">
                <el-input v-model="regAddress" placeholder="请输入注册地址" :disabled="noEdit"></el-input>
            </el-form-item>
            </div>
            <div class="shop-info-item">
            <el-form-item class="item-label" label="营业期限: " :required="true">
                <el-date-picker
                  v-model="deadlineDate"
                  type="date"
                  :disabled="noEdit || isLong"
                  placeholder="选择日期">
                </el-date-picker>
                <el-checkbox v-model="isLong" @change="isLongChange">永久期限</el-checkbox>
            </el-form-item>
            </div>
         </div>
        <div class="shop-info-item">
          <el-form-item class="item-label" label="法人代表证件名称: " :required="true">
            <el-input v-model="legalPerson" placeholder="请输入法人姓名" :disabled="noEdit"></el-input>
          </el-form-item>
        </div>
        <div class="shop-info-item">
          <el-form-item class="item-label" label="法人代表证件类型: " :required="true">
             <el-select v-model="identityType" @change="identityTypeChange" :disabled="noEdit">
                <el-option label="身份证" value="0"></el-option>
                <el-option label="护照" value="1"></el-option>
              </el-select>
          </el-form-item>
        </div>
        <div class="shop-info-item">
          <el-form-item class="item-label" label="法人代表证件号码: " :required="true">
            <el-input style="width:193px" v-model="idCardNo" placeholder="请输入证件号码" :disabled="noEdit"></el-input>
          </el-form-item>
        </div>
        <div class="shop-info-item">
            <fieldset>
            <legend>法人代表证件</legend>
                <el-form-item label="正面" :required="true">
                   <upload 
                     :action="action" 
                     :list="idCardFrontPhotos_list"
                     :type="photoType[3]"
                     :photoLimit="1"
                     @onUploadSuccess="handleUploadSuccess"
                     @onPhotosRemove="handlePhotoRemove">
                   </upload>
                </el-form-item>
                <el-form-item label="反面" :required="true">
                  <upload 
                   :action="action" 
                   :list="idCardBackPhotos_list"
                   :type="photoType[4]"
                   :photoLimit="1"
                   @onUploadSuccess="handleUploadSuccess"
                   @onPhotosRemove="handlePhotoRemove">
                  </upload>
                </el-form-item>
            </fieldset>
        </div>
         <div class="shop-info-item submit" v-if="editStatus != 3">
             <el-button @click="onUp">上一步</el-button>
             <el-button v-loading="btnLoading" type="primary" @click="onNext" :disabled="noEdit">下一步</el-button>
         </div>
         <div class="shop-info-item submit" v-else-if="editStatus == 3">
             <el-button v-loading="btnLoading" type="primary" @click="onNext">保存</el-button>
         </div>
     </el-form>
  </pagecontainer>
</template>
<script>

import Upload from './common/Upload.vue'
import PageContainer from './common/PageContainer.vue'
import util from '../../common/util.js'
import axios from 'axios'

export default {
  data () {
    return {
      isEnterprise: true,
      shopId: '',
      btnLoading: false,
      loading: true,
      noEdit: false,
      isLong: false,
      editStatus: '',
      from: '',
      qualificationType: '1',
      businessLicence: '',
      businessName: '',
      regAddress: '',
      legalPerson: '',
      deadlineType: '',
      deadlineDate: '',
      cardName: '',
      idCardNo: '',
      identityType: '',
      businessLicencePhotoCdcId: '',
      action: 'http://mtc.pos.sankuai.com/japi/coop/uploadPicture',
      cdcAction: 'http://mtc.pos.sankuai.com/japi/coop/uploadPictureUseCDC',
      businessLicencePhotos_list: [],
      idCardFrontPhotos_list: [],
      idCardBackPhotos_list: [],
      orgCodeCardPhotos_list: [],
      taxCardPhotos_list: [],
      taxCardCDCPhotos_list: [],
      businessLicencePhotos: [],
      idCardFrontPhotos: [],
      idCardBackPhotos: [],
      orgCodeCardPhotos: [],
      taxCardPhotos: [],
      taxCardCDCPhotos: [],
      pageData: {},
      photoType: ['businessLicencePhotos', 'orgCodeCardPhotos', 'taxCardPhotos', 'idCardFrontPhotos', 'idCardBackPhotos', 'taxCardCDCPhotos']
    }
  },
  components: {
    upload: Upload,
    pagecontainer: PageContainer
  },
  methods: {
    isLongChange () {
      console.log(this.isLong)
    },
    qualificationChange () {
      this.isEnterprise = this.qualificationType === '1' ? 1 : 0
      this.filterData(+this.qualificationType)
    },
    identityTypeChange () {
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
        if (result.serverPath.indexOf('http://') === 0 || result.serverPath.indexOf('https://') === 0) {
          this[type].push({
            url: result.serverPath
          })
          this[result.type].push(result.serverPath)
        } else {
          this[type].push({
            url: result.sourceUrl
          })
          this[result.type].push(result.serverPath)
        }
      }
    },
    onUp () {
      this.redirect(`/bill/qrcode/shopinfo?shopId=${this.shopId}`)
    },
    onNext () {
      let self = this
      let errorMsg = ''

      if (self.btnLoading) {
        return
      }

      if (self.isEnterprise) {
        if (!self.qualificationType) {
          errorMsg += '请选择资质类型'
        } else if (!self.businessLicence) {
          errorMsg += '请填写资质编号'
        } else if (!self.businessName) {
          errorMsg += '请填写资质名称'
        } else if (!self.regAddress) {
          errorMsg += '请填写注册地址'
        } else if (!self.legalPerson) {
          errorMsg += '请填写法人证件名称'
        } else if (!self.idCardNo) {
          errorMsg += '请填写证件号码'
        }
      }

      if (errorMsg) {
        this.$alert(errorMsg, '提示', {
          confirmButtonText: '确定'
        })
        return false
      }

      self.btnLoading = true

      if (self.taxCardCDCPhotos.length > 0) {
        self.businessLicencePhotoCdcId = self.taxCardCDCPhotos[0]
      }

      axios.post('/saveQualificationInfo', {
        shopId: self.shopId,
        from: self.from,
        qualificationType: self.qualificationType,
        corporateQualification: {
          businessLicenceType: self.qualificationType === 1 ? 202 : 201,
          businessLicence: self.businessLicence,
          businessName: self.businessName,
          regAddress: self.regAddress,
          deadlineType: self.isLong ? 0 : 1,
          deadlineDate: new Date(self.deadlineDate).getTime() / 1000,
          legalPerson: self.legalPerson,
          identityType: self.identityType,
          idCardNo: self.idCardNo,
          businessLicencePhotos: self.businessLicencePhotos,
          businessLicencePhotoCdcId: self.businessLicencePhotoCdcId,
          idCardFrontPhotos: self.idCardFrontPhotos,
          idCardBackPhotos: self.idCardBackPhotos,
          orgCodeCardPhotos: self.orgCodeCardPhotos,
          taxCardPhotos: self.taxCardPhotos
        },
        personalQualification: {
          identityType: self.identityType,
          idCardNo: self.idCardNo,
          cardName: self.legalPerson || self.cardName,
          idCardFrontPhotos: self.idCardFrontPhotos,
          idCardBackPhotos: self.idCardBackPhotos
        }
      }).then(result => {
        self.btnLoading = false
        if (result && result.status === 200) {
          if (result.data && result.data.data && result.data.data.status !== 200) {
            this.$alert(result.data.data.msg, '提示', {
              confirmButtonText: '确定'
            })

            this.btnLoading = false
          } else {
            this.redirect(`/bill/qrcode/setaccount?shopId=${this.shopId}`)
          }
        } else {
        }
      })
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
    filterData (qualificationType) {
      if (this.pageData.corporateQualification && qualificationType === 1) {
        this.businessLicence = this.pageData.corporateQualification.businessLicence
        this.deadlineType = this.pageData.corporateQualification.deadlineType
        this.businessLicenceType = this.pageData.corporateQualification.businessLicenceType
        this.businessLicenceTypeName = this.pageData.corporateQualification.businessLicenceTypeName
        this.businessName = this.pageData.corporateQualification.businessName
        this.deadlineDate = this.pageData.corporateQualification.deadlineDate * 1000
        this.businessLicencePhotoCdcId = this.pageData.corporateQualification.businessLicencePhotoCdcId
        this.businessLicencePhotos = this.pageData.corporateQualification.businessLicencePhotos || []
        this.idCardFrontPhotos = this.pageData.corporateQualification.idCardFrontPhotos || []
        this.idCardBackPhotos = this.pageData.corporateQualification.idCardBackPhotos || []
        this.orgCodeCardPhotos = this.pageData.corporateQualification.orgCodeCardPhotos || []
        this.taxCardPhotos = this.pageData.corporateQualification.taxCardPhotos || []
        this.legalPerson = this.pageData.corporateQualification.legalPerson
        this.identityType = this.pageData.corporateQualification.identityType + ''
        this.regAddress = this.pageData.corporateQualification.regAddress
        this.idCardNo = this.pageData.corporateQualification.idCardNo
        this.isLong = +this.deadlineType === 0
        this.qualificationType = '1'
      }

      if (this.pageData.personalQualification && qualificationType === 2) {
        this.identityType = this.pageData.personalQualification.identityType + ''
        this.idCardNo = this.pageData.personalQualification.idCardNo
        this.cardName = this.pageData.personalQualification.cardName
        this.legalPerson = this.cardName
        this.idCardFrontPhotos = this.pageData.personalQualification.idCardFrontPhotos
        this.idCardBackPhotos = this.pageData.personalQualification.idCardBackPhotos
        this.isEnterprise = 0
        this.qualificationType = '2'
      }

      this.taxCardCDCPhotos_list = []
      this.idCardFrontPhotos_list = []
      this.idCardBackPhotos_list = []
      this.orgCodeCardPhotos_list = []
      this.taxCardPhotos_list = []

      this.businessLicencePhotos && this.businessLicencePhotos.forEach(item => {
        item && this.taxCardCDCPhotos_list.push({
          url: item
        })
      })

      this.idCardFrontPhotos && this.idCardFrontPhotos.forEach(item => {
        item && this.idCardFrontPhotos_list.push({
          url: item
        })
      })

      this.idCardBackPhotos && this.idCardBackPhotos.forEach(item => {
        this.idCardBackPhotos_list.push({
          url: item
        })
      })

      this.orgCodeCardPhotos && this.orgCodeCardPhotos.forEach(item => {
        this.orgCodeCardPhotos_list.push({
          url: item
        })
      })

      this.taxCardPhotos && this.taxCardPhotos.forEach(item => {
        this.taxCardPhotos_list.push({
          url: item
        })
      })
    }
  },
  mounted () {
    this.shopId = this.$route.query.shopId || ''
    axios.get(`/getQualificationInfo?shopId=${this.shopId}`).then(result => {
      this.loading = false
      if (result && result.status === 200 && result.data.code === 200) {
        let pageData = result.data.data.data
        if (!result.data.data.data && result.data.data.status !== 200) {
          this.$alert(result.data.data.msg, '提示', {
            confirmButtonText: '确定'
          })
          return false
        }

        this.pageData = pageData
        this.shopId = pageData.shopId
        this.editStatus = pageData.editStatus
        this.from = +this.editStatus === 3 ? 'hg' : ''
        this.isEnterprise = +pageData.qualificationType === 1
        this.noEdit = this.editStatus === 2

        this.filterData(+pageData.qualificationType)
      } else {
        this.$alert('资质信息查询失败', '提示', {
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
</style>


