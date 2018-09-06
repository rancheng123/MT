<template>
  <div class="list-container">
    <div class="list-condition">
       <condition @conditionSearch="onSearch"></condition>
    </div>
    <div class="list-display">
      <div class="list-apply">
        <span class="apply-btn" @click="saleApply">售后申请</span>
       </div>
      <data-list :dataList="deviceAuditInfo.deviceAuditList"></data-list>
    </div>
    <div class="list-pagination">
      <pagination :totalCount="deviceAuditInfo.totalCount" :pageSize="searchCondition.pageSize" @conditionSearch="onSearch"></pagination>
    </div>
    <sale-apply :saleApplyPop="saleApplyPop" @popClose="popClose"></sale-apply>
  </div>
</template>
<script>

import Condition from '../../components/bdsale/Condition.vue'
import DataList from '../../components/bdsale/DataList.vue'
import Pagination from '../../components/common/Pagination.vue'
import { mapGetters } from 'vuex'

let SaleApply = resole => require(['../../components/bdsale/SaleApply.vue'], resole)

export default {
  data () {
    return {
      saleApplyPop: false
    }
  },
  computed: {
    ...mapGetters({
      deviceAuditInfo: 'deviceAuditInfo',
      searchCondition: 'searchCondition'
    })
  },
  methods: {
    popClose () {
      this.saleApplyPop = false
    },
    saleApply () {
      this.saleApplyPop = true
    },
    onSearch (currentPage) {
      this.searchCondition && (this.searchCondition['pageNum'] = currentPage || 1)
      this.$store.dispatch('getDeviceAuditList', this.searchCondition)
    }
  },
  components: {
    condition: Condition,
    dataList: DataList,
    pagination: Pagination,
    saleApply: SaleApply
  },
  mounted () {
    this.$store.dispatch('setBreadRequired', false)
    this.$store.dispatch('getDeviceAuditList', this.searchCondition)
  },
  watch: {
    'deviceAuditInfo.loadMsg': function (loadMsg) {
      if (loadMsg) {
        this.$alert(loadMsg, '提示', {
          confirmButtonText: '确定'
        })
      }
    }
  }
}
</script>
<style>
.list-apply {
    margin: 5px 0px;
    position: relative;
    overflow: hidden;
    padding-right: 10px;
}
.list-apply .apply-btn {
  float: right;
  font-size: 15px;
  color: #409EFF;
  cursor: pointer;
}
</style>


 