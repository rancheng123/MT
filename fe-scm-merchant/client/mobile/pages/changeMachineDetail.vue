<template>
    <div class="changeMachineDetail initStyle">
        <back-bar :title="'换机详情'"></back-bar>

        <div>
            <!--状态  start-->
            <div class="section">
                <h3 class="title">等待审核</h3>

                <div class="tip">
                    将于 1-2 个工作日内完成审核，请耐心等待
                </div>
            </div>

            <div class="section">
                <h3 class="title">审核被驳回</h3>

                <div class="tip">
                    请提供真实的屏幕无法开机照片
                </div>
            </div>

            <div class="section">
                <h3 class="title">等待发货</h3>

                <div class="tip">
                    将于 1-2 个工作日内进行发货，请耐心等待
                </div>
            </div>

            <div class="section">
                <h3 class="title">
                    新设备已发货
                    <span class="lookPostMsg">查看邮寄信息</span>
                </h3>

                <div class="tip">
                    收到设备后，请先邮寄旧机，再进行“换绑”
                </div>
            </div>

            <div class="section">
                <h3 class="title">
                    换绑已完成，待旧机回收
                    <span class="lookPostMsg">查看邮寄信息</span>
                </h3>

                <div class="tip">
                    收到设备后，请立即换绑并邮寄旧机
                </div>
            </div>






            <!--状态  end-->




            <div class="section noPaddingBottom">
                <h3 class="title">设备信息</h3>

                <item-bar :title="'门店ID'" :value="123456"></item-bar>
                <item-bar :title="'门店名称'" :value="'将太无二望京店'"></item-bar>
                <item-bar :title="'设备SN'" :value="298736513"></item-bar>
                <item-bar :title="'设备类型'" :value="'POS 机'"></item-bar>
                <!--<item-bar :title="'申请时间'" :value="'2018/03/23 12:23:02'"></item-bar>-->
                <!--<item-bar :title="'绑定天数'" :value="'3 天'"></item-bar>-->
            </div>

            <div class="section noPaddingBottom">
                <h3 class="title">换机描述</h3>

                <item-bar :title="'故障时间'">
                    <div slot='value'>
                        <drawer :title="'退机原因'" :list="troubleTime.data" @onSelect="troubleTime.select">
                            <span slot="enablePoint">{{troubleTime.value}}></span>
                        </drawer>
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
                <h3 class="title">配送信息</h3>

                <item-bar :title="'联系人'">
                    <div slot='value'>
                        张三
                    </div>
                </item-bar>
                <item-bar :title="'联系电话'">
                    <div slot='value'>
                        18810372088
                    </div>
                </item-bar>
                <item-bar :title="'联系地址'">
                    <div slot='value'>
                        <input class="textInput" type="text" placeholder="请输入">
                    </div>
                </item-bar>


            </div>

            <div class="section noPaddingBottom">
                <h3 class="title">新设备信息</h3>

                <item-bar :title="'SN码'">
                    <div slot='value'>
                        56789098765
                    </div>
                </item-bar>

                <item-bar :title="'快递公司'">
                    <div slot='value'>
                        <drawer :title="'退机原因'" :list="newDeviceFastPostCompany.data" @onSelect="newDeviceFastPostCompany.select">
                            <span slot="enablePoint">{{newDeviceFastPostCompany.value}}></span>
                        </drawer>
                    </div>
                </item-bar>

                <item-bar :title="'快递单号'">
                    <div slot='value'>
                        <input class="textInput" type="text" placeholder="请输入">
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

                <item-bar :title="'快递公司'">
                    <div slot='value'>
                        <drawer :title="'退机原因'" :list="oldDeviceFastPostCompany.data" @onSelect="oldDeviceFastPostCompany.select">
                            <span slot="enablePoint">{{oldDeviceFastPostCompany.value}}></span>
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
        <mt-button @click="apply">提交</mt-button>

        <!--<div style="margin-top:0.3rem">-->
            <!--<mt-button @click="apply">确定</mt-button>-->
        <!--</div>-->

        <!--<div style="margin-top:0.3rem">-->
            <!--<mt-button @click="apply">邮寄旧机</mt-button>-->
        <!--</div>-->

        <div style="margin-top:0.3rem">
            <mt-button @click="apply">取消</mt-button>
        </div>

        <div style="margin-top:0.3rem">
            <mt-button @click="apply">催单</mt-button>
        </div>

        <div style="margin-top:0.3rem">
            <mt-button @click="apply">换绑</mt-button>
        </div>

        <div style="margin-top:0.3rem">
            <span class="mt-emptyBtn" style="width: 44%;margin-left: 0.3rem">
                取消
            </span>
            <span class="mt-greenBtn" style="width: 44%;margin-left: 0.2rem">
                提交
            </span>
        </div>



        <!--操作类型  end-->



    </div>
</template>
<style  scoped lang="less">

    .changeMachineDetail{

        .protocol{
            font-size: 0.24rem;
            padding: 0.28rem;
        }

        .lookPostMsg{
            color: #06C1AE;
            font-size: 0.24rem;
            float: right;
            margin-top: 0.1rem;
        }

    }

    .mt-emptyBtn{
        border-radius: 2.5px;
        font-family: PingFangSC-Semibold;
        font-size: .36rem;
        text-align: center;
        height: 0.84rem;
        line-height: 0.84rem;
        display: inline-block;
        border: 0.02rem solid #A3A3A3;
    }

    .mt-greenBtn{
        background: #06C1AE;
        border-radius: 2.5px;
        font-family: PingFangSC-Semibold;
        font-size: .36rem;
        color: #FFFFFF;
        text-align: center;
        height: 0.88rem;
        line-height: 0.88rem;
        display: inline-block;

    }



</style>
<script>
  import fetchData from '../common/fetchData'
  // 未完成 KNB 如何 npm install
  var KNB = require('@dp/knb')
  console.log(KNB)
  export default {
    name: 'Test',
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
        // 故障时间
        troubleTime: {
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
            that.troubleTime.value = obj.selectItem
          },
          value: '请选择'
        },
        newDeviceFastPostCompany: {
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
            that.newDeviceFastPostCompany.value = obj.selectItem
          },
          value: '顺丰快递'
        },
        oldDeviceFastPostCompany: {
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
            that.oldDeviceFastPostCompany.value = obj.selectItem
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
      //   url: '/errCodeConfig/getSystemNameList'
      // }).then(function(data){
      //
      //   debugger
      //   console.log(result)
      //   that.dataList = data.data.data.srcDef;
      // })
    }
  }
</script>

