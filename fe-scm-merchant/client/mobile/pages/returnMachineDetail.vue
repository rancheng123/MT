<template>
    <div class="returnMachineDetail initStyle">
        <back-bar :title="'退机详情页'"></back-bar>

        <div>
            <!--状态  start-->
            <div class="section">
                <h3 class="title">等待缴费</h3>

                <div class="tip">
                    为不影响使用，请尽快缴费
                </div>
            </div>

            <div class="section">
                <h3 class="title">等待退款</h3>

                <div class="tip">
                    将于 1-2 个工作日内进行退款
                </div>
            </div>

            <div class="section">
                <h3 class="title">等待旧机回收</h3>

                <div class="tip">
                    退机审核已通过，请录入快递并将旧设备寄回
                </div>
            </div>

            <div class="section">
                <h3 class="title">审核被驳回</h3>

                <div class="tip">
                    请提供屏幕无法开机照片
                </div>
            </div>
            <!--状态  end-->




            <div class="section noPaddingBottom">
                <h3 class="title">设备信息</h3>

                <item-bar :title="'门店ID'" :value="123456"></item-bar>
                <item-bar :title="'门店名称'" :value="'将太无二望京店'"></item-bar>
                <item-bar :title="'设备SN'" :value="298736513"></item-bar>
                <item-bar :title="'设备类型'" :value="'POS 机'"></item-bar>
                <item-bar :title="'申请时间'" :value="'2018/03/23 12:23:02'"></item-bar>
                <item-bar :title="'绑定天数'" :value="'3 天'"></item-bar>
            </div>

            <div class="section noPaddingBottom">
                <h3 class="title">退机描述</h3>

                <item-bar :title="'设备是否损坏'">
                    <div slot='value'>
                        <mt-radio-group v-model="isMachineDamage">
                            <mt-radio :label="'是'">是</mt-radio>
                            <mt-radio :label="'否'">否</mt-radio>
                        </mt-radio-group>
                    </div>
                </item-bar>
                <item-bar :title="'退机原因'">
                    <div slot='value'>
                        <drawer :title="'退机原因'" :list="returnReason.data" @onSelect="returnReason.select">
                            <span slot="enablePoint">{{returnReason.value}}></span>
                        </drawer>
                    </div>
                </item-bar>

                <item-bar :title="'故障选项'">
                    <div slot='value'>
                        已选 3 项>
                    </div>
                </item-bar>

                <div class="sectionItem">
                    上传凭证
                    <div class="uploadWrap">
                        <upload
                                :fileList="imgUpload.fileList"
                                :limit="2"
                                :action="imgUpload.action"
                                :onSuccess="imgUpload.onSuccess"
                                :onRemove="imgUpload.onRemove">
                        </upload>
                    </div>
                </div>

                <item-bar :title="'备注'">
                    <div slot='value'>
                        <input class="textInput" type="text" placeholder="选填">
                    </div>
                </item-bar>

            </div>

            <div class="section noPaddingBottom">
                <h3 class="title">费用信息</h3>

                <item-bar :title="'是否开过发票'">
                    <div slot='value'>
                        <mt-radio-group v-model="isHasBill">
                            <mt-radio :label="'是'">是</mt-radio>
                            <mt-radio :label="'否'">否</mt-radio>
                        </mt-radio-group>
                    </div>
                </item-bar>



                <div class="sectionItem">
                    <div>
                        是否退还发票原件
                        <span class="sectionItemValue">
                            <mt-radio-group v-model="isHasReturnBill">
                              <mt-radio :label="'是'">是</mt-radio>
                              <mt-radio :label="'否'">否</mt-radio>
                            </mt-radio-group>
                        </span>
                    </div>
                    <div class="tip28">
                        已开票售卖设备需要返还发票原件
                    </div>
                </div>

                <item-bar :title="'待缴费金额'">
                    <div slot='value'>
                        ￥55.00>
                    </div>
                </item-bar>






            </div>

            <div class="section noPaddingBottom">
                <h3 class="title">旧设备信息</h3>

                <item-bar :title="'SN码'">
                    <div slot='value'>
                        56789098765
                    </div>
                </item-bar>

                <item-bar :title="'快递公司555'">
                    <div slot='value'>
                        <drawer :title="'退机原因'" :list="fastPostCompany.data" @onSelect="fastPostCompany.select">
                            <span slot="enablePoint">{{fastPostCompany.value}}></span>
                        </drawer>
                    </div>
                </item-bar>

                <item-bar :title="'快递单号'">
                    <div slot='value'>
                        <input class="textInput" type="text" placeholder="请输入">
                    </div>
                </item-bar>
            </div>
        </div>

        <div class="protocol">
            <span class="checkbox-button"></span>
            我已阅读并同意

            <router-link :to="'/h5/merchant/returnAndChangeProtocol'">
                <a class="protocolLink">
                    《退换机协议》
                </a>
            </router-link>

        </div>

        <!--操作类型  start-->
        <mt-button @click="apply">提交申请</mt-button>

        <div style="margin-top:0.3rem">
            <mt-button @click="apply">确定</mt-button>
        </div>

        <div style="margin-top:0.3rem">
            <mt-button @click="apply">邮寄旧机</mt-button>
        </div>

        <div style="margin-top:0.3rem">
            <mt-button @click="apply">取消</mt-button>
        </div>

        <!--操作类型  end-->



    </div>
