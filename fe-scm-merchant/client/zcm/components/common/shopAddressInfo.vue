<template>
 <el-form-item id="mt-address-box" label="商家地址: " :required="true">
   <fieldset>
     <el-form :inline="true"  class="demo-form-inline" label-width="100px" label-position="right">
       <div class="mt-address-item">
        <el-form-item class="item-label" label="联系人: " :required="true">
            <el-input @change="contactorChange" v-model="contactor" placeholder="请输入联系人" :disabled="noEdit"></el-input>
        </el-form-item>
        <el-form-item class="item-label"  label="联系电话: " :required="true">
            <el-input @change="contactPhoneChange" v-model="contactPhone" placeholder="请输入联系电话" :disabled="noEdit"></el-input>
        </el-form-item>
      </div>
      <div class="mt-address-item">
       <el-form-item label="所在地区" :required="true">
        <el-select v-model="provinceId" @change = "proviceChange" clearable  placeholder="选择省份" :disabled="noEdit">
              <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
          </el-select>
          <el-select v-model="cityId" @change = "cityChange" clearable placeholder="选择城市" :disabled="noEdit">
              <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
          </el-select>
          <el-select v-model="areaId" @change="areaChange" clearable placeholder="选择区域" :disabled="noEdit" >
              <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="mt-address-item mt-address-detail">
         <el-form-item label="详细地址:" :required="true">
           <el-input v-model="detailAddress" @change="detailAddressChange" placeholder="请输入详细地址" :disabled="noEdit"></el-input>
         </el-form-item>
      </div>
    </el-form>
  </fieldset>
 </el-form-item>  
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['shopAddressInfo'],
  data () {
    return {
      contactor: '',
      contactPhone: '',
      provinceId: '',
      cityId: '',
      areaId: '',
      detailAddress: '',
      noEdit: false
    }
  },
  computed: {
    ...mapGetters({
      provinceList: 'provinceList',
      cityList: 'cityList',
      regionList: 'regionList',
      bizUserMccList: 'bizUserMccList',
      applyPreData: 'applyPreData'
    })
  },
  methods: {
    proviceChange () {
      this.cityId = ''
      this.$eventBus.$data['shopInfo']['provinceId'] = this.provinceId
      this.$store.dispatch('getCityList', this.provinceId)
    },
    cityChange () {
      this.areaId = ''
      this.$eventBus.$data['shopInfo']['cityId'] = this.cityId
      this.$store.dispatch('getRegionList', this.cityId)
    },
    contactorChange () {
      this.$eventBus.$data['shopInfo']['contactor'] = this.contactor
    },
    contactPhoneChange () {
      this.$eventBus.$data['shopInfo']['contactPhone'] = this.contactPhone
    },
    areaChange () {
      this.$eventBus.$data['shopInfo']['areaId'] = this.areaId
    },
    detailAddressChange () {
      this.$eventBus.$data['shopInfo']['detailAddress'] = this.detailAddress
    }
  },
  watch: {
    shopAddressInfo () {
      this.shopInfo = this.shopAddressInfo
      if (this.shopInfo) {
        this.provinceId = this.shopInfo.provinceId
        this.cityId = this.shopInfo.cityId
        this.areaId = this.shopInfo.areaId
        this.contactor = this.shopInfo.contactor
        this.contactPhone = this.shopInfo.contactPhone
        this.detailAddress = this.shopInfo.detailAddress

        this.$eventBus.$data['shopInfo'] = {
          contactor: this.contactor,
          contactPhone: this.contactPhone,
          provinceId: this.provinceId,
          cityId: this.cityId,
          areaId: this.areaId,
          detailAddress: this.detailAddress
        }

        if (this.provinceId) {
          this.$store.dispatch('getCityList', this.provinceId)
        }
        if (this.cityId) {
          this.$store.dispatch('getRegionList', this.cityId)
        }
      }
    }
  },
  mounted () {
    this.$eventBus.$data['shopInfo'] = {}
    this.$store.dispatch('getProvinceList')
  }
}
</script>
<style>
 #mt-address-box {
   display: inline-flex
 }
 #mt-address-box fieldset {
   border: 1px #E4E7ED solid;
 }
 #mt-address-box .mt-address-item {
   overflow: hidden;
   padding: 5px 0;
 }
 #mt-address-box .mt-address-item .el-input {
   width: 150px
 }
 #mt-address-box .mt-address-detail .el-input {
   width: 340px
 }
 #mt-address-box .mt-address-item .el-select {
   margin-right: 5px
 }
</style>


