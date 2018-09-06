<template>
 <div class="detail-box">
    <apply-header :headData="headData"></apply-header>
    <div class="detail-card">
        <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
            <el-tab-pane label="申请信息" name="info"></el-tab-pane>
            <el-tab-pane label="退货信息" name="process"></el-tab-pane>
            <el-tab-pane label="日志信息" name="log"></el-tab-pane>
        </el-tabs>
        <div class="content-area">
          <transition :name="effect">
            <router-view></router-view>
          </transition>
        </div>
    </div>
 </div>
</template>
<script>

import ApplyHeader from '../../components/bdsale/ApplyHeader.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      effect: 'slide-fade',
      activeName: 'info',
      headData: {
        title: '撤机申请',
        protocol: '下载解约协议',
        rule: '退机规则wiki',
        protocolUrl: 'http://s0.meituan.net/bs/tempfs/file/wukong/20180507.pdf',
        ruleUrl: 'https://wiki.sankuai.com/pages/viewpage.action?pageId=1425086968'
      }
    }
  },
  computed: {
    ...mapGetters({
      tab: 'tab'
    })
  },
  components: {
    applyHeader: ApplyHeader
  },
  methods: {
    tabClick () {
      this.$router.push(
        {
          path: `/zcm/bdsale/device/recall/${this.activeName}`,
          query: {
            zcm_active_index: this.zcm_active_index,
            applyType: this.applyType,
            shopId: this.shopId,
            deviceSn: this.deviceSn,
            deviceType: this.deviceType,
            applyId: this.applyId,
            sceneCode: this.sceneCode,
            from: 'view'
          }
        }
      )
    }
  },
  watch: {
    tab: function () {
      this.activeName = this.tab
    }
  },
  mounted () {
    this.activeName = this.tab
    this.zcm_active_index = this.$route.query.zcm_active_index
    this.applyType = this.$route.query.applyType
    this.shopId = this.$route.query.shopId
    this.deviceSn = this.$route.query.deviceSn
    this.deviceType = +this.$route.query.deviceType
    this.applyId = +this.$route.query.applyId
    this.sceneCode = this.$route.query.sceneCode
  }
}
</script>
<style>
 .detail-card {
   background: #fff;
   margin-top: 5px;
 }

.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>