</template>
<style  scoped lang="less">
    .returnMachineDetail{
        .protocol{
            font-size: 0.24rem;
            padding: 0.28rem;
        }
        //公共样式 end
    }
</style>
<script>
  /* eslint-disable */
import fetchData from '../common/fetchData'
// 未完成 KNB 如何 npm install
var KNB = require('@dp/knb')
console.log(KNB)
export default {
  name: 'ReturnMachineDetail',
  data () {
    var that = this
    return {
      isMachineDamage: '否',
      // 是否开过发票
      isHasBill: '是',
      // 是否退还发票原件
      isHasReturnBill: '是',
      returnReason: {
        data: [
          {
            id: 0,
            text: '星期一'
          }, {
            id: 1,
            text: '星期二'
          }, {
            id: 2,
            text: '星期三'
          }, {
            id: 0,
            text: '星期一'
          }, {
            id: 1,
            text: '星期二'
          }, {
            id: 2,
            text: '星期三'
          }
        ],
        select: (obj) => {
          that.returnReason.value = obj.selectItem
        },
        value: '请选择'
      },
      // 故障选项
      troubleOptions: {
        data: [
          {
            id: 0,
            text: '星期11一'
          }, {
            id: 1,
            text: '星期1二'
          }, {
            id: 2,
            text: '星期33三'
          }
        ],
        select: (obj) => {
          that.troubleOptions.value = obj.selectItem
        },
        value: '请选择'
      },
      fastPostCompany: {
        data: [
          {
            id: 0,
            text: '星期11444一'
          }, {
            id: 1,
            text: '星期1555二'
          }, {
            id: 2,
            text: '星期33666三'
          }
        ],
        select: (obj) => {
          that.fastPostCompany.value = obj.selectItem
        },
        value: '顺丰快递'
      },
      imgUpload: {
        fileList: ['http://p0.meituan.net/gctinfo/5215ab500ec65a7680c07ad0731d2e44198206.jpg', 'http://p0.meituan.net/gctinfo/5215ab500ec65a7680c07ad0731d2e44198206.jpg'],
        action: 'http://mtc.pos.sankuai.com/japi/coop/uploadPicture',
        onSuccess: (result) => {
          // debugger
          console.log(result)
        },
        onRemove: (result) => {
          // debugger
          console.log(result)
        }
      }
    }
  },
  methods: {
    apply () {
      console.log('apply')
    }
  },
  mounted () {
    // 测试  start
    window.fetchData = fetchData
    // 测试  end

    // var that = this;
    // let result = fetchData({
    //   method: 'get',
    //   url: '/h5/merchant/problemTime'
    // }).then(function(data){
    //
    //   debugger
    //   console.log(result)
    //   that.dataList = data.data.data.srcDef;
    // })

  }
}
</script>

