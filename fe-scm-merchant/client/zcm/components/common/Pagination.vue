
<template>
    <div class="el-pagination-box">
      <el-pagination 
        @current-change="currentChange"     
        background
        layout="total, prev, pager, next, jumper"
        :total="totalCount"
        :page-size="pageSize"
        :page-sizes="[100, 200, 300, 400, 500, 1000]"
        >
      </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['totalCount', 'pageSize'],
  data () {
    return {
    }
  },
  methods: {
    currentChange (currentPage) {
      this.$emit('conditionSearch', currentPage)
    }
  }
}
</script>
<style>
  .el-pagination-box {
    width: 90%;
    margin: 20px auto;
    position: relative;
    overflow: hidden;
  }
  .el-pagination-box .el-pagination {
    float: right;
  }
</style>


