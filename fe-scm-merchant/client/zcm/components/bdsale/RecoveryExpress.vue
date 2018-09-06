<template>
  <el-dialog 
   :visible="recoveryExpressPop"
   @close="close">
     <el-form :inline="true" class="apply-pop" label-width="100px">
        <div class="apply-user">
            <div class="user-item">
                <label>受理人：</label>
                <label>{{umis}}</label>
            </div>
        </div>
        <div class="form-item form-item-old">
          <el-form-item label="服务类型: ">
            <span>{{+deviceInfo.applyType === 1 ? '退机' : '换机'}}</span>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="快递单号: ">
            <el-input placeholder="请输入快递单号" v-model="trackingNo"></el-input>
          </el-form-item>
        </div>
       <div class="form-item form-btn">
         <el-button :loading="loading" @click="next" type="primary">提交</el-button>
         <el-button @click="cancel" plain>取消</el-button>
       </div>
     </el-form>
  </el-dialog>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
  props: ['recoveryExpressPop', 'deviceInfo'],
  data () {
    return {
      deviceType: '',
      trackingNo: '',
      loading: false,
      applyType: '',
      deviceSn: ''
    }
  },
  computed: {
    ...mapGetters({
      umis: 'umis',
      uid: 'uid'
    })
  },
  methods: {
    close () {
      this.$emit('popClose')
    },
    cancel () {
      this.close()
    },
    next () {
      let self = this
      if (!(/^[A-Za-z0-9]+$/.test(self.trackingNo))) {
        this.$alert('快递单号不合法', '提示', {
          confirmButtonText: '确定'
        })
        return false
      }
      self.loading = true
      this.$store.dispatch(`trackInfo`, {
        applyType: self.deviceInfo.applyType,
        applyId: self.deviceInfo.applyId,
        trackingType: 2,
        trackingNo: self.trackingNo,
        operator: self.uid
      }).then(result => {
        self.loading = false
        if (result.data &&
            result.data.code === 200 &&
            result.data.data.status === 200) {
          this.$alert('回收成功！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              self.close()
            }
          })
        } else {
          let errorMsg = ''
          if (result.data.code !== 200) {
            errorMsg = result.data.message
          } else {
            errorMsg = result.data.data.msg
          }
          this.$alert(errorMsg, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  }
}
</script>
<style>
 .apply-pop .apply-user {
    display: -webkit-box;
    height: 30px;
    border-bottom: 1px solid #E4E7ED;
 }
 .apply-pop .apply-user .user-item {
   -webkit-box-flex: 1;
   text-align: left;
 }
 .el-dialog__body {
    padding: 0px 20px 0px 20px;
    position: relative;
    overflow: hidden;
 }
 .apply-pop .form-item {
     position: relative;
     overflow: hidden;
     margin: 15px 0px 0px 0px;
 }
 .apply-pop .form-item fieldset {
   text-align: left;
   border: solid 1px #E4E7ED;
 }
.apply-pop .form-item-old fieldset {
    border: solid 2px #cdcfd2;
 }
 .apply-pop .form-item .form-item-info {
   position: relative;
   overflow: hidden;
 }
 .apply-pop .el-form-item {
   margin: 0px;
   float: left;
 }
 .apply-pop .el-input {
   width: 250px
 }
 .apply-pop .form-btn {
    border-top: solid 1px #E4E7ED;
    padding: 10px 0px;
    text-align: right;
    padding-right: 5%;
 }
</style>

