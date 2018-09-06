<template>
  <el-dialog 
   :visible="warehousePop"
   width="55%"
   @close="close">
     <el-form :inline="true" class="apply-pop" label-width="120px">
        <div class="apply-user">
            <div class="user-item">
                <label>受理人：</label>
                <label>{{umis}}</label>
            </div>
        </div>
        <div class="form-item form-item-old">
          <fieldset>
            <div class='form-item-info'>
                <el-form-item label="取回方式: ">
                  <span>{{oldDeviceType}}</span>
                </el-form-item>
            </div>
            <div class='form-item-info'>
                <el-form-item label="设备信息: ">
                  <span>{{oldDeviceType}}</span>
                </el-form-item>
            </div>
            <div class='form-item-info'>
              <el-form-item label="SN码: ">
                <span>{{oldDeviceSn}}</span>
              </el-form-item>
            </div>
          </fieldset>
        </div>
        <div class="form-item">
          <el-form-item label="设备状态: " :required="true">
            <el-select  v-model="deviceStatus" clearable placeholder="请选择">
                <el-option
                v-for="item in deviceStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
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
  props: ['warehousePop', 'deviceInfo'],
  data () {
    return {
      loading: false,
      deviceStatus: 0,
      deviceStatusList: [],
      oldDeviceMode: '',
      oldDeviceSn: '',
      oldDeviceType: '',
      mailType: '',
      shopInfo: {},
      mailno: '',
      expressNeed: false
    }
  },
  computed: {
    ...mapGetters({
      umis: 'umis',
      uid: 'uid',
      mailTypes: 'mailTypes'
    })
  },
  watch: {
    warehousePop: function () {
    }
  },
  methods: {
    close () {
      this.$emit('popClose')
    },
    cancel () {
      this.close()
    },
    next () {
    }
  }
}
</script>
<style lang="less" scoped>
 .apply-pop {
   .apply-user {
      display: -webkit-box;
      height: 30px;
      border-bottom: 1px solid #E4E7ED;
      .user-item {
        -webkit-box-flex: 1;
        text-align: left;
      }
    }
    .form-item {
       position: relative;
       overflow: hidden;
       fieldset {
         text-align: left;
         border: solid 1px #E4E7ED;
         background: #F2F6FC;
         border-radius: 2px;
       }
       .form-item-info {
         position: relative;
         overflow: hidden;
        }
    }
    .el-form-item {
      margin: 0px;
      float: left;
    }
    .el-input {
      width: 250px
    }
    .form-btn {
      border-top: solid 1px #E4E7ED;
      padding: 10px 0px;
      text-align: right;
      padding-right: 5%;
    }
 }
 .el-dialog__body {
    padding: 0px 20px 0px 20px;
    position: relative;
    overflow: hidden;
 }
</style>

