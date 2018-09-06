
<template>
    <div class="el-pagination-box" v-show="totalCount">
      <el-pagination 
        @current-change="currentChange"     
        background
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
        :page-size="10"
        :current-page="businessLoadMsg.pagination"
        :page-sizes="[100, 200, 300, 400, 500, 1000]"
        >
      </el-pagination>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  props: ['totalCount'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      businessSearch: 'businessSearch',
      businessLoadMsg: 'businessLoadMsg'
    })
  },
  methods: {
    currentChange (currentPage) {
      this.businessSearch.pageNum = currentPage
      this.$store.dispatch('setBusinessLoadMsg', {loading: true, pagination: 1})
      this.$store.dispatch('getBusinessInfo', this.businessSearch)
    }
  }
}
</script>
<style>
  .el-pagination-box {
    width: 90%;
    margin: 20px auto;
  }
  .el-pagination-box .el-pagination {
    float: right;
  }
</style>


