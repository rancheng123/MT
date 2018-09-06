<template>
  <div class="merchant-box">
    <condition
        :provinceList="provinceList"
        :productTypeList="productTypeList"
        :exportMsg="exportMsg"
        @conditionSearch="onSearch"
        @exportMerchant="onExport"></condition>
    <infolist :businessList="businessInfoList" :businessLoadMsg="businessLoadMsg"></infolist>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Condition from '../../components/merchant/Condition.vue'
import InfoList from '../../components/merchant/InfoList.vue'

export default {
  name: 'MerchantIndex',
  data () {
    return {
      title: '商户信息系统'
    }
  },
  computed: {
    ...mapGetters({
      provinceList: 'provinceList',
      businessInfoList: 'businessInfoList',
      businessLoadMsg: 'businessLoadMsg',
      uname: 'uname',
      productTypeList: 'productTypeList',
      exportMsg: 'exportMsg'
    })
  },
  components: {
    condition: Condition,
    infolist: InfoList
  },
  methods: {
    onSearch (params) {
      this.$store.dispatch('getBusinessInfo', params)
    },
    onExport (params) {
      this.$store.dispatch('exportMerchant', params)
    }
  },
  watch: {
    businessLoadMsg: function (newValue) {
      if (newValue.errorMsg) {
        this.$alert(newValue.errorMsg, '提示', {
          confirmButtonText: '确定'
        })
      }
    },
    exportMsg: function (newValue) {
      if (newValue.errorMsg) {
        this.$alert(newValue.errorMsg, '提示', {
          confirmButtonText: '确定'
        })
      }

      if (newValue.successMsg) {
        this.$alert(newValue.successMsg, '提示', {
          confirmButtonText: '确定'
        })
      }
    }
  },
  async asyncData ({store, route}) {
    // store.dispatch('getBusinessInfo', {
    //   pageNum: 1,
    //   pageSize: 10
    // })
  },
  mounted () {
    this.$store.dispatch('setBusinessLoadMsg', {loading: false, pagination: 1})
    this.$store.dispatch('setBreadRequired', false)
    this.$store.dispatch('set_Aside_Active_Id', this.$route.query.zcm_active_index)
    this.$store.dispatch('getProvinceList')
    this.$store.dispatch('getProductTypeList')
  }
}
</script>

<style scoped>
  .user-info {
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 15px;
    font-weight: 400;
  }
  .merchant-box {
    position: relative;
    overflow: hidden;
  }
</style>