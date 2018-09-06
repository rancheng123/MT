<template>
    <div class="testModule initStyle">
        <back-bar :title="'设备换绑'"></back-bar>

        <div>
            <div class="section noPaddingBottom">
                <h3 class="title">旧设备邮寄信息</h3>
                <item-bar :title="'快递公司'">
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
            <div class="section noPaddingBottom">
                <h3 class="title">新设备信息</h3>
                <item-bar :title="'设备SN'">
                    <div slot='value'>
                        456789876543
                    </div>
                </item-bar>
            </div>
        </div>

        <!--操作类型  start-->
        <div style="position: absolute;width: 100%;bottom: 0.3rem;">
            <mt-button @click="apply">提交申请</mt-button>
        </div>

        <!--操作类型  end-->



    </div>
</template>
<style  scoped lang="less">

</style>
<script>
  /* eslint-disable */
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

