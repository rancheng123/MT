<template>
  <div class="customer-qualification-box">
    <el-form :inline="true" v-loading="loading" class="demo-form-inline" label-width="130px" >
        <div class="customer-qualification-item">
            <fieldset>
            <legend>客户信息</legend>
              <div>
                <el-form-item class="item-label" label="客户类型: ">
                 <el-select v-model="type" clearable  placeholder="请选择" :disabled="true">
                      <el-option
                      v-for="item in typeMap"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item class="item-label" label="状态: ">
                  <span>{{ realNameStatusEnum[realNameStatus] || '未实名' }}</span>
                </el-form-item>
              </div>
              <div v-if="rejectReason">
                <el-form-item class="item-label" label="驳回原因: ">
                  <el-input
                    type="textarea"
                    :rows="2"
                    :disabled="true"
                    v-model="rejectReason"
                    :autosize="{ minRows: 2, maxRows: maxRows }"
                    placeholder="请输入驳回原因">
                  </el-input>
                </el-form-item>
              </div>
            </fieldset>
        </div>
        <div class="customer-qualification-item" v-if="type != 2">
             <fieldset>
            <legend>营业执照信息</legend>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="资质编号: ">
                  <el-input placeholder="请输入资质编号"  @blur="qualNameBlur()" v-model="qualCode" :disabled="noEdit"></el-input>
                </el-form-item>
                <el-form-item class="item-label" label="资质类型: ">
                   <el-select v-model="qualType" clearable  placeholder="请选择" :disabled="noEdit">
                      <el-option
                      v-for="item in businessLicenceTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      </el-option>
                    </el-select>
                </el-form-item>
              </div>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="资质名称: ">
                  <el-input placeholder="请输入资质名称" v-model="qualName" :disabled="noEdit"></el-input>
                </el-form-item>
                <el-form-item class="item-label" label="注册地址: ">
                  <el-input placeholder="请输入注册地址" v-model="companyQualification.regAddress" :disabled="noEdit"></el-input>
                </el-form-item>
              </div>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="营业期限: ">
                   <el-date-picker
                    v-model="companyQualification.deadlineDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :disabled="isLong || noEdit"
                    placeholder="选择日期">
                  </el-date-picker>
                  <el-checkbox v-model="isLong" :disabled="noEdit">永久有效</el-checkbox>
                </el-form-item>
              </div>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="法人代表姓名: ">
                  <el-input :disabled="noEdit" placeholder="请输入法人代表姓名" v-model="companyQualification.corpIdcardName"></el-input>
                </el-form-item>
              </div>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="营业范围: ">
                  <el-input :disabled="noEdit" placeholder="请输入营业范围" v-model="companyQualification.businessScope"></el-input>
                </el-form-item>
              </div>
            </fieldset>
        </div>
        <div class="customer-qualification-item">
            <fieldset>
            <legend>法定代表人身份信息</legend>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="证件类型: ">
                 <el-select :disabled="noEdit && (realNameStatus != 0 && realNameStatus != 2)" v-model="companyQualification.idcardType" clearable  placeholder="请选择">
                    <el-option
                    v-for="item in legalPersonIdTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item class="item-label" label="证件姓名: ">
                  <el-input :disabled="noEdit" placeholder="请输入证件姓名" v-model="companyQualification.corpIdcardName"></el-input>
                </el-form-item>
              </div>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="证件号码: ">
                  <el-input @blur="idcardNoBlur()" :disabled="noEdit && realNameStatus != 0 && realNameStatus != 2" placeholder="请输入证件号码" v-model="companyQualification.idcardNo"></el-input>
                </el-form-item>
              </div>
            </fieldset>
        </div>
         <div class="customer-qualification-item" v-if="companyQualification.idcardType != 102">
            <fieldset>
            <legend>实名认证</legend>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="实名认证方式: ">
                  <el-radio v-model="authenticationMessage.authenticationType" label="1">手机号验证</el-radio>
                  <el-radio v-model="authenticationMessage.authenticationType" label="2">银行卡验证</el-radio>
                </el-form-item>
              </div>
              <div class="qualification-item-line">
                <el-form-item class="item-label" label="签约人身份: ">
                  <el-radio v-if="type != 2" v-model="authenticationMessage.signPersonType" label="1">法人签约</el-radio>
                  <el-radio v-if="type != 2" v-model="authenticationMessage.signPersonType" label="2">授权人签约</el-radio>
                   <el-radio v-if="type == 2" v-model="authenticationMessage.signPersonType" label="3">本人</el-radio>
                </el-form-item>
              </div>
              <div class="qualification-item-line" v-if="authenticationMessage.authenticationType != 2 && authenticationMessage.signPersonType != 2">
                <el-form-item class="item-label" label="法人手机号码: ">
                  <el-input placeholder="请输入法人手机号码" v-model="authenticationMessage.phone"></el-input>
                </el-form-item>
              </div>
              <div class="qualification-item-line" v-if="authenticationMessage.authenticationType == 2">
                <el-form-item class="item-label" label="银行卡卡号: ">
                  <el-input placeholder="请输入银行卡卡号" v-model="authenticationMessage.bankCardNo"></el-input>
                </el-form-item>
              </div>
              <div class="qualification-item-line" v-if="authenticationMessage.authenticationType == 2">
                <el-form-item class="item-label" label="预留手机号: ">
                  <el-input placeholder="请输入预留手机号" v-model="authenticationMessage.bankCardPhone"></el-input>
                </el-form-item>
              </div>
              <div class="qualification-item-line" v-if="authenticationMessage.signPersonType == 2">
                <el-form-item class="item-label" label="授权人姓名: ">
                  <el-input placeholder="请输入授权人姓名" v-model="authenticationMessage.name"></el-input>
                </el-form-item>
              </div>
              <div class="qualification-item-line" v-if="authenticationMessage.signPersonType == 2">
                <el-form-item class="item-label" label="授权人身份证号: ">
                  <el-input placeholder="请输入授权人身份证号" v-model="authenticationMessage.idcardNo"></el-input>
                </el-form-item>
              </div>
              <div class="qualification-item-line" v-if="authenticationMessage.signPersonType == 2 && authenticationMessage.authenticationType != 2">
                <el-form-item class="item-label" label="授权人手机号: ">
                  <el-input placeholder="请输入授权人手机号" v-model="authenticationMessage.phone"></el-input>
                </el-form-item>
              </div>
            </fieldset>
        </div>
        <div class="customer-qualification-item" v-show="authenticationMessage.signPersonType == 1 || companyQualification.idcardType != 102">
            <fieldset>
            <legend>法人相关证件</legend>
              <el-form-item label="营业执照照片：" :required="true" v-if="type != 2">
                <upload 
                    :action="cdcAction" 
                    :list="businessLicensePhoto_list"
                    :type="photoType[0]"
                    :photoLimit="1"
                    @onUploadSuccess="handleUploadSuccess"
                    @onPhotosRemove="handlePhotoRemove">
                  </upload>
              </el-form-item>
              <el-form-item :label="+companyQualification.idcardType === 102 ? '个人信息照片：' : '身份证-正面：'" :required="true">
                <upload 
                    :action="action" 
                    :list="idcardFrontPhoto_list"
                    :type="photoType[1]"
                    :photoLimit="1"
                    @onUploadSuccess="handleUploadSuccess"
                    @onPhotosRemove="handlePhotoRemove">
                  </upload>
              </el-form-item>
              <el-form-item label="身份证-反面：" :required="true" v-if="companyQualification.idcardType != 102">
                <upload 
                    :action="action" 
                    :list="idcardBackPhoto_list"
                    :type="photoType[2]"
                    :photoLimit="1"
                    @onUploadSuccess="handleUploadSuccess"
                    @onPhotosRemove="handlePhotoRemove">
                  </upload>
              </el-form-item>
            </fieldset>
        </div>
        <div class="customer-qualification-item" v-show="authenticationMessage.signPersonType == 2">
            <fieldset>
            <legend>授权人相关证件</legend>
              <el-form-item label="授权书：" :required="true">
                <upload 
                    :action="action" 
                    :list="authFileUrl_list"
                    :type="photoType[3]"
                    :photoLimit="1"
                    @onUploadSuccess="handleUploadSuccess"
                    @onPhotosRemove="handlePhotoRemove">
                  </upload>
              </el-form-item>
              <el-form-item label="身份证-正面" :required="true">
                <upload 
                    :action="action" 
                    :list="authorizerIdcardFrontUrl_list"
                    :type="photoType[4]"
                    :photoLimit="1"
                    @onUploadSuccess="handleUploadSuccess"
                    @onPhotosRemove="handlePhotoRemove">
                  </upload>
              </el-form-item>
              <el-form-item label="身份证-反面：" :required="true">
                <upload 
                    :action="action" 
                    :list="authorizerIdcardBackUrl_list"
                    :type="photoType[5]"
                    :photoLimit="1"
                    @onUploadSuccess="handleUploadSuccess"
                    @onPhotosRemove="handlePhotoRemove">
                  </upload>
              </el-form-item>
            </fieldset>
        </div>
        <div class="customer-qualification-item submit">
          <el-button @click="history()">上一步</el-button>
          <el-button @click="submit()" v-if="+shopId !== -1 || !noEdit" :loading="btnLoading" type="primary">{{shopId ? '确认提交' : '确认创建'}}</el-button>
        </div>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable no-new */
