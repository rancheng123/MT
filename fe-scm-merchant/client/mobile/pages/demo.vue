<template>
 <div class="component-demo">
   <tab-bar v-model="selectLabel" :tabs="['未处理', '已处理', '已删除']"></tab-bar>
   <tab-panel v-model="selectLabel" :tabs="['未处理', '已处理', '已删除']">
     <tab-panel-item>
       <scroll-to-bottom @scrollToBottom="scrollToBottom" :loading="bottomLoading">
        <drawer ref='drawer' :title="'故障时间'" :list="list" @onSelect="select">12121</drawer>
        <mt-button @click="show">Drawer</mt-button>
        <mt-button @click="dialog">Dialog</mt-button>
        <mt-button @click="alert">Alert</mt-button>
        <mt-button @click="toast">Toast</mt-button>
        <mt-button @click="dateTime">Datetime Picker</mt-button>
        <date-picker ref="picker"></date-picker>
        <mt-radio-group v-model="radio">
          <mt-radio :label="'选项一'">选项一</mt-radio>
          <mt-radio :label="'选项二'">选项二</mt-radio>
        </mt-radio-group>
        <mt-input :label="'电话号码'" :placeholder="'请输入电话号码'" v-model="mobile"></mt-input>
        <div style="margin-top:5px">
          <item-label :label="'电话号码'" v-model="mobile"></item-label>
        </div>
         <div style="margin-top:5px">
          <item-label-select @onClick="onSelect" :label="'电话号码'" v-model="mobile"></item-label-select>
        </div>
        
        <upload 
          :fileList="fileList"
          :limit="2"
          :action="action"
          :onSuccess="onSuccess"
          :onRemove="onRemove">
        </upload>
        <mt-dialog ref='dialog1' :isOk="true" cancel-text="取消">
          <div>测试1</div>
        </mt-dialog>
        <mt-dialog ref='dialog2' @onSubmit="dialogSubmit" :isOk="true" cancel-text="取消">
          <div>测试2</div>
        </mt-dialog>
      </scroll-to-bottom>
     </tab-panel-item>
     <tab-panel-item>
        <loading :size="25"></loading>
     </tab-panel-item>
     <tab-panel-item>
       <scroll-to-bottom @scrollToBottom="scrollToBottom" :loading="bottomLoading">
          <mt-button @click="loadingHandle">切换loading</mt-button>
          <div class="content" v-loading="loading">
            我被loading盖住啦
          </div>
       </scroll-to-bottom>
     </tab-panel-item>
   </tab-panel>
 </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'BillIndex',
  data () {
    return {
      mobile: '13718572023',
      loading: false,
      selectLabel: '未处理',
      title: '供应链上单管理系统',
      activeName: '',
      referrer: '#',
      radio: '选项二',
      batchFlowId: '',
      pageNum: '',
      bottomLoading: false,
      fileList: ['http://p0.meituan.net/gctinfo/5215ab500ec65a7680c07ad0731d2e44198206.jpg', 'http://p0.meituan.net/gctinfo/5215ab500ec65a7680c07ad0731d2e44198206.jpg'],
      action: 'http://mtc.pos.sankuai.com/japi/coop/uploadPicture',
      list: [
        {
          id: 0,
          text: '星期一'
        }, {
          id: 1,
          text: '星期二'
        }, {
          id: 2,
          text: '星期三'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      uname: 'uname',
      tab: 'tab'
    })
  },
  watch: {
    selectLabel () {
      console.log('selectLabel -> ', this.selectLabel)
    },
    radio () {
      console.log(this.radio)
    }
  },
  methods: {
    dateTime () {
      this.$refs.picker.show()
    },
    scrollToBottom (isBottom) {
      this.bottomLoading = isBottom
    },
    loadingHandle () {
      this.loading = !this.loading
    },
    dialog () {
      this.$refs.dialog2.show()
    },
    dialogSubmit () {
      this.$refs.dialog2.hide()
    },
    onSuccess (result) {
      console.log(result)
    },
    onRemove () {
      console.log(arguments)
    },
    alert () {
      this.$alert({
        title: '错误',
        content: '发生错误啦～～',
        onSubmit: () => {
          console.log('ok')
          return true
        }
      })
    },
    toast () {
      this.$toast({
        isVisible: true
      })
    },
    show () {
      this.$refs.drawer.show()
    },
    select (obj) {
      console.log(obj)
    },
    tabBar () {
    },
    onSelect () {
      this.$refs.drawer.show()
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
 .component-demo {
   height: 100%;
   .btn {
     height: 30px;
     width: 80%;
     line-height: 30px;
     background: #409EFF;
     margin: 0 auto;
     margin-top: 10px;
     color: #fff;
   }
   .content {
     position: relative;
     overflow: hidden;
     height: 200px;
     line-height: 200px
   }
   .mt-btn-wrapper {
     margin-top: 5px;
   }
 }
</style>