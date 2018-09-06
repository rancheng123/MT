<template>
 <pagecontainer :loading="loading">
    <el-form :inline="true"  class="demo-form-inline" label-width="80px" label-position="left">
      <div class="shop-info-item" v-for="item in list">
        <el-form-item class="item-label" :label="item.label" :required="true">
            <el-input :disabled="true" v-model="item.deductionRate" ></el-input>
        </el-form-item>
      </div>
      <div class="shop-info-item submit">
        <el-button @click="onUp">上一步</el-button>
        <el-button v-loading="btnLoading" type="primary" @click="onNext">保存</el-button>
      </div>
    </el-form>
  </pagecontainer>
</template>
<script>

import axios from 'axios'
import PageContainer from './common/PageContainer.vue'
import common from '../../common/util.js'

export default {
  data () {
    return {
      list: [
      ],
      shopId: '',
      loading: false,
      btnLoading: false
    }
  },
  components: {
    pagecontainer: PageContainer
  },
  methods: {
    onUp () {
      this.redirect(`/bill/qrcode/setaccount?shopId=${this.shopId}`)
    },
    redirect (sourceUrl) {
      let batchFlowId = this.$route.query.batchFlowId
      let pageNum = this.$route.query.pageNum

      if (batchFlowId) {
        sourceUrl += `&batchFlowId=${batchFlowId}`
      }
      if (pageNum) {
        sourceUrl += `&pageNum=${pageNum}`
      }
      this.$router.push(sourceUrl)
    },
    onNext () {
      if (this.btnLoading) {
        return
      }
      this.btnLoading = true
      axios.post('/saveShopRate', {
        shopId: this.shopId,
        productType: 2
      }).then(result => {
        this.btnLoading = false
        let self = this
        if (result && result.status === 200) {
          if (result.data && result.data.data && result.data.data.status === 200) {
            this.$alert('保存成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.open(self.referrer, '_self')
              }
            })
          } else {
            this.$alert('服务器：' + result.data.data.msg, '提示', {
              confirmButtonText: '确定'
            })
          }
        } else {
          this.$alert('服务器：' + result.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  },
  mounted () {
    this.shopId = this.$route.query.shopId
    this.batchFlowId = this.$route.query.batchFlowId || ''
    this.pageNum = this.$route.query.pageNum || ''

    if (this.batchFlowId && this.pageNum) {
      this.referrer = `${common.getHostMapping()}pc/batchFlow/${this.batchFlowId}/${this.pageNum}`
    } else {
      this.referrer = `${common.getHostMapping()}pc/batchFlow`
    }

    this.loading = true
    axios.post('/getShopRate', {
      shopId: this.shopId,
      productType: 2
    }).then(result => {
      this.loading = false
      if (result && result.status === 200 && result.data.code === 200) {
        if (result.data.data.status === 200) {
          this.pageData = result.data.data
          this.list = []

          let types = ['借记卡：', '贷记卡：', '微信：', '支付宝：']

          this.pageData.data && this.pageData.data.forEach(item => {
            let index = +item.channel - 1
            item.label = types[index]

            if (+item.channel === 3 || +item.channel === 4) {
              this.list.push(item)
            }
          })
        } else {
          this.$alert('服务器：' + result.data.data.msg, '提示', {
            confirmButtonText: '确定'
          })
        }
      } else {
        this.$alert('服务器：' + result.data.message, '提示', {
          confirmButtonText: '确定'
        })
      }
    })
  }
}
</script>
<style>
 .shop-info-box {
   position: relative;
   overflow: hidden;
   width: 95%;
   margin: 0 auto;
   background: white;
   padding: 20px 20px
 }
 .shop-info-box .shop-info-item {
   position: relative;
   overflow: hidden;
   clear: both;
   margin-top: 20px;
   border-bottom: 1px #E4E7ED solid;
 }
 .shop-info-box .shop-info-item .el-form-item {
   float: left;
 }
 .submit .el-button--primary {
   margin-bottom: 20px;
 }
</style>