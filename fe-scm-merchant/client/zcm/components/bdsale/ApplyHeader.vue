<template>
    <div class="recall-apply-head" v-if="typeof headData === 'object'">
      <div class="head-title">{{headData.title}}</div>
      <div v-if="tipShow" class="head-tip">此为特殊业务</div>
      <div class="head-list">
        <span v-if="headData.protocolUrl" @click="protocolHandle">{{headData.protocol}}</span>
        <span v-if="headData.ruleUrl" @click="ruleHandle">{{headData.rule}}</span>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['headData'],
  computed: {
    ...mapGetters({
      tipShow: 'tipShow'
    })
  },
  methods: {
    protocolHandle () {
      if (this.headData && this.headData.protocolUrl) {
        window.open(this.headData.protocolUrl)
      }
    },
    ruleHandle () {
      if (this.headData && this.headData.ruleUrl) {
        window.open(this.headData.ruleUrl)
      }
    }
  }
}
</script>
<style>
  .recall-apply-head {
      position: relative;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
      border: 1px solid #EBEEF5;
      background: #fff;
      color: #606266;
      padding: 0 5px
  }
  .recall-apply-head .head-title {
      float: left;
      font-weight: 400;
      font-size: 17px;
      cursor: pointer;
  }
  .recall-apply-head .head-list {
      float: right;
      font-size: 12px;
      color: #409EFF;
      cursor: pointer;
  }
  .recall-apply-head .head-list span {
      margin-left: 10px
  }
  .recall-apply-head .head-tip {
    color: white;
    font-weight: 400;
    background:#F56C6C;
    width: 50%;
    margin: auto;
  }
</style>


