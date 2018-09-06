<template>
    <div class="errcode">
      <h3>错误码配置</h3>
      <!--hearder search-->
      <el-form ref="form"   label-width="130px">

        <el-row>
          <el-col :span="7">
            <el-form-item label="业务接入方：">
                <el-select v-model="systemName" clearable placeholder="请选择">
                <el-option
                    v-for="item in systemNameList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="服务方：">
              <el-select v-model="invocationId" clearable placeholder="请选择" :disabled="modalNoEdit">
                  <el-option
                      v-for="item in invocationList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="接口名称：">
              <el-input v-model="apiName" clearable placeholder="请输入" ></el-input>
            </el-form-item>
    
          </el-col>
        </el-row>

        <el-row>
            <el-col :span="7">
              <el-form-item label="服务方返回码：">
                <el-input v-model="schIntcode" clearable placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="服务方返回信息：">
              <el-input v-model="schIntmsg" clearable placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-button type="primary" :disabled="searchBtn" @click="searchErrCode">搜索</el-button>
              <el-button type="primary" @click="dialog(1)">新增</el-button>
            </el-col>  
        </el-row>

        <el-row>
            <el-col :span="7">
              <el-form-item label="前端返回码：">
                <el-input v-model="schOutcode" clearable placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="前端展示文案：">
               <el-input v-model="schOutmsg" clearable placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
        </el-row>

      </el-form>
      <!--table-->
      <el-table
        class="errcode-table"
        :data="errorCodeInfoList">
        <el-table-column
          prop="srcDef"
          label="业务接入方"
          width="100">
        </el-table-column>
        <el-table-column
          prop="invocationName"
          label="服务方"
          width="100">
        </el-table-column>
        <el-table-column
          prop="apiName"
          label="接口名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="innerCode"
          label="服务方返回码(subcode)"
          width="110">
        </el-table-column>
        <el-table-column
          prop="innerMsg"
          label="服务方返回信息(submsg)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="typeDef"
          label="类型"
          width="130">
        </el-table-column>
        <el-table-column
          prop="statusDef"
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="showCode"
          label="前端返回码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="showMsg"
          label="前端展示文案(面向商家)">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="dialog(2, scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="dialog(3, scope.row)"  type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--pagination-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalRowCount"
      :page-size="pageSize"
      :current-page.sync="pageNum"
      @current-change="handleCurrentChange"
      >
    </el-pagination>
    <!--dialog-->
    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      width="40%">
        <el-form ref="form"  :model="modal" label-width="140px">
          <el-form-item :required="true" label="业务接入方：">
            <el-select v-model="modal.src" clearable placeholder="请选择" :disabled="modalNoEdit">
            <el-option
                v-for="item in systemNameList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :required="true" label="服务方：">
            <el-select v-model="modal.invocationId" clearable placeholder="请选择" :disabled="modalNoEdit">
            <el-option
                v-for="item in invocationList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :required="true" label="服务方返回码：">
            <el-input v-model="modal.innerCode" :disabled="modalNoEdit"></el-input>
          </el-form-item>
          <el-form-item :required="true" label="服务方返回信息：">
            <el-input v-model="modal.innerMsg" :disabled="modalNoEdit"></el-input>
          </el-form-item>
          <el-form-item  label="错误码等级：">
            <el-input v-model="modal.level" :disabled="modalNoEdit"></el-input>
          </el-form-item>
          <el-form-item  label="接口名称：">
            <el-input v-model="modal.apiName" :disabled="modalNoEdit"></el-input>
          </el-form-item>
          <el-form-item :required="true" label="类型：">
          <el-select v-model="modal.type" clearable placeholder="请选择" :disabled="modalNoEdit">
            <el-option
                v-for="item in typeList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :required="true" label="状态">
          <el-select v-model="modal.status" clearable placeholder="请选择" :disabled="modalNoEdit">
            <el-option
                v-for="item in statusList"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="前端返回码：">
            <el-input v-model="modal.showCode" :disabled="modalNoEdit"></el-input>
          </el-form-item>
          <el-form-item label="前端展示文案：">
            <el-input v-model="modal.showMsg" :disabled="modalNoEdit"></el-input>
          </el-form-item>
          <cell  v-show="modalNoEdit" label="创建人：" :value="modalUser"></cell>
          <cell  v-show="modalNoEdit" label="最新编辑人：" :value="modalModifyUser"></cell>
        </el-form>
      <span slot="footer" class="dialog-footer" v-show="!modalNoEdit">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveErrCode(submitId)">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cell from '../components/Cell'
//   import {createNamespacedHelpers} from 'vuex'
//   const {mapState, mapGetters, mapActions, mapMutations} = createNamespacedHelpers('list')

