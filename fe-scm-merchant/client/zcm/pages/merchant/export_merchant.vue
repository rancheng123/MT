<template>
  <div class="merchant-export-box">
    <el-table
        :data="exportInfo.list"
        v-loading="exportLoadMsg.loading"
        :row-class-name="tableRowClassName"
        border>
      <el-table-column
          prop="id"
          label="导出ID">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="modifyTime"
          label="修改时间">
      </el-table-column>
      <el-table-column
          prop="typeName"
          label="类型">
      </el-table-column>
      <el-table-column
          prop="statusName"
          label="状态">
      </el-table-column>
      <el-table-column
          label="操作"
      >
        <template slot-scope="scope">
          <a :href="scope.row.downloadUrl">下载</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import pagination from '../../components/merchant/Pagination.vue'

export default {
  name: 'MerchantIndex',
  data () {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters({
      exportLoadMsg: 'exportLoadMsg',
      exportInfo: 'exportInfo'
    })
  },
  components: {
    pagination
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    }
  },
  watch: {
    exportLoadMsg: function (newValue) {
      if (newValue.errorMsg) {
        this.$alert(newValue.errorMsg, '提示', {
          confirmButtonText: '确定'
        })
      }
    }
  },
  async asyncData ({store, route}) {
    store.dispatch('getExportInfo')
  }
}
</script>

<style scoped>
  .merchant-export-box {
    position: relative;
    overflow: hidden;
  }

  .merchant-export-box a{
    cursor: pointer;
    color: #409EFF;
  }
</style>