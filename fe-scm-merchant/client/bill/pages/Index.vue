<template>
  <el-container>
     <el-header>{{ title }}
       <div class="user-info">
         <span>Hi，</span>
         <span>{{ uname }}</span>
       </div>
     </el-header>
     <el-main>
        <div>
          <ul class="bread-crumb">
            <li class="item-crumb">
              <a :href="referrer">批量上单</a>
            </li>
            <li> > </li>
            <li class="item-crumb">当前页</li>
          </ul>
        </div>
        <el-tabs v-model="activeName" @tab-click="tabClickHandle">
          <el-tab-pane label="门店信息" name="shopinfo">
          </el-tab-pane>
          <el-tab-pane label="门店资质" name="shopqfc">
          </el-tab-pane>
          <el-tab-pane label="结算账户" name="setaccount">
          </el-tab-pane>
          <el-tab-pane label="费率" name="rate">
          </el-tab-pane>
          <router-view></router-view>
        </el-tabs>
     </el-main>
  </el-container>
</template>

<script>

import { mapGetters } from 'vuex'
import common from '../../common/util.js'

export default {
  name: 'BillIndex',
  data () {
    return {
      title: '供应链上单管理系统',
      activeName: '',
      referrer: '#',
      batchFlowId: '',
      pageNum: ''
    }
  },
  computed: {
    ...mapGetters({
      uname: 'uname',
      tab: 'tab'
    })
  },
  components: {
  },
  methods: {
    tabClickHandle (params) {
      this.shopId = this.$route.query.shopId
      if (this.batchFlowId && this.pageNum) {
        this.$router.push(`/bill/qrcode/${this.activeName}?shopId=${this.shopId}&batchFlowId=${this.batchFlowId}&pageNum=${this.pageNum}`)
      } else {
        this.$router.push(`/bill/qrcode/${this.activeName}?shopId=${this.shopId}`)
      }
      // TODO 针对于单页做pv/uv统计
    }
  },
  watch: {
    tab () {
      this.activeName = this.tab
    }
  },
  mounted () {
    this.shopId = this.$route.query.shopId
    this.batchFlowId = this.$route.query.batchFlowId
    this.pageNum = this.$route.query.pageNum
    this.activeName = this.tab

    if (this.batchFlowId && this.pageNum) {
      this.referrer = `${common.getHostMapping()}pc/batchFlow/${this.batchFlowId}/${this.pageNum}`
    } else {
      this.referrer = `${common.getHostMapping()}pc/batchFlow`
    }

    console.log(`-----------------------------
    系统异常请联系吴空(wukong@meituan.com)
    -----------------------------`)
  }
}
</script>

<style scoped>
  .bread-crumb {
    display: -webkit-box;
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    font-size: 12px;
    background: #fff;
    padding: 10px 5px;
    border: 1px solid #e9eef3;
  }
  .bread-crumb li {
    margin-right: 5px
  }
  .bread-crumb li a {
    text-decoration: none;
  }
  a:hover, a:visited, a:link, a:active {
    color: #409EFF;
  }
  .bread-crumb .item-crumb {
     cursor: pointer;
     color: #409EFF;
   }
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
    line-height: 60px;
    font-size: 23px;
    font-weight: 400;
    font-family: Hiragino Sans GB;
    background: #409EFF;
    color: #fff
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-icon-arrow-right {
    font-size: 12px
  }
</style>