export default {
  name: 'List',
  components: {
    cell
  },
  data () {
    return {
      systemName: '',
      systemNameList: [],
      typeList: [],
      statusList: [],
      invocationList: [],
      // 搜索关键字
      schIntcode: '',
      schOutcode: '',
      schIntmsg: '',
      schOutmsg: '',
      apiName: '',
      invocationId: '',
      errorCodeInfoList: [],
      pageNum: 1,
      pageSize: 20,
      totalRowCount: 0,
      searchBtn: true,
      dialogVisible: false,
      modalNoEdit: false,
      modal: {
        innerCode: '',
        level: '',
        src: '',
        invocationId: '',
        apiName: '',
        innerMsg: '',
        type: '',
        status: '',
        showCode: '',
        showMsg: ''
      },
      submitId: '', // 提交保存codeid
      modalUser: '',
      modalModifyUser: '',
      modalTitle: '新增内部返回码'
    }
  },
  computed: {
    ...mapGetters({
      uname: 'uname',
      uid: 'uid'
    })
  },
  mounted () {
    this.getSystemNameList()
    this.requestErrorCodeInfo(1)
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

    async getSystemNameList () {
      let res = await this.$axios.get(`/errCodeConfig/getSystemNameList?optUserId=${this.uid}`)
      if (res && res.data) {
        this.systemNameList = res.data.srcDef
        this.typeList = res.data.typeDef
        this.statusList = res.data.statusDef
        this.invocationList = res.data.invocationDef
      }
    },

    async requestErrorCodeInfo (pageNum) {
      let postData = {
        userId: this.uid,
        src: this.systemName || null,
        innerCode: this.schIntcode || null,
        showCode: this.schOutcode || null,
        innerMsg: this.schIntmsg || null,
        showMsg: this.schOutmsg || null,
        apiName: this.apiName || null,
        invocationId: this.invocationId || null,
        pageSize: this.pageSize,
        pageNum: pageNum
      }
      let res = await this.$axios.post('/errCodeConfig/requestErrorCodeInfo', postData)
      if (res && res.data) {
        this.searchBtn = false
        this.errorCodeInfoList = res.data.pageContent
        this.pageSize = res.data.page.pageSize
        this.pageNum = res.data.page.currentPageNo
        this.totalRowCount = res.data.page.totalCount
      } else {
        let msg = res.errMsg || '暂无数据'
        this.notifyMessage('error', '提示', msg)
      }
    },

    handleCurrentChange (val) {
      this.requestErrorCodeInfo(val)
    },

    searchErrCode () {
      this.requestErrorCodeInfo(1)
    },

    fillErrCodeDetail (item) {
      // 新增置空或者置列表的第一个
      // 编辑和详情取当前item值
      this.submitId = (item && item.id) || ''
      this.modal.innerCode = (item && item.innerCode) || ''
      this.modal.level = (item && item.level) || ''
      this.modal.src = (item && String(item.src)) || (this.systemNameList && this.systemNameList[0].key) || ''
      this.modal.type = (item && String(item.type)) || (this.typeList && this.typeList[0].key) || ''
      this.modal.status = (item && String(item.status)) || (this.statusList && this.statusList[0].key) || ''
      this.modal.apiName = (item && item.apiName) || ''
      this.modal.innerMsg = (item && item.innerMsg) || ''
      this.modal.showCode = (item && item.showCode) || ''
      this.modal.showMsg = (item && item.showMsg) || ''
      this.modal.invocationId = (item && String(item.invocationId)) || ''
    },

    dialog (status, item) {
      this.dialogVisible = true
      this.fillErrCodeDetail(item)
      switch (status) {
        case 1:
          this.modalNoEdit = false
          this.modalTitle = '新增内部返回码'
          break
        case 2:
          this.modalNoEdit = false
          this.modalTitle = '编辑内部返回码'
          break
        case 3:
          this.modalNoEdit = true
          this.modalTitle = '返回码详情'
          this.modalUser = item.addUserId + ' ' + item.addTimeStr
          this.modalModifyUser = item.modifyUserId + ' ' + item.modifyTimeStr
          break
      }
    },

    async saveErrCode (id) {
      let valiMsg = this.validate(this.modal)
      if (valiMsg) {
        this.notifyMessage('info', '提示', valiMsg)
        return
      }

      let postData = {
        errorCode: {
          ...this.modal,
          id
        },
        userId: this.uid
      }

      let res = await this.$axios.post('/errCodeConfig/modifyErrorCodeConfigInfo', postData)
      if (res && res.status === 200) {
        this.requestErrorCodeInfo(this.pageNum)
        this.notifyMessage('success', '成功', '保存成功')
        this.dialogVisible = false
      } else {
        let msg = res.errMsg || '接口错误'
        this.notifyMessage('error', '提示', msg)
      }
    },

    validate (postData) {
      if (!postData.src) {
        return '请选择业务接入方'
      }
      if (!postData.innerCode) {
        return '请填写服务方返回码'
      }
      if (!postData.innerMsg) {
        return '请填写服务方返回信息'
      }
      if (!postData.type) {
        return '请选择类型'
      }
      if (!postData.status) {
        return '请选择状态'
      }
    }
  }
}
</script>

<style lang="less">
.errcode {
  h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
  }
  text-align: left;
  .el-input {
    width: 160px;
  }
  .el-table.errcode-table{
    border: 1px solid #ebebeb;
    th {
      padding: 4px 0;
    }
    td {
      padding: 3px 0;
    }
  }
  .el-pagination {
    width: 95%;
    text-align: right;
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