<template>
	<el-row v-if = "isShow" class="bg-white">
	  <el-col :span="10">
			<div class="grid-content bg-purple">
				<ul class="tab-content text-left">
					<li v-for="(tab, index) in tabList" class="tabList" @click="selectTab(index)" :key="index">
						{{tab}}
					</li>
				</ul>
        <div class="imgContainer">
          <el-button-group class="text-right">
            <el-button type="primary" size="mini" class="pd-7 col-green"  @click = "leftRotate">左旋</el-button>
            <el-button type="primary" size="mini" class="pd-7 col-green"  @click = "rightRotate">右旋</el-button>
            <el-button type="primary" size="mini" class="pd-7 col-orange" @click = "biggerScale">放大</el-button>
            <el-button type="primary" size="mini" class="pd-7 col-orange" @click = "smallerScale">缩小</el-button>
            <el-button type="primary" size="mini" class="pd-7 col-red" @click = "lastPhoto">上一张</el-button>
            <el-button type="primary" size="mini" class="pd-7 col-red" @click = "nextPhoto">下一张</el-button>
            <el-button type="primary" size="mini" class="pd-7 col-green" @click = "init">还原</el-button>
          </el-button-group>
          <div class="img-container">
            <img
              v-for="(img, index) in imgSrc"
              :key="index"
              :src="img"
              alt=""
              class="show-img"
              :style="{transform: 'rotate('+ currentReg + 'deg) scale('+ currentScale +')'}">
          </div>
        </div>  
			</div>
      
		</el-col>
	  <el-col :span="14" class="bg">
      <div class="bg" style="height: 500px">
        <div class="text-left">业务类型：客户资质审核</div>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="客户信息" name="1">
            <table v-loading="loading">  
              <tr v-for="(item,index) in auditList" v-if="index < Math.ceil(auditList.length / 2)" :key="index">
                <td class="td-title">
                  <div>
                    <span>{{auditList[index * 2] && auditList[index * 2].attrDesc}}</span>
                  </div>
                </td>
                <td class="td-content">
                  <div>
                    <span
                      :class='changeColor(index * 2)'
                      @click="getAduitReasonList(auditList[index * 2].attrId)">
                      {{auditList[index * 2] && auditList[index * 2].attrDisplay}}
                    </span>
                    <span
                      class="auditMsgWrapper"
                      v-if="showAuditMsg(index * 2)">
                      <span class="auditMsg">
                        {{showTips(index * 2)}}
                      </span>
                      <button class="del" @click="del(auditList[index * 2].attrId)"></button>
                    </span>
                  </div>
                </td>
                <td class="td-title">
                  <div v-if="index * 2 + 1 < Math.ceil(auditList.length)">
                    <span>{{auditList[index * 2 + 1] && auditList[index * 2 + 1].attrDesc}}</span>
                  </div>
                </td>
                <td class="td-content">
                  <div v-if="index * 2 + 1<Math.ceil(auditList.length)">
                    <span :class='changeColor(index * 2 + 1)' @click="getAduitReasonList(auditList[index * 2 + 1].attrId)">{{auditList[index * 2 + 1] && auditList[index * 2 + 1].attrDisplay}}</span>
                    <span class="auditMsgWrapper" v-if="showAuditMsg(index * 2 + 1)">    
                      <span class="auditMsg">
                        {{showTips(index * 2 + 1)}}
                      </span>
                      <a href="javascript:;" class="del" @click="del(auditList[index * 2 + 1].attrId)"></a>
                    </span>
                  </div>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
        <el-button type="primary" @click="saveAudit" v-show="!isDisabled">提交</el-button>
        <el-checkbox v-model="needNext" v-show="!isDisabled">继续处理下一单</el-checkbox>
      </div>   
    </el-col>
    <el-dialog
      title="驳回原因"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <el-input v-model="specialRejectReason" placeholder="具体驳回详情" class="mg-bottom"></el-input>
      <el-checkbox-group v-model="rejectReasonIds" v-for="(aduitReason, index) in aduitReasonList" :key="index">
        <el-checkbox :label="aduitReason.reasonId" class="block text-left">{{aduitReason.content}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>  
	</el-row>
  <div v-else>
    {{errorMessage}}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.auditFlowId = this.$route.query.auditFlowId
    this.getAuditList(this.auditFlowId)
  },
  computed: {
    ...mapGetters({
      uid: 'uid',
      tabList: 'tabList',
      imgList: 'imgList',
      auditList: 'auditList',
      aduitReasonList: 'aduitReasonList',
      AduitReasonMap: 'AduitReasonMap'
    })
  },
  mounted () {
  },
  data () {
    return {
      auditFlowId: '',
      isDisabled: false, // 是否可以修改，true为点击没反应（审核后的一些状态，不显示提交按钮），false的话会有弹窗（未保存之前，可以修改和提交）
      rejectDetails: {}, // 保存的信息
      details: {},
      items: [],
      attrId: '',
      loading: false,
      specialRejectReason: '', // 具体驳回详情
      isShow: true,
      errorMessage: '', // 返回的错误信息
      dialogVisible: false, // 弹出框状态，默认为false
      imgIndex: 0, // 对应的图片的index
      rejectReasonIds: [], // 驳回原因的id的数组
      imgSrc: [], // 展示出来的图片的list（可能是一个数组）
      activeNames: ['1'],
      currentReg: 0, // 图片当前旋转的角度
      currentScale: 1, // 图片当前放大的倍数
      needNext: true // 是否继续处理下一单，默认为true（是）
    }
  },
  watch: {
    '$route' (to, from) {
      this.getAuditList(this.auditFlowId)
    }
  },
  methods: {
    getAuditList (auditFlowId) {
      this.$store.dispatch('getAuditList', {
        auditFlowId: auditFlowId
      }).then((res) => {
        if (res.status.code === '100000' && res.success === true) {
          this.rejectDetails = {}
          this.details = {}
          this.auditList.forEach((element) => {
            this.details[element.attrId] = {
              attrId: element.attrId,
              rejectReasonIds: [],
              auditNote: ''
            }
          })
          this.rejectDetails = this.details
          if (this.imgList.length) {
            this.imgSrc = this.imgList[this.imgIndex].photoUrls
          }
          this.isShow = true
          if (res.data.status === 2) {
            this.isDisabled = false
          } else {
            this.isDisabled = true
          }
        } else {
          this.errorMessage = res.status.msg
          this.isShow = false
        }
      }).catch(e => {
        console.log(e)
        this.$alert('网络错误', e, {
          confirmButtonText: '确定'
        })
      })
    },
    changeColor (index) {
      if (this.rejectDetails[this.auditList[index].attrId] && (this.rejectDetails[this.auditList[index].attrId].rejectReasonIds.length > 0 || this.rejectDetails[this.auditList[index].attrId].auditNote !== '')) {
        return 'customerAuditItemRed'
      } else {
        return 'customerAuditItem'
      }
    },
    showTips (index) {
      let result = this.AduitReasonMap[this.rejectDetails[this.auditList[index].attrId].rejectReasonIds[0]] || this.rejectDetails[this.auditList[index].attrId].auditNote
      return result
    },
    showAuditMsg (index) {
      try {
        let result = this.rejectDetails[this.auditList[index].attrId].rejectReasonIds.length > 0 || this.rejectDetails[this.auditList[index].attrId].auditNote !== ''
        return result
      } catch (error) {
        return undefined
      }
    },
    saveAudit () {
      for (let i in this.rejectDetails) {
        this.items.push(this.rejectDetails[i]) // 属性
      }
      this.$store.dispatch('saveAudit', {
        auditFlowId: this.auditFlowId,
        items: this.items,
        auditUser: this.uid,
        needNext: Number(this.needNext)
      }).then((res) => {
        if (res.data.data.success === true) {
          this.isDisabled = true
          let url = res.data.data.data
          if (url) {
            this.auditFlowId = url
            this.$router.push(this.$route.path + '?auditFlowId=' + url)
          } else {
            this.$alert('流程已通过', '提示', {
              confirmButtonText: '确定'
            })
          }
        } else {
          this.$alert(res.data.data.status.msg, '错误提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    del (attrId) {
      if (!this.isDisabled) {
        this.attrId = attrId
        this.rejectDetails[this.attrId].rejectReasonIds = []
        this.rejectDetails[this.attrId].auditNote = ''
        this.rejectReasonIds = []
        this.specialRejectReason = ''
        this.isDisabled = false
        this.$store.commit('delAduitReasonMap')
        this.$forceUpdate()
      }
    },
    cancel () {
      this.dialogVisible = false
      this.rejectReasonIds = []
      this.specialRejectReason = ''
      this.rejectDetails[this.attrId].rejectReasonIds = []
      this.rejectDetails[this.attrId].auditNote = ''
    },
    confirm () {
      this.dialogVisible = false
      this.rejectDetails[this.attrId].rejectReasonIds = this.rejectReasonIds
      this.rejectDetails[this.attrId].auditNote = this.specialRejectReason
      this.$forceUpdate()
    },
    init () {
      this.currentReg = 0
      this.currentScale = 1
    },
    biggerScale () {
      this.currentScale *= 1.2
    },
    smallerScale () {
      this.currentScale /= 1.2
    },
    leftRotate () {
      this.currentReg -= 90
    },
    rightRotate () {
      this.currentReg += 90
    },
    selectTab (index) {
      this.imgIndex = index
      this.imgSrc = this.imgList[this.imgIndex]
    },
    lastPhoto () {
      this.init()
      this.imgIndex = (this.imgIndex + this.imgList.length - 1) % this.imgList.length
      this.imgSrc = this.imgList[this.imgIndex]
    },
    nextPhoto () {
      this.init()
      this.imgIndex = (this.imgIndex + 1) % this.imgList.length
      this.imgSrc = this.imgList[this.imgIndex]
    },
    getAduitReasonList (attrId) {
      if (!this.isDisabled) {
        if (this.rejectDetails[attrId].rejectReasonIds.length === 0 && !this.rejectDetails[attrId].auditNote) {
          this.dialogVisible = false
          this.attrId = attrId
          this.rejectReasonIds = []
          this.specialRejectReason = ''
          this.rejectDetails[this.attrId].rejectReasonIds = ''
          this.rejectDetails[this.attrId].auditNote = ''
          this.loading = true
          this.$store.dispatch('getAduitReasonList', {
            attrId: attrId
          }).then((res) => {
            this.dialogVisible = true
            this.loading = false
          })
        }
      }
    }
  }
}
</script>
<style scoped>
  .bg {
    background: #fff;
  }
  .img-container {
    width: 500px;
    overflow: hidden;
  }
  body {
    background: #fff
  }
  .text-left {
    text-align: left;
  }
  ul,li {
    list-style: none;
  }
  li {
    display: inline-block;
    margin-top: 10px;
    padding: 0 10px;
    background: #2db3a6;
    color: #fff;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    user-select: none;
    margin-right: 10px;
  }
  .text-right {
    float: right;
    margin-right: 20px;
  }

  .pd-7 {
    padding: 7px;
  }

  .col-green {
    background: #2db3a6;
    border:  #2db3a6;
  }

  .col-orange {
    background: #f90;
    border:  #f90;
  }
  .col-red {
    background: red;
    border:  red;
  }

  .show-img {
    width: 85%;
    margin: 20px;
  }
  .td-title {
    width: 18%;
  }
  .td-content {
    width: 32%;
  }
  table,tr,td {
    padding: 10px;
    border: 1px #ccc solid;
    width: 100%;
  }
  table {
    border-collapse: collapse;
  }
  .auditMsgWrapper {
    position: relative;
    margin-left: 10px;
    background: red;
    color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
  }
  .auditMsgWrapper .auditMsg {
    display: inline-block;
    width: 30%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: -2px;
    line-height: 14px;
  }
  .auditMsgWrapper .del {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 17px;
    height: 17px;
    background-image: url(http://cs0.meituan.net/mtdeal2/image/photo_delete-min.v2acdf60.png);
    z-index: 1;
  }

  .tabList {
    font-size: 14px
  }

  .customerAuditItem {
    cursor: pointer;
  }
  
  .customerAuditItemRed {
    cursor: pointer;
    color: red;
  }

  .block {
    display: block;
    margin: 0
  }

  .mg-bottom {
    margin-bottom: 10px
  }

  .bg-white {
    background: #fff;
  }
</style>