import util from '../../common/util'
import Upload from '../../components/common/Upload.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      action: '',
      cdcAction: '',
      shopId: '',
      productId: '',
      noEdit: true,
      btnLoading: false,
      customerId: '',
      returnCustomerId: null,
      firstCustomerId: null,
      businessLicensePhoto_list: [],
      idcardFrontPhoto_list: [],
      idcardBackPhoto_list: [],
      authFileUrl_list: [],
      authorizerIdcardFrontUrl_list: [],
      authorizerIdcardBackUrl_list: [],
      businessLicensePhoto: [],
      idcardFrontPhoto: [],
      idcardBackPhoto: [],
      authFileUrl: [],
      authorizerIdcardFrontUrl: [],
      authorizerIdcardBackUrl: [],
      photoType: [
        'businessLicensePhoto',
        'idcardFrontPhoto',
        'idcardBackPhoto',
        'authFileUrl',
        'authorizerIdcardFrontUrl',
        'authorizerIdcardBackUrl'
      ],
      loading: true,
      qualName: '',
      qualCode: '',
      qualType: '',
      deadlineDate: '',
      isLong: false,
      type: '',
      realNameStatusEnum: [
        '未实名',
        '审核中',
        '审核驳回',
        '已实名'
      ],
      realNameStatus: 0,
      businessLicenceTypeList: [{
        name: '个体户',
        id: 201
      }, {
        name: '企业法人营业执照',
        id: 202
      }],
      typeMap: [{
        id: 1,
        name: '企业身份客户'
      }, {
        id: 2,
        name: '个人身份客户'
      }],
      legalPersonIdTypeList: [{
        name: '请选择',
        id: -1
      }, {
        name: '身份证',
        id: 101
      }, {
        name: '护照',
        id: 102
      }],
      companyQualification: {
        regAddress: '',
        businessLicensePhoto: '',
        idcardBackPhoto: '',
        idcardFrontPhoto: '',
        corpIdcardName: '',
        idcardType: '',
        idcardNo: '',
        qualPic: '',
        taxCard: '',
        orgCodeCard: '',
        deadlineType: '',
        deadlineDate: '',
        businessScope: ''
      },
      personalQualification: {
        idcardFrontPhoto: '',
        idcardBackPhoto: ''
      },
      authenticationMessage: {
        authFileUrl: '',
        authorizerIdcardFrontUrl: '',
        authorizerIdcardBackUrl: '',
        customerId: '',
        realNameStatus: '',
        authenticationType: '1',
        signPersonType: '1',
        phone: '',
        name: '',
        idcardNo: '',
        bankCardNo: ''
      },
      existSave: false,
      noExistSave: false,
      rejectReason: '',
      maxRows: 1
    }
  },
  computed: {
    ...mapGetters({
      customerInfo: 'customerInfo'
    })
  },
  components: {
    upload: Upload
  },
  methods: {
    history () {
      window.history.go(-1)
    },
    handlePhotoRemove (result) {
      let type = result.type + '_list'
      if (result) {
        this[type] = util.removePhotoItem(this[type], {
          url: result.url,
          uid: result.uid,
          status: result.status
        })
        /**
         * 删除CDC图片时，这儿做了特殊处理
         */
        // this[result.type] = util.removePhotoItem(this[result.type], result.url)
        this[result.type] = []
      }
    },
    /**
     * 对CDC图片做了特殊操作
     */
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
    loadImage (imageList, instance) {
      imageList.forEach(item => {
        if (instance[item]) {
          this[item] = [instance[item]]

          // 遍历之前先清空数组
          // this[item + '_list'] = []

          this[item + '_list'].push({
            url: instance[item]
          })
        }
      })
    },
    /**
     * 资质编号失焦
     */
    qualNameBlur () {
      this.loading = true
      this.getCustomerInfo('blur')
    },
    /**
     * 证件号码失焦
     */
    idcardNoBlur () {
      if (+this.type === 1) {
        return false
      }
      let idcardNo = this.companyQualification.idcardNo
      this.getCustomerInfo('blur', idcardNo)
    },
    submit () {
      if (this.existSave) {
        this.$alert('该客户已存在，无法创建', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }

      if (this.noExistSave) {
        this.$alert('工商局未查询到此商家信息，请7天后重试', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }

      if ((this.realNameStatus === 0 || this.realNameStatus === 2) && +this.type !== 2) {
        if (!this.companyQualification.businessScope) {
          this.$alert('营业范围不能为空', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
      }

      this.btnLoading = true

      this.companyQualification.businessLicensePhoto = this.businessLicensePhoto.join('')
      this.companyQualification.idcardBackPhoto = this.idcardBackPhoto.join('')
      this.companyQualification.idcardFrontPhoto = this.idcardFrontPhoto.join('')
      this.companyQualification.deadlineType = this.isLong ? 0 : 1
      // 存营业执照cdcId
      this.companyQualification.qualPic = this.businessLicensePhoto.join('')

      this.personalQualification.idcardBackPhoto = this.idcardBackPhoto.join('')
      this.personalQualification.idcardFrontPhoto = this.idcardFrontPhoto.join('')

      this.authenticationMessage.authFileUrl = this.authFileUrl.join('')
      this.authenticationMessage.authorizerIdcardFrontUrl = this.authorizerIdcardFrontUrl.join('')
      this.authenticationMessage.authorizerIdcardBackUrl = this.authorizerIdcardBackUrl.join('')

      this.customerInfo.companyQualification = +this.type === 2 ? null : this.companyQualification
      this.customerInfo.personalQualification = this.personalQualification
      this.customerInfo.authenticationMessage = this.authenticationMessage

      this.customerInfo.deadlineDate = this.companyQualification.deadlineDate || this.deadlineDate
      this.customerInfo.deadlineType = this.isLong ? 0 : 1
      this.customerInfo.shopId = +this.shopId === -1 ? '' : this.shopId
      /**
       * 如果是个人资质的话回填
       */
      if (+this.type === 2) {
        this.qualType = this.companyQualification.idcardType
        this.qualName = this.companyQualification.corpIdcardName
        this.qualCode = this.companyQualification.idcardNo
        this.customerInfo.deadlineType = 0
      }

      this.customerInfo.qualCode = this.qualCode
      this.customerInfo.qualName = this.qualName
      this.customerInfo.qualType = this.qualType
      this.customerInfo.type = this.type

      if (this.returnCustomerId) {
        this.customerInfo.id = this.returnCustomerId
      } else {
        if (!this.customerInfo.id) {
          this.customerInfo.id = null
        }
      }

      if (this.companyQualification && +this.companyQualification.idcardType === 102) {
        this.customerInfo.authenticationMessage = null
      }

      this.customerInfo.source = 1

      this.$store.dispatch('saveCustomerWithAuth', this.customerInfo).then(result => {
        this.btnLoading = false
        if (result.data &&
            result.data.code === 200 &&
            result.data.data &&
            result.data.data.retCode === 200) {
          if (result.data.data.error) {
            let error = result.data.data.error.msg.replace(/\n/g, '<br/>')
            if (+result.data.data.error.code === 10501) {
              this.returnCustomerId = result.data.data.data.id
              this.$confirm(error, '提示', {
                confirmButtonText: '确定提交',
                cancelButtonText: '返回修改',
                dangerouslyUseHTMLString: true
              }).then(() => {
                this.$store.dispatch('submitAudit', { customerId: this.customerInfo.id || result.data.data.data.id }).then(result => {
                  if (result.data &&
                      result.data.code === 200 &&
                      result.data.data &&
                      result.data.data.retCode === 200) {
                    this.$alert('提交成功', '提示', {
                      confirmButtonText: '确定',
                      dangerouslyUseHTMLString: true,
                      callback: action => {
                        if (this.shopId && this.productId) {
                          window.location.href = `${util.getHostMapping('SCMPC')}/pc/createContract/1/${this.productId}`
                        } else {
                          window.location.href = `${util.getHostMapping('SCMPC')}/pc/customerlist`
                        }
                      }
                    })
                  } else {
                    this.$alert('提交失败', '提示', {
                      confirmButtonText: '确定',
                      dangerouslyUseHTMLString: true
                    })
                  }
                })
              })
            } else {
              this.$alert(error, '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true
              })
            }
            return false
          }

          this.$alert('保存成功！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              if (this.shopId && this.productId) {
                window.location.href = `${util.getHostMapping('SCMPC')}/pc/createContract/1/${this.productId}`
              } else {
                window.location.href = `${util.getHostMapping('SCMPC')}/pc/customerlist`
              }
            }
          })
        } else {
          let errorMsg = ''
          if (result.data.code !== 200) {
            errorMsg = '服务器错误，请重试'
          } else {
            errorMsg = result.data.data.error && result.data.data.error.msg
          }
          this.$alert(errorMsg, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    checkCustomerInfo (idcardNo) {
      if (this.qualCode) {
        this.$store.dispatch('getCustomerWithAuth', {
          qualCode: idcardNo || this.qualCode
        }).then(result => {
          if (result && result.id) {
            this.$alert('此资质已存在', '提示', {
              confirmButtonText: '确定'
            })
          } else {
            this.companyQualification = {}
            this.personalQualification = {}
            this.authenticationMessage = {}
          }
        })
      }
    },
    resetImageList () {
      this.businessLicensePhoto_list = []
      this.idcardFrontPhoto_list = []
      this.idcardBackPhoto_list = []
      this.authFileUrl_list = []
      this.authorizerIdcardFrontUrl_list = []
      this.authorizerIdcardBackUrl_list = []
    },
    getCustomerInfo (callType, idcardNo) {
      if (+this.customerId || this.qualCode) {
        this.$store.dispatch('getCustomerWithAuth', {
          customerId: this.customerId,
          qualCode: idcardNo || this.qualCode
        }).then(result => {
          this.loading = false
          this.noEdit = true

          if (result && result.id && !this.shopId) {
            this.$alert('该客户已存在，无法创建', '提示', {
              confirmButtonText: '确定'
            })
            this.noEdit = false
            return false
          }

          if (callType === 'blur') {
            if (result && result.id && result.id !== this.firstCustomerId && !this.shopId) {
              this.$alert('该客户已存在，无法创建', '提示', {
                confirmButtonText: '确定'
              })
              this.existSave = true
              this.noEdit = false
              return false
            } else {
              this.resetImageList()
              this.existSave = false
            }
          } else {
            this.firstCustomerId = this.customerInfo.id
          }

          if (!result) {
            this.noExistSave = true
            this.qualName = ''
            this.qualType = ''
            this.$alert('工商局未查询到此商家信息，请7天后重试', '提示', {
              confirmButtonText: '确定'
            })
          } else {
            this.noExistSave = false
          }

          if (this.customerInfo.companyQualification) {
            this.companyQualification = this.customerInfo.companyQualification

            this.isLong = +this.companyQualification.deadlineType === 0
            this.loadImage(['businessLicensePhoto', 'idcardBackPhoto', 'idcardFrontPhoto'], this.companyQualification)
          } else {
            Object.keys(this.companyQualification).forEach(item => {
              this.companyQualification[item] = ''
            })
          }

          if (this.customerInfo.personalQualification) {
            this.personalQualification = this.customerInfo.personalQualification

            this.loadImage(['idcardBackPhoto', 'idcardFrontPhoto'], this.personalQualification)
          } else {
            Object.keys(this.personalQualification).forEach(item => {
              this.personalQualification[item] = ''
            })
          }

          if (this.customerInfo.authenticationMessage) {
            this.authenticationMessage = this.customerInfo.authenticationMessage || {}
            this.authenticationMessage.signPersonType = (this.authenticationMessage.signPersonType || 1) + ''
            this.authenticationMessage.authenticationType = (this.authenticationMessage.authenticationType || 1) + ''

            if (+this.type === 2) {
              this.authenticationMessage.signPersonType = '3'
            }

            this.loadImage(['authFileUrl', 'authorizerIdcardBackUrl', 'authorizerIdcardFrontUrl'], this.authenticationMessage)
          } else {
            Object.keys(this.authenticationMessage).forEach(item => {
              this.authenticationMessage[item] = ''
            })
            this.authenticationMessage['authenticationType'] = '1'
            this.authenticationMessage['signPersonType'] = '1'
          }
          /**
           * 如果是失焦检测，下面这些不要清空
           */
          this.qualCode = this.customerInfo.qualCode
          if (callType !== 'blur') {
            this.type = this.customerInfo.type
          } else {
            if (idcardNo) {
              this.qualCode = idcardNo
            }
          }

          this.rejectReason = this.customerInfo.rejectReason
          if (this.rejectReason) {
            this.maxRows = this.rejectReason.split(',').length
            this.rejectReason = this.rejectReason.replace(/,/g, '\n')
          }
          this.qualType = this.customerInfo.qualType
          this.qualName = this.customerInfo.qualName
          this.realNameStatus = !this.customerInfo.realNameStatus ? 0 : ((+this.customerInfo.realNameStatus - 1) || 0)
          /**
           * 如果是个人资质
           */
          if (+this.type === 2) {
            this.companyQualification.idcardType = this.qualType
            this.companyQualification.corpIdcardName = this.qualName
            this.companyQualification.idcardNo = this.qualCode
          }
          /**
           * 审核中和已实名状态不允许提交
           */
          this.noEdit = this.realNameStatus === 1 || this.realNameStatus === 3
        })
      } else {
        this.loading = false
      }
    }
  },
  mounted () {
    this.customerId = this.$route.query.id
    this.qualCode = this.$route.query.qualCode
    this.shopId = this.$route.query.shopId || this.$route.query.shopid
    this.productId = this.$route.query.productId
    this.noEdit = !!this.customerId
    this.action = util.getUploadPictrueAction()
    this.cdcAction = util.getUploadPictrueAction('cdc')
    this.getCustomerInfo()
  }
}
</script>

<style lang="less">
.customer-qualification-box {
    background: #ffffff;
    position: relative;
    overflow: hidden;
    padding: 10px;
    .customer-qualification-item fieldset {
      text-align: left;
      font-size: 14px;
      border: 1px #E4E7ED solid;
      font-size: 14px;
      color: #606266;
      margin-bottom: 10px;
    }
    .el-form-item {
      margin-bottom: 10px;
      .el-input {
        width: 250px
      }
      .el-checkbox {
        margin-left: 5px;
      }
    }
    .qualification-item-line {
      margin: 5px 0px;
    }
    .el-textarea {
      width: 340px;
    }
}
</style>

