<template>
  <div ref="pageConfig" class="page-config" :class="{'page-left': isOpen}" v-if="uRole.split(',').some(item => item === '页面配置管理')">
    <div class="menu-setting">
      <el-tooltip class="item" effect="dark" content="页面配置" placement="top">
        <el-button icon="el-icon-setting" @click="menuSetting" size="small" circle ></el-button>
      </el-tooltip>
    </div>
    <div class="page-title">
     <span>
         页面配置
     </span>
    </div>
    <div class="page-main">
      <div ref="jsoneditor" id="jsoneditor"></div>
    </div>
    <div class="page-footer">
      <el-button :loading="loading" @click="save" type="primary">保存</el-button>
      <el-button @click="cancel" plain>取消</el-button>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isOpen: false,
      settingJSON: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      currentPageConfig: 'currentPageConfig',
      currentPage: 'currentPage',
      uRole: 'uRole'
    })
  },
  watch: {
    isOpen () {
      if (this.isOpen) {
        this.$store.dispatch('getMtConfig', { key: this.currentPage }).then(result => {
          this.settingJSON = result
          this.editor && this.editor.set(JSON.parse(this.settingJSON))
        })
      }
    },
    settingJSON () {
      try {
        this.$store.dispatch('setCurrentPageConfig', JSON.parse(this.settingJSON))
      } catch (e) {
        this.$message.error('菜单配置JSON格式错误！')
      }
    }
  },
  methods: {
    menuSetting () {
      this.isOpen = !this.isOpen
    },
    cancel () {
      this.menuSetting()
    },
    save () {
      try {
        JSON.parse(this.settingJSON)
      } catch (e) {
        this.$message.error('页面配置Json格式不对，重新配置！')
        return false
      }

      this.loading = true
      this.$store.dispatch('setMtConfig', {
        key: this.currentPage,
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
        }
      })
    },
    /**
     * 实现简单的拉伸功能
     */
    drag () {
      let self = this
      let startX = 0
      let mousemoveHandle = (event) => {
        let endX = event.clientX
        let $target = self.$refs.pageConfig
        let offsetWidth = $target.offsetWidth

        if ((startX - endX) > 0 && offsetWidth + (startX - endX) < 700) {
          $target.style.width = offsetWidth + (startX - endX) + 'px'
        } else if (offsetWidth - (endX - startX) > 400) {
          $target.style.width = offsetWidth - (endX - startX) + 'px'
        }
      }
      this.container.addEventListener('mousedown', (event) => {
        startX = event.clientX
        this.container.addEventListener('mousemove', mousemoveHandle, false)
      }, false)

      this.container.addEventListener('mouseup', () => {
        this.container.removeEventListener('mousemove', mousemoveHandle)
      }, false)
    }
  },
  mounted () {
    this.container = this.$refs.jsoneditor
    let JSONEditor = window.JSONEditor
    let options = {
      mode: 'code',
      modes: ['code', 'form', 'text', 'tree', 'view'],
      onChange: () => {
        this.settingJSON = JSON.stringify(this.editor.get())
      }
    }
    if (JSONEditor) {
      this.editor = new JSONEditor(this.container, options)
    }

    // this.drag()
  }
}
</script>
<style>
.page-config {
  width: 0px;
  border: none;
  transition: width 300ms;
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  cursor: col-resize;
}
.page-config .page-title {
  text-align: left;
  margin-left: 2.5%;
  margin: 10px 2.5%;
  border-bottom: solid 1px #409EFF;
}
.page-config .page-main {
  height: 80%;
  width: 95%;
  margin: 0 auto;
}
.page-left {
 position: relative;
 width: 400px;
 transition: width 300ms;
 border-left: solid 1px #66b1ff;
}
.page-config .menu-setting {
  width: 20px;
  height: 20px;
  position: absolute;
  left: -40px;
  top: 52px;
}
.page-config .menu-setting .el-button {
  background: none;
  border: none;
}
.page-config .page-footer {
  margin-top: 10px;
}
.page-config #jsoneditor {
  height: 100%;
}
</style>


