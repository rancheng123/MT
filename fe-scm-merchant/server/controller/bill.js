/**
 *  @file 上单管理系统首页控制器
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-04-20
 **/
'use strict'

module.exports = bill => {
  return class HomeController extends bill.EraController {
    /**
     *  查询列表页
     */
    async index () {
      const {ctx} = this
      await ctx.setClient('bill')
      await this.getUserRoles()
      await ctx.render('home.ejs', {
        title: '商户信息管理系统',
        userInfo: ctx.userInfo,
        node_env: process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      })
    }

    /**
     * 根据shopid获取到门店信息
     */
    async getShopInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bill.getShopInfo(params)

      this.success(result)
    }

    /**
     * 获取资质信息
     */
    async getQualificationInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bill.getQualificationInfo(params)

      this.success(result)
    }

    /**
     * 保存门店信息
     */
    async saveShopInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bill.saveShopInfo(params)

      this.success(result)
    }

    /**
     * 保存资质信息
     */
    async saveQualificationInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bill.saveQualificationInfo(params)

      this.success(result)
    }

    /**
     * 获取行业类目
     */
    async getBizUserMccList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bill.getBizUserMccList(params)

      this.success(result)
    }

    /**
     * 获取门店账户信息
     */
    async getShopAccountInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bill.getShopAccountInfo(params)
      let bindCardInfo = await this.ctx.service.bill.queryBindBankCard(params)

      // 查询出商户绑定的银行卡
      if (bindCardInfo && bindCardInfo.status === 200) {
        result.bindBankAccountId = bindCardInfo.data.bankAccountId
      }

      this.success(result)
    }

    /**
     * 保存银行卡信息
     */
    async saveBankCard () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bill.saveBankCard(params)

      this.success(result)
    }

    /**
     * 获取开户行列表
     */
    async getBankList () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bill.getBankList(params)

      this.success(result)
    }

    /**
     * 获取开户行支行列表
     */
    async getBankBranchList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bill.getBankBranchList(params)

      this.success(result)
    }

    /**
     * 门店绑定结算卡
     */
    async bindBankCard () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bill.bindBankCard(params)

      this.success(result)
    }

    /**
     * 获取结算费率
     */
    async getShopRate () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bill.getShopRate(params)

      this.success(result)
    }

    /**
     * 保存结算费率
     */
    async saveShopRate () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bill.saveShopRate(params)

      this.success(result)
    }

    /**
     * 获取银行开户省份
     */
    async getBankProvinceList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bill.getBankProvinceList(params)

      this.success(result)
    }

    /**
     * 获取银行开户城市
     */
    async getBankCityList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bill.getBankCityList(params)

      this.success(result)
    }

    /**
     * 查询是否显示清算授权书
     */
    async getNeedSettlePhoto () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bill.getNeedSettlePhoto(params)

      this.success(result)
    }

    /**
     * 商户账号搜索
     */
    async searchEcomAccounts () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bill.searchEcomAccounts(params)

      this.success(result)
    }

    /**
     * 查询门店绑定银行卡
     */
    async queryBindBankCard () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bill.queryBindBankCard(params)

      this.success(result)
    }
  }
}
