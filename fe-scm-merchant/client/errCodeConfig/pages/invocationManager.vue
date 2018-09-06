<template>
    <div class="invocation">
      <h3>服务方管理</h3>
      <!--hearder-->
      <el-row class="header">
        <el-col :span="12">
            <el-input v-model="invocationName" clearable placeholder="请输入服务方"></el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" :disabled="searchBtn" @click="getInvocationList(invocationName)">搜索</el-button>
          <el-button type="primary" @click="dialog()">新增</el-button>
        </el-col>
      </el-row>
      <!--table-->
      <el-table
        class="invocation-table"
        :data="invocationList"
        style="width: 60%">
        <el-table-column
          prop="id"
          label="序号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="invocationName"
          label="服务方">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="dialog(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
  
    <!--dialog-->
    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      width="40%">
        <el-form ref="form"  :model="modal" label-width="130px">
          <el-form-item :required="true" label="调用方：" >
            <el-input v-model="modal.invocationName"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInvocation(submitId)">保存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cell from '../components/Cell'

export default {
  name: 'List',
  components: {
    cell
  },
  data () {
    return {
      invocationName: '',
      invocationList: [],
      searchBtn: true,
      dialogVisible: false,
      modal: {
        invocationName: ''
      },
      modalTitle: '新增调用方',
      submitId: -1
    }
  },
  computed: {
    ...mapGetters({
      uname: 'uname',
      uid: 'uid'
    })
  },
  mounted () {
    this.getInvocationList()
  },
  created () {
  },
  methods: {
    notifyMessage (type, title, msg) {
      // 接口报错
      this.$notify({
        type: type,
        title: title,
        message: msg,
        position: 'top-left'
      })
    },

    async getInvocationList (name) {
      let params = {
        userId: this.uid,
        invocationName: name || ''
      }
      let res = await this.$axios.get('/errCodeConfig/getInvocationList', {params})
      if (res && res.data) {
        this.searchBtn = false
        this.invocationList = res.data
      } else {
        let msg = res.errMsg || res.message || '暂无数据'
        this.notifyMessage('error', '提示', msg)
      }
    },

    dialog (item) {
      this.dialogVisible = true
      this.modal.invocationName = (item && item.invocationName) || ''
      if (item) {
        this.modalTitle = '编辑调用方'
        this.submitId = item.id
      } else {
        this.modalTitle = '新增调用方'
        this.submitId = -1
      }
    },

    async saveInvocation (id) {
      if (!this.modal.invocationName) {
        this.notifyMessage('info', '提示', '请填写调用方')
        return
      }
      let postData, path
      if (id >= 0) {
        postData = {
          ...this.modal,
          id,
          userId: this.uid
        }
        path = '/errCodeConfig/updateInvocation'
      } else {
        postData = {
          ...this.modal,
          userId: this.uid
        }
        path = '/errCodeConfig/addInvocation'
      }
      let res = await this.$axios.post(path, postData)
      if (res && res.status === 200) {
        this.getInvocationList()
        this.notifyMessage('success', '成功', '保存成功')
        this.dialogVisible = false
      } else {
        let msg = res.errMsg || '接口错误'
        this.notifyMessage('error', '提示', msg)
      }
    }
  }
}
</script>

<style lang="less">
.invocation {
  h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
  }
  text-align: left;
  .header {
    width: 60%;
    margin: 0 auto;
  }
  .el-input {
    width: 180px;
  }

  .el-table.invocation-table{
    margin: 20px auto;
    border: 1px solid #ebebeb;
    td {
      padding: 4px 0;
    }
  }
  .el-form-item .el-form-item__label{
    text-align: left;
  }
  .el-dialog {
    .el-dialog__body {
      padding: 20px;
      border-top: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
    }
  }
}
</style>