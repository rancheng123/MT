<template>
 <div class="app-box">
  <el-container>
    <el-header>
      <i class="el-icon-menu"></i>
      {{title}}
    </el-header>
    <el-container>
        <layout-aside></layout-aside>
        <el-main>
          <bread-crumb :required="breadRequired"></bread-crumb>
          <div class="main-inner">
            <slot></slot>
          </div>
        </el-main>
    </el-container>
  </el-container>
  <page-config></page-config>
 </div>
</template>
<script>

import Aside from './Aside.vue'
import BreadCrumb from './BreadCrumb.vue'
import PageConfig from './PageConfig.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: '供应链前端系统集成平台'
    }
  },
  computed: {
    ...mapGetters({
      breadRequired: 'breadRequired'
    })
  },
  components: {
    layoutAside: Aside,
    breadCrumb: BreadCrumb,
    pageConfig: PageConfig
  }
}
</script>
<style>
#app {
  height: 100%;
}
.app-box {
  height: 100%;
  display: box;
  display: -webkit-box;
  position: relative;
  overflow: hidden;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #409eff;
    text-align: left;
    line-height: 60px;
    font-size: 23px;
    font-weight: 400;
    font-family: Hiragino Sans GB;
    background: #409EFF;
    color: #fff
}
 
.el-aside {
  background-color: #545c64;
}
.el-main {
  background: #ffffff;
  color: #333;
}

.el-main .main-inner {
  background-color: #E9EEF3;
  padding: 5px;
  border-radius: 2px
}

.el-container {
  height: 100%;
}
</style>

