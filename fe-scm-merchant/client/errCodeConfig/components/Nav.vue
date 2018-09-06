<template>
<div class="bm-menu">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-submenu index="1">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span>错误码配置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link :to="'/mis/errCodeConfig/list'">错误码配置</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link :to="'/mis/errCodeConfig/invocation'">服务方管理</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span>公众号&小程序申请</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">申请配置</el-menu-item>
          <el-menu-item index="2-2">申请记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  // props: ['label', 'value'],
  methods: {

  }
}
</script>

<style lang="less">
.bm-menu{
  height: 100%;
  ul {
    height: 100%;
  }
  a:hover,  a:active, a:link, a:visited {
    color: #fff;
    text-decoration: none;
  }
  .el-menu-item.is-active a {
    color: #409EFF;
  }
}

</style>