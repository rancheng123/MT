<template>
<div>
  <el-table
    :data="businessList"
    v-loading="businessLoadMsg.loading"
    stripe
    border
    style="margin: 10px 0 0 0">
    <el-table-column
      prop="shopId"
      label="门店ID">
    </el-table-column>
    <el-table-column
      prop="receiptName"
      label="门店名称">
    </el-table-column>
     <el-table-column
      prop="provinceName"
      label="门店所属省份">
    </el-table-column>
    <el-table-column
      prop="cityName"
      label="门店所属城市">
    </el-table-column>
    <!-- <el-table-column
        prop="contractPerson"
        label="商家联系人">
    </el-table-column> -->
    <el-table-column
      width="400"
      label="收单产品状态">
    </el-table-column>
    <el-table-column
        prop="ecomAccount"
        label="商家账号">
    </el-table-column>
    <el-table-column
      label="操作"
      width="120"
      >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)"  icon="el-icon-search" type="text" size="small" v-show='scope.row.showTradeRecord'>查询交易记录</el-button>
        <el-button type="text" size="small"  icon="el-icon-search" @click="toShopCheck(scope.row)" v-show='scope.row.showVisitRecord'>巡检记录</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination :totalCount="businessLoadMsg.totalCount" :currentPage=1></pagination>
  </div>
</template>

<script>

import util from '../../common/util.js'
import pagination from './Pagination.vue'

export default {
  props: ['businessList', 'businessLoadMsg'],
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    toShopCheck (row) {
      this.$router.push(`/zcm/merchant/inspection?shopId=${row.shopId}`)
    },
    handleClick (row) {
      window.location.href = `http://ops.zc.meituan.com/compliance/detail`
    }
  },
  data () {
    return {
    }
  },
  components: {
    pagination
  },
  updated () {
    let $tableColumn = document.querySelectorAll('td:nth-child(5)')
    let shopList = this.businessList

    shopList.forEach(function (item, index) {
      let productList = item.productList || []
      let html = ''
      let href = ''

      productList.forEach((item, index) => {
        let had = [24, 32].indexOf(item.productStatus) > 0
        let classNames = had ? 'product-yes' : 'product-no'

        if (item.productType === 1 && had) {
          href = `${util.getHostMapping('SCMPC')}/pc/createContract/1/${item.id}`
        } else if (item.productType !== 1 && had) {
          let productType = ''
          if (item.productType === 4) {
            productType = 5
          } else {
            productType = item.productType === 5 ? 4 : item.productType
          }

          href = `${util.getHostMapping('SCMPC')}/pc/viewShopInfo/${productType}/${item.id}`
        } else {
          href = 'javascript:void(0)'
        }

        html = html + `<div class="product-status"><span class='product-type-title'>${item.productTypeName}：</span><a href="${href}" target="_blank" class=${classNames}>${had ? '已上单' : '未上单'}</a><span class="owner-bd">责任BD:</span><span>${item.ownerMis || ''}</span></div>`
      })

      $tableColumn[index].innerHTML = html
    })
  }
}
</script>
<style>
  .product-type-title {
    min-width: 140px;
    display: inline-block;
    text-align: left;
  }
  .product-yes {
    background: #67C23A;
    color: white !important;
    border-radius: 2px;
    font-size: 11px;
    padding: 1px;
    cursor: pointer;
    text-decoration:none
  }
  .product-no {
    background:#909399;
    color: white !important;
    border-radius: 2px;
    font-size: 11px;
    padding: 1px;
    cursor: pointer;
    text-decoration:none
  }
  .el-table .warning-row {
    height: 20px;
    transition: heigth .3s;
    background: oldlace;
  }

  /* .el-table .success-row {
    transition: heigth .3s;
    background: #f0f9eb;
  } */
  .owner-bd{
    margin-left: 30px;
  }
  .product-status{
    padding: 0 10px;
    text-align: left;
  }
</style>
