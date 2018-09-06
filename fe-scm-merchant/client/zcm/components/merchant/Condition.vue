<template>
  <div class="merchant-condition">
    <el-form label-width="120px" class="demo-form-inline">
      <div class="form-inline-box">
        <el-form-item label="门店ID:" >
          <el-input placeholder="门店ID" v-model="searchParams.shopId"></el-input>
        </el-form-item>
        <el-form-item label="门店名称:">
          <el-input placeholder="门店名称" v-model="searchParams.receiptName"></el-input>
        </el-form-item>
        <el-form-item label="门店所属省份:"  v-show="!complianceRole">
         <el-select v-model="searchParams.provinceId" @change = "proviceChange" clearable  placeholder="请选择">
            <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店所属城市:" v-show="!complianceRole">
          <el-select v-model="searchParams.cityId" clearable placeholder="请选择">
              <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家账号:" v-show="!complianceRole">
          <el-input placeholder="商家账号" v-model="searchParams.ecomAccount"></el-input>
        </el-form-item>
        <el-form-item label="设备SN号:" v-show="!complianceRole">
          <el-input placeholder="设备SN号" v-model="searchParams.deviceSN"></el-input>
        </el-form-item>
        <el-form-item label="商家手机号:">
          <el-input placeholder="商家手机号" v-model="searchParams.contractTel"></el-input>
        </el-form-item>
         <el-form-item class="condition-more" ref='conditionMore' v-show="adminRole">
           <div class="">
             <i :class="{'el-icon-arrow-down': true, 'el-icon-arrow-up': arrowUp, 'el-icon-arrow-transition': true}"></i>
             <em>更多查询</em>
           </div>
        </el-form-item>
      </div>
      <el-collapse-transition>
       <div v-if="adminRole && conditionMore">
        <el-form-item label="是否有交易:">
          <el-radio-group v-model="searchParams.tradeDay">
            <el-radio v-for="item in tradeDayOptions" :label="item.key" :key="item.key">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商户类型:">
          <el-radio-group v-model="searchParams.merchantType">
            <el-radio v-for="item in merchantTypeOptions" :label="item.key" :key="item.key">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结算类型:">
          <el-radio-group v-model="searchParams.accountType">
            <el-radio v-for="item in accountTypeOptions" :label="item.key" :key="item.key">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="法人结算:">
          <el-checkbox-group v-model="searchParams.legalPersonSettlement">
            <el-checkbox v-for="item in legalPersonSettlementOptions" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="form-inline-checkbox">
          <el-form-item label="信息完整度:">
            <el-checkbox-group v-model="searchParams.shopFullInfoComplete">
              <el-checkbox v-for="item in shopFullInfoCompleteOptions" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="searchParams.shopBaseinfoComplete">
              <el-checkbox v-for="item in shopBaseinfoCompleteOptions" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="searchParams.shopQualificationComplete">
              <el-checkbox v-for="item in shopQualificationCompleteOptions" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="searchParams.shopSettleComplete">
              <el-checkbox v-for="item in shopSettleCompleteOptions" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="form-inline-checkbox">
          <el-form-item label="开通某一类产品:">
            <el-checkbox-group v-model="searchParams.codeOpen">
              <el-checkbox v-for="item in codeOpenOptions" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="searchParams.bankCardOpen">
              <el-checkbox v-for="item in bankCardOpenOptions" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <el-form-item label="开通指定产品:">
          <el-checkbox-group v-model="searchParams.productTypes">
            <el-checkbox
              v-for="productType in productTypeList"
              v-if="productType.type"
              :label="productType.type"
              :key="productType.key">
              {{productType.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
       </div>
      </el-collapse-transition>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button
            v-if="adminRole"
            type="primary"
            icon="el-icon-download"
            @click="onExport(1)"
            :disabled="exportMsg.btnDisabled">按门店维度导出</el-button>
        <el-button
            v-if="adminRole"
            type="primary"
            icon="el-icon-download"
            @click="onExport(2)"
            :disabled="exportMsg.btnDisabled">按设备维度导出</el-button>
        <p v-if="adminRole">
          点击导出按钮后服务器将生成导出内容，根据数据量此过程可能需要几分钟。<br>
          请<a href="/zcm/merchant/export">点击此处</a>进入导出记录页，查看和下载导出的内容。
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const tradeDayOptions = [
  { key: -1, label: '不限' },
  { key: 1, label: '近7天有交易' },
  { key: 2, label: '近一个月有交易' }
]

const merchantTypeOptions = [
  { key: -1, label: '不限' },
  { key: 1, label: '企业法人' },
  { key: 2, label: '个体工商户' },
  { key: 3, label: '小微商户' }
]

const accountTypeOptions = [
  { key: -1, label: '不限' },
  { key: 1, label: '对公结算' },
  { key: 2, label: '对私结算' }
]

const legalPersonSettlementOptions = [
  { key: 1, label: '法人结算' }
]

const shopFullInfoCompleteOptions = [
  { key: 1, label: '全部信息完整' }
]

const shopBaseinfoCompleteOptions = [
  { key: 1, label: '门店基础信息完整' }
]

const shopQualificationCompleteOptions = [
  { key: 1, label: '门店资质信息完整' }
]

const shopSettleCompleteOptions = [
  { key: 1, label: '结算信息完整' }
]

const codeOpenOptions = [
  { key: 1, label: '码业务' }
]

const bankCardOpenOptions = [
  { key: 1, label: '银行卡业务' }
]

const COMPLIANCEROLE = '内部合规风控人员'

export default {
  name: 'condition',
  props: ['provinceList', 'productTypeList', 'exportMsg'],
  data () {
    return {
      conditionMore: false,
      arrowUp: false,
      tradeDayOptions,
      merchantTypeOptions,
      accountTypeOptions,
      legalPersonSettlementOptions,
      shopFullInfoCompleteOptions,
      shopBaseinfoCompleteOptions,
      shopQualificationCompleteOptions,
      shopSettleCompleteOptions,
      codeOpenOptions,
      bankCardOpenOptions,
      searchParams: {
        shopId: '',
        receiptName: '',
        provinceId: '',
        cityId: '',
        ecomAccount: '',
        deviceSN: '',
        contractTel: '',
        tradeDay: '',
        merchantType: '',
        accountType: '',
        shopBaseinfoComplete: [],
        shopQualificationComplete: [],
        shopSettleComplete: [],
        shopFullInfoComplete: [],
        legalPersonSettlement: [],
        productStatusList: [],
        codeOpen: [],
        bankCardOpen: [],
        productTypes: []
      },
      complianceRole: false,
      adminRole: false,
      commonRole: false,
      requestData: false
    }
  },
  computed: {
    ...mapGetters({
      cityList: 'cityList',
      businessLoadMsg: 'businessLoadMsg',
      userRole: 'userRole',
      uRole: 'uRole'
    })
  },
  methods: {
    proviceChange (provinceId) {
      this.searchParams.cityId = ''
      this.$store.dispatch('getCityList', provinceId)
    },
    getParams () {
      let params = {}
      params['pageNum'] = 1
      params['pageSize'] = 10

      Object.keys(this.searchParams).forEach(key => {
        const value = this.searchParams[key]
        const isArr = Array.isArray(value)
        if ((!isArr && value) || (isArr && value.length > 0)) {
          params[key] = value
          this.requestData = this.requestData || true
        }
      })

      return params
    },
    onSearch () {
      this.requestData = false
      this.getParams()

      if (!this.requestData) {
        this.$store.commit('setBusinessInfo', [])
        return false
      }
      this.$store.dispatch('setBusinessSearch', this.getParams())
      this.$store.dispatch('setBusinessLoadMsg', {
        loading: true,
        pagination: 1
      })
      this.$emit('conditionSearch', this.getParams())
    },
    onExport (type) {
      const params = this.getParams()
      params['downLoadType'] = type
      this.$store.dispatch('setExportMsg', {
        btnDisabled: true,
        errorMsg: '',
        successMsg: ''
      })
      this.$emit('exportMerchant', params)
    },
    conditionMoreEvent () {
      let vConditionMore = this.$refs.conditionMore

      if (vConditionMore && vConditionMore.$el) {
        let ele = vConditionMore.$el
        ele.addEventListener('click', e => {
          this.arrowUp = !this.arrowUp
          this.conditionMore = !this.conditionMore
        })
      }
    }
  },
  mounted () {
    let uRoles = this.uRole.split(',')
    this.$store.dispatch('getUserRole')
    /**
     * 风控人员
     */
    this.complianceRole = uRoles.some(item => item === COMPLIANCEROLE)
    /**
     * 合规系统管理员
     */
    this.adminRole = uRoles.some(item => item === '合规系统管理员')
    /**
     * 合规系统普通用户
     */
    this.commonRole = uRoles.some(item => item === '合规系统普通用户')
    // 点击更多条件
    this.conditionMoreEvent()
  }
}
</script>

<style lang="less">
 .merchant-condition {
   position: relative;
   overflow: hidden;
   background: #fff;
   .el-form {
    width: 90%;
    margin: 0 auto;
    text-align: left;
   }
   .el-icon-arrow-transition {
     transition: all 300ms;
   }
   .el-input {
      width: 200px
   }
   .el-form--inline .el-form-item__label {
      float: left;
      width: 100px;
      text-align: left;
    }
    .condition-more {
      & > div {
        margin-left: 0px !important;
        color: #409EFF;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .form-inline-checkbox {
      .el-checkbox-group{
        display: inline-block;
        margin-right: 30px;
      }
    }
    .form-inline-box {
      margin-bottom: 20px;
      &::after {
        display: table;
        content: '';
        clear: both;
      }
      .el-form-item {
        float: left;
        margin: 10px 30px 10px 0px;
      }
    }
 }
</style>

