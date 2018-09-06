<template>
    <div class="returnAndChangeProtocolModule">
        <back-bar :title="'换机详情'"></back-bar>

        <header>
            商户退换机协议
        </header>
        <section>
            1、入驻美团、大众点评不收取任何费用，成单后会按订单价格收取一定的费用，其中费率是3%-10%不等，具体费率您可在创建团购、买单、代金券的时候查看
        </section>
        <section>
            2、入驻美团、大众点评不收取任何费用，成单后会按订单价格收取一定的费用，其中费率是3%-10%不等，具体费率您可在创建团购、买单、代金券的时候查看
        </section>




    </div>
</template>
<style  scoped lang="less">
    #app .returnAndChangeProtocolModule{
        text-align: left;
    }
    .returnAndChangeProtocolModule{
        background: white;
        font-size: 0.32rem;
        padding-bottom: 0.68rem;
        header{

            text-align: center;
            font-family: PingFangSC-Semibold;
        }
        section{
            padding: 0.38rem;
            font-size: 0.28rem;
            background: white;
            color: #666666;
            padding-bottom: 0;
        }



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

