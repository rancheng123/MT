<template>
<div>
  <el-table
    v-loading="pageDataLoading"
    :data="pageDataSource"
    border
    style="width: 100%">
    <el-table-column v-for="(item, index) in tableColumn"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width">
    </el-table-column>
    <!-- <el-table-column
      v-if="pageDataSource.length > 0"
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <table-operate :scope="scope"></table-operate>
      </template>
      </el-table-column> -->
    </el-table>
</div>
</template>
<script>

import { mapGetters } from 'vuex'
import TableOperateBtn from './TableOperateBtn.vue'
export default {
  props: ['tableColumn'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      pageDataLoading: 'pageDataLoading',
      pageDataSource: 'pageDataSource'
    })
  },
  components: {
    TableOperate: TableOperateBtn
  }
}
</script>
<style>
 .el-table .warning-row {
    background: #f4f5f3;
  }

 .el-table .success-row {
   background: #f0f9eb;
 }
 .el-button {
   cursor: pointer;
 }
</style>


