<template>
  <div>
        <el-table
        :data="shopCheckList"
        v-loading="shopCheckLoadMsg.loading"
        border
        style="margin: 0 auto">
        <el-table-column
        prop="visitTime"
        label="巡检日期">
        </el-table-column>
        <el-table-column
        prop="status"
        label="门店经营情况">
        </el-table-column>
        </el-table>
        <div class="el-pagination-box" v-show="shopCheckLoadMsg.totalCount > 0">
           <el-pagination 
                @current-change="currentChange"     
                background
                layout="total, prev, pager, next, jumper"
                :total="shopCheckLoadMsg.totalCount"
                :page-size="15"
                :current-page="shopCheckLoadMsg.pagination"
                :page-sizes="[100, 200, 300, 400, 500, 1000]"
                >
            </el-pagination>
        </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'MerchantIndex',
  data () {
    return {
      title: '商户巡检记录',
      pageSize: 15,
      shopId: ''
    }
  },
  computed: {
    ...mapGetters({
      provinceList: 'provinceList',
      uname: 'uname',
      shopCheckList: 'shopCheckList',
      shopCheckLoadMsg: 'shopCheckLoadMsg'
    })
  },
  methods: {
    currentChange (currentPage) {
      this.$store.dispatch('setShopCheckLoadMsg', {
        loading: true
      })
      this.$store.dispatch('getShopCheckInfo', {
        shopId: this.shopId,
        pageNum: currentPage,
        pageSize: this.pageSize
      })
    }
  },
  mounted () {
    this.shopId = this.$route.query.shopId

    this.$store.dispatch('setBreadRequired', true)
    this.$store.dispatch('getShopCheckInfo',
      {
        shopId: this.shopId,
        pageNum: 1,
        pageSize: this.pageSize
      })
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

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #409eff;
    text-align: left;
    line-height: 30px;
    font-size: 25px;
    font-weight: bolder;
    background: #fff
  }
  
  .el-pagination-box {
    width: 90%;
    margin: 20px auto;
  }
  .el-pagination-box .el-pagination {
    float: right;
  }
</style>