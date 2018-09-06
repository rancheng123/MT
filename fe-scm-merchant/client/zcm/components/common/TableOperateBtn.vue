<template>
    <div class="operate-btn">
        <el-button icon="el-icon-view" @click="detail(scope.row)" type="text" size="small">查看</el-button>
        <el-button v-if="scope.row.status === 3" icon="el-icon-edit" @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button v-if="(scope.row.process === 16 || scope.row.process === 8) && scope.row.applyType === 2" icon="el-icon-sort" @click="exchange(scope.row)" type="text" size="small">换绑</el-button>
        <el-button v-if="scope.row.enableRecycleTrackingNo === true" icon="el-icon-delete" @click="recovery(scope.row)" type="text" size="small">回收快递</el-button>
    </div>
</template>
<script>
export default {
  props: ['scope']
}
</script>
<style>
</style>


