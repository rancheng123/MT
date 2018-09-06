<template>
  <pagecontainer :loading="loading">
    <el-form :inline="true"  class="demo-form-inline" label-width="130px" label-position="left">
      <div class="shop-info-item">
        <el-form-item :required="true" class="item-label" label="门店名称: ">
          <el-input v-model="receiptTitle" placeholder="请输入门店名称" :disabled="noEdit"></el-input>
        </el-form-item>
      </div>
      <div class="shop-info-item">
        <el-form-item class="item-label" :required="true" label="商家管理员账号: ">
           <el-select
              v-model="extendAccountId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="searchEcomAccounts"
              :disabled="noEdit"
              :loading="loading">
              <el-option
                v-for="item in searchAccountList"
                :key="item.login"
                :label="item.login"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
      </div>
      <div class="shop-info-item">
        <el-form-item class="item-label" :required="true" label="联系人: ">
          <el-input v-model="contractPerson" placeholder="请输入联系人" :disabled="noEdit"></el-input>
        </el-form-item>
        <el-form-item class="item-label" :required="true" label="联系电话: ">
          <el-input v-model="contractTel" placeholder="请输入联系电话" :disabled="noEdit"></el-input>
        </el-form-item>
      </div>
      <div class="shop-info-item shop-type">
        <el-form-item :required="true" label="商户类型: ">
          <el-select v-model="bizUserMccId" filterable placeholder="请选择" :disabled="noEdit">
            <el-option
              v-for="item in bizUserMccList"
              :key="item.bizUserMccId"
              :label="item.displayMccId + '-' + item.name"
              :value="item.bizUserMccId">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="shop-info-item">
        <fieldset>
          <legend>门店地址</legend>
          <div class="info-location">
           <el-form-item label="所属省份：" :required="true">
             <el-select v-model="provinceId" @change = "proviceChange" clearable  placeholder="请选择" :disabled="noEdit">
                    <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属城市：" :required="true">
                <el-select v-model="cityId" @change = "cityChange" clearable placeholder="请选择" :disabled="noEdit">
                    <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="所属区域：" :required="true">
                <el-select v-model="regionId" @change = "regionChange" clearable placeholder="请选择" :disabled="noEdit" >
                    <el-option
                    v-for="item in regionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
          </div>
          <div class="info-address">
              <el-form-item label="详细地址: " :disabled="noEdit" :required="true">
                <el-input v-model="address" placeholder="请填写详细地址" ></el-input>
              </el-form-item>
          </div>
        </fieldset>
      </div>
      <div class="shop-info-item">
        <el-form-item label="门头图: " :disabled="noEdit" :required="true">
          <upload 
           :action="action"
           :type="photoType[0]"
           :photoLimit="1"
           :list="shopHeadPhotos_list" 
           @onUploadSuccess="handleUploadSuccess"
           @onPhotosRemove="handlePhotoRemove">
          </upload>
        </el-form-item>
      </div>
      <div class="shop-info-item">
        <el-form-item label="店内图: " :disabled="noEdit" :required="true">
          <upload 
           :action="action" 
           :type="photoType[1]"
           :photoLimit="1" 
           :list="shopInsidePhotos_list"  
           @onUploadSuccess="handleUploadSuccess"
           @onPhotosRemove="handlePhotoRemove">
          </upload>
        </el-form-item>
      </div>
      <div class="shop-info-item">
        <el-form-item label="经营场所证明: " :disabled="noEdit">
          <upload 
           :action="action" 
           :type="photoType[2]"
           :photoLimit="1" 
           :list="shopLocationPhotos_list"  
           @onUploadSuccess="handleUploadSuccess"
           @onPhotosRemove="handlePhotoRemove">
          </upload>
        </el-form-item>
      </div>
    </el-form>
     <div class="shop-info-item submit">
         <el-button>上一步</el-button>
         <el-button v-loading="btnLoading" type="primary" @click="onNext" :disabled="noEdit">下一步</el-button>
      </div>
  </pagecontainer>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import Upload from './common/Upload.vue'
import PageContainer from './common/PageContainer.vue'
import util from '../../common/util.js'

