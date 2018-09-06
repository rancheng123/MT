<template>
  <div class="dialog-box">
    <el-dialog 
    :visible="settingPop"
    :title="title"
    @close="close">
        <el-form :inline="true" class="setting-pop" label-width="100px">
        <div class="form-item">
            <el-input
            type="textarea"
            :rows="20"
            placeholder="请输入内容"
            v-model="settingJSON">
            </el-input>
        </div>
        <div class="form-item form-btn">
            <el-button :loading="loading" @click="save" type="primary">保存</el-button>
            <el-button @click="cancel" plain>取消</el-button>
        </div>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import Ls from '../../common/LS'

const LS = new Ls()

export default {
  props: ['settingPop', 'title', 'content', 'action'],
  data () {
    return {
      loading: false,
      settingJSON: '',
      original: ''
    }
  },
  computed: {
    ...mapGetters({
      umis: 'umis',
      menus: 'menus',
      setMtConfigSuccess: 'setMtConfigSuccess'
    })
  },
  methods: {
    reset () {
      this.loading = false
      this.settingJSON = JSON.stringify(this.original, null, 2)
      this.$store.dispatch(this.action, this.original)
    },
    close () {
      this.$emit('popClose')
      this.reset()
    },
    cancel () {
      this.close()
    },
    save () {
      this.loading = true
      this.$store.dispatch('setMtConfig', {
        key: 'tc_menus',
        value: this.settingJSON
      }).then(result => {
        this.loading = false
        if (result.data && result.data.code !== 200) {
          this.$message.error('配置信息保存失败！')
        } else {
          this.$message({
            message: '配置信息保存成功！',
            type: 'success'
          })
          /**
           * 保存成功之后，更新一下本地store
           */
          this.original = JSON.parse(this.settingJSON)
        }
      })
    }
  },
  watch: {
    settingJSON: function () {
      try {
        this.$store.dispatch(this.action, JSON.parse(this.settingJSON))
      } catch (e) {
        this.$message.error('菜单配置JSON格式错误！')
      }
    }
  },
  mounted () {
    let tcMenus = LS.getItem('tc_menus') || []

    this.original = JSON.parse(tcMenus)
    this.settingJSON = JSON.stringify(this.original, null, 2)
  }
}
</script>
<style>
 .dialog-box .el-dialog__header {
    text-align: left;
 }
 .dialog-box .el-dialog__body {
    padding: 0px 20px 0px 20px;
    position: relative;
    overflow: hidden;
 }
 .setting-pop .form-item {
     position: relative;
     overflow: hidden;
     margin: 15px 0px 0px 0px;
 }
 .setting-pop .el-form-item {
   margin: 0px;
   float: left;
 }
 .setting-pop .el-input {
   width: 250px
 }
 .setting-pop .form-btn {
    border-top: solid 1px #E4E7ED;
    padding: 10px 0px;
    text-align: right;
    padding-right: 5%;
 }
</style>

