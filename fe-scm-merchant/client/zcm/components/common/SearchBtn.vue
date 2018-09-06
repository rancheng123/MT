<template>
 <el-form-item>
    <el-button :loading="loading" class="btn-search" type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
 </el-form-item>
</template>
<script>
export default {
  props: ['requestUrl', 'hostType', 'requestMethod'],
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$store.dispatch('getPageDataSource', {
        ...this.$eventBus.$data,
        requestUrl: this.requestUrl,
        requestMethod: this.requestMethod || 'post',
        hostType: this.hostType,
        pageSize: 10,
        pageNum: 1
      }).catch(e => {
        this.loading = false
        console.error(e)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .btn-search {
    margin-left: 10px;
  }
</style>

