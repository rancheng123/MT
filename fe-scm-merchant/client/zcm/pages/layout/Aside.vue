<template>
 <div class="aside-box" :class="{'el-aside-paved': aside_paved,'el-aside-enter': !aside_paved}">
   <el-aside width="200px">
      <el-menu
      :default-active="asideActiveId"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="p + ''" v-for="(item, p) in menuList" :key="p">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
          <el-menu-item @click="itemTapHandle(child.router, child.index)" v-for="(child, c) in item.children" :key="c" :index="child.index || ''">{{child.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
   </el-aside>
    <div class="menu-ctl" @click="asidePavedHandle">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="ellipsis-icon"><path d="M9.5 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#545c64" fill-rule="evenodd"></path></svg>
    </div>
    <div class="menu-setting">
      <el-tooltip class="item" effect="dark" content="菜单配置" placement="top">
        <el-button icon="el-icon-setting" @click="menuSetting" size="small" circle ></el-button>
      </el-tooltip>
    </div>
    <setting-dialog  
      :title="menuSetTitle" 
      :settingPop="menuSetPop"
      :action="action"
      @popClose="popClose">
    </setting-dialog>
 </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      aside_paved: true,
      menuSetPop: false,
      menuList: [],
      action: 'setMenus',
      content: '',
      menuSetTitle: '修改菜单配置'
    }
  },
  components: {
    /**
     * 弹窗需异步加载
     */
    settingDialog: resole => require(['../../components/common/SetMenusDialog.vue'], resole)
  },
  computed: {
    ...mapGetters({
      asideActiveId: 'asideActiveId',
      menus: 'menus'
    })
  },
  methods: {
    menuSetting () {
      this.menuSetPop = true
    },
    popClose () {
      this.menuSetPop = false
    },
    asidePavedHandle () {
      this.aside_paved = !this.aside_paved
    },
    itemTapHandle (router, index) {
      if (router && index) {
        this.$router.push(`${router}?zcm_active_index=${index}`)
        this.$store.dispatch('set_Aside_Active_Id', index)
      } else {
        this.$notify({
          title: '警告',
          message: '菜单跳转字段配置不正确',
          type: 'warning'
        })

        return false
      }
    }
  },
  watch: {
    menus: function () {
      this.menuList = this.menus
    }
  },
  created () {
    let pathName = window.location.pathname
    if (pathName.indexOf('zcm/merchant/') > -1) {
      this.aside_paved = true
    }
  },
  async mounted () {
    let zcmActiveIndex = this.$route.query.zcm_active_index || ''

    this.$store.dispatch('set_Aside_Active_Id', zcmActiveIndex)
    await this.$store.dispatch('getMtConfig', {key: 'tc_menus'})
    try {
      this.menuList = JSON.parse(this.menus)
    } catch (e) {
      throw Error('字符串序列化异常')
    }
  }
}
</script>
<style>
 .aside-box {
    position: relative;
    width: 200px;
 }
 .el-aside-paved {
   margin-left: -200px;
   transition: margin 200ms;
 }
 .el-aside-enter {
   margin-left: 0;
   transition: margin 200ms;
 }
 .el-aside {
   height: 100%;
 }
 .el-submenu .el-menu-item {
   height: 30px;
   line-height: 30px;
   font-size: 13px;
 }
 .el-submenu__title {
   height: 40px;
   line-height: 40px
 }
 .aside-box .menu-ctl {
    position: absolute;
    right: -13px;
    cursor: pointer;
    top: 50%
 }
 .aside-box .menu-setting {
   position: absolute;
   top: 0;
   right: 0;
   width: 20px;
   height: 20px;
 }
 .aside-box .menu-setting .el-button {
   background: none;
   border: none;
   padding: 0
 }
 .aside-box .menu-setting .el-icon-setting {
   color: #ffffff
 }
</style>


