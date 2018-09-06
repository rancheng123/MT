<template>
<div class="mis-home">
    <h2>功能简介</h2>
    <div class="mis-content">
        <div class="content">
            <div class="header">错误码配置迁移</div>
            <div>错误码列表，调用方管理</div>
        </div>
        <div class="content">
            <div class="header">公众号&小程序迁移</div>
            <div>申请配置、记录</div>
        </div>
    </div>
</div>

</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: '招财猫后台运营系统'
    }
  },
  computed: {
    ...mapGetters({
      uname: 'uname'
    })
  },
  methods: {},
  components: {
  }
}
</script>

<style lang="less">
.mis-home {
    h2 {
        padding-bottom: 10px;
        border-bottom: 1px solid #ebebeb;
    }
    height: 900px;
    .mis-content {
        
        .content {
            margin-left: 100px;
            text-align: left;
            width: 300px;
            border: 1px solid #ebebeb;
            display: inline-block;
            div {
                padding: 10px;
            }
            .header {
                background-color: rgba(104,157,255,0.1);
                border-bottom: 1px solid #ebebeb;
            }
        }
    }
}

</style>