export default {
  name: 'BillIndex',
  data () {
    return {
      loading: true,
      btnLoading: false,
      noEdit: false,
      shopId: '',
      editStatus: 2,
      provinceId: 110000,
      cityId: '',
      regionId: '',
      shopName: '',
      shopAccount: '',
      contractPerson: '',
      contractTel: '',
      address: '',
      bizUserMccId: '',
      extendAccountId: '',
      ecomAccountId: '',
      ecomAccountLogin: '',
      searchAccountList: [],
      receiptTitle: '',
      action: 'http://mtc.pos.sankuai.com/japi/coop/uploadPicture',
      photoType: ['shopHeadPhotos', 'shopInsidePhotos', 'shopLocationPhotos'],
      shopHeadPhotos_list: [],
      shopInsidePhotos_list: [],
      shopLocationPhotos_list: [],
      shopHeadPhotos: [],
      shopInsidePhotos: [],
      shopLocationPhotos: [],
      pageData: {}
    }
  },
  computed: {
    ...mapGetters({
      provinceList: 'provinceList',
      cityList: 'cityList',
      regionList: 'regionList',
      bizUserMccList: 'bizUserMccList'
    })
  },
  components: {
    upload: Upload,
    pagecontainer: PageContainer
  },
  methods: {
    proviceChange (provinceId) {
      this.provinceId = provinceId
      this.cityId = ''
      this.$store.dispatch('getCityList', provinceId)
    },
    cityChange (cityId) {
      this.cityId = cityId
      this.regionId = ''
      this.$store.dispatch('getRegionList', cityId)
    },
    regionChange (regionId) {
      this.regionId = regionId
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
    searchEcomAccounts (keyWord) {
      if (keyWord !== '') {
        axios.get(`/searchEcomAccounts?keyWord=${keyWord}`).then(result => {
          if (result && result.status === 200) {
            if (result.data && result.data.data && result.data.data.status !== 200) {
              this.$alert(result.data.data.msg, '提示', {
                confirmButtonText: '确定'
              })
              this.btnLoading = false
            } else {
              this.searchAccountList = result.data.data.data || []
            }
          } else {
            this.$alert(result.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      }
    },
    onNext () {
      let self = this
      let errorMsg = ''

      if (!self.shopId) {
        errorMsg += '门店id不能为空'
      } else if (!self.receiptTitle) {
        errorMsg += '小票名称不能为空'
      } else if (self.receiptTitle) {
        if (!new RegExp('^[\\s`~!@#$^*()=|{}:;\\[\\].•·/?~！@#￥……*（）;|\\-{}【】；：。、？a-zA-Z0-9\u2E80-\uFE4F]+$').test(self.receiptTitle)) {
          errorMsg += '门店名称存在不合法字符，请检查'
        }
      } else if (self.receiptTitle.length > 20) {
        errorMsg += '门店名称必须小于或等于20个字符'
      } else if (!self.contractPerson) {
        errorMsg += '联系人不能为空'
      } else if (!self.address) {
        errorMsg += '详细地址不能为空'
      } else if (!self.contractTel) {
        errorMsg += '联系人电话不能为空'
      } else if (!self.bizUserMccId) {
        errorMsg += '请选择商户类型'
      } else if (self.shopHeadPhotos.length === 0) {
        errorMsg += '请上传门头图'
      } else if (!self.shopInsidePhotos.length === 0) {
        errorMsg += '请上传店内图'
      }

      if (self.contractTel) {
        if (!(/^1[3|4|5|8|9|7][0-9]\d{4,8}$/.test(self.contractTel))) {
          errorMsg += '联系人电话格式不正确'
        }
      }

      if (errorMsg) {
        this.$alert(errorMsg, '提示', {
          confirmButtonText: '确定'
        })
        return
      }

      this.btnLoading = true

      if (this.extendAccountId !== this.ecomAccountLogin) {
        this.ecomAccountId = this.extendAccountId
      }

      axios.post('/saveShopInfo', {
        shopId: self.shopId,
        receiptTitle: self.receiptTitle, // 小票名称
        locationId: self.regionId, // 地区id
        address: self.address, // 详细地址
        contractPerson: self.contractPerson, // 联系人
        contractTel: self.contractTel, // 联系电话
        ecomAccountId: self.ecomAccountId, // 商家账户id
        bizUserMccId: self.bizUserMccId, // MCC品类id
        shopHeadPhotos: self.shopHeadPhotos, // 门头图
        shopLocationPhotos: self.shopLocationPhotos, // 门店经营场所图
        shopInsidePhotos: self.shopInsidePhotos, // 店内图
        checkDeskPhotos: self.checkDeskPhotos, // 收银台图
        merchantInfoPhotos: self.merchantInfoPhotos // 商户信息调查表
      }).then(result => {
        if (result && result.status === 200) {
          if (result.data && result.data.data && result.data.data.status !== 200) {
            this.$alert(result.data.data.msg, '提示', {
              confirmButtonText: '确定'
            })

            this.btnLoading = false
          } else {
            let tabUrl = `/bill/qrcode/shopqfc?shopId=${this.shopId}`
            this.redirect(tabUrl)
          }
        } else {
          this.$alert(result.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  },
  mounted () {
    this.shopId = this.$route.query.shopId
    this.$store.dispatch('getProvinceList')
    this.$store.dispatch('getBizUserMccList')

    axios.get(`/getShopInfo?shopId=${this.shopId}`).then(result => {
      this.loading = false
      if (result && result.status === 200 && result.data.code === 200) {
        let pageData = result.data.data.data

        if (!result.data.data.data && result.data.data.status !== 200) {
          this.$alert(result.data.data.msg, '提示', {
            confirmButtonText: '确定'
          })
          return false
        }

        this.provinceId = pageData.provinceId
        this.cityId = pageData.cityId
        this.locationId = pageData.locationId
        this.regionId = pageData.locationId
        this.shopId = pageData.shopId
        this.editStatus = pageData.editStatus
        this.noEdit = pageData.editStatus === 2

        this.$store.dispatch('getProvinceList')
        this.$store.dispatch('getCityList', this.provinceId)
        this.$store.dispatch('getRegionList', this.cityId)

        this.address = pageData.address
        this.shopName = pageData.shopName
        this.receiptTitle = pageData.receiptTitle
        this.contractPerson = pageData.contractPerson
        this.contractTel = pageData.contractTel
        this.bizUserMccId = pageData.bizUserMccId
        this.ecomAccountId = pageData.ecomAccountLogin + ''
        this.extendAccountId = pageData.ecomAccountId
        this.ecomAccountLogin = pageData.ecomAccountLogin
        this.shopHeadPhotos = pageData.shopHeadPhotos || []
        this.shopInsidePhotos = pageData.shopInsidePhotos || []
        this.shopLocationPhotos = pageData.shopLocationPhotos || []

        this.searchEcomAccounts(this.ecomAccountId)

        this.shopHeadPhotos && this.shopHeadPhotos.forEach(item => {
          this.shopHeadPhotos_list.push({
            url: item
          })
        })

        this.shopInsidePhotos && this.shopInsidePhotos.forEach(item => {
          this.shopInsidePhotos_list.push({
            url: item
          })
        })

        this.shopLocationPhotos && this.shopLocationPhotos.forEach(item => {
          this.shopLocationPhotos_list.push({
            url: item
          })
        })
      } else {
        this.$alert('门店信息查询失败', '提示', {
          confirmButtonText: '确定'
        })
      }
    })
  }
}
</script>

<style scoped>
 .shop-head-avator {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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
 .shop-info-box .shop-info-item .info-location {
   clear: both;
   overflow: hidden;
   margin-bottom: 20px;
 }
 .shop-info-box .shop-info-item .el-form-item {
   float: left;
 }
 .shop-info-box .shop-info-item .el-form-item {
   margin-right: 50px;
 }
 .info-address .el-input {
   width: 400px;
 }
 label {
   width: 100px
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
 .item-xiaopia label {
    width: 100px;
}
 .submit .el-button--primary {
  margin-bottom: 20px;
}
.shop-type .el-select {
  width: 300px;
}
.item-label .el-input {
  width: 200px;
}
</style>