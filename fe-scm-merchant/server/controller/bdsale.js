/**
 *  @file 运营售后管理系统
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-05-16
 **/
'use strict'

module.exports = bdsale => {
  return class BdSaleController extends bdsale.EraController {
    /**
     *  查询列表页
     */
    async index () {
      const {ctx} = this
      await ctx.setClient('zcm')
      await this.getUserRoles()
      await ctx.render('home.ejs', {
        title: '供应链前端系统集成平台',
        userInfo: ctx.userInfo,
        node_env: process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      })
    }

    /**
     * 获取设备编辑列表
     */
    async deviceAuditList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bdsale.deviceAuditList(params)

      this.success(result)
    }

    /**
     * 获取到退换货原因
     */
    async getReasonList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bdsale.getReasonList(params)

      this.success(result)
    }

    /**
     * 撤换机申请预读接口
     */
    async getApplyPreData () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bdsale.getApplyPreData(params)

      this.success(result)
    }

    /**
     * 撤机申请
     */
    async recallApply () {
      const {
        ctx
      } = this

      let params = ctx.request.body || ''
      let result = await this.ctx.service.bdsale.recallApply(params)

      this.success(result)
    }

    /**
     * 换机申请
     */
    async exchangeApply () {
      const {
        ctx
      } = this

      let params = ctx.request.body || ''
      let result = await this.ctx.service.bdsale.exchangeApply(params)

      this.success(result)
    }

    /**
     * 申请校验
     */
    async applyPreCheck () {
      const {
        ctx
      } = this

      let params = ctx.request.body || ''
      let result = await this.ctx.service.bdsale.applyPreCheck(params)

      this.success(result)
    }

    /**
     * 换绑预读接口
     */
    async bindChangePreData () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bdsale.bindChangePreData(params)

      this.success(result)
    }

    /**
     * 发货预读接口
     */
    async deliverGoodsPreData () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bdsale.deliverGoodsPreData(params)

      this.success(result)
    }

    /**
     * 申请换绑
     */
    async bindChange () {
      const {
        ctx
      } = this

      let params = ctx.request.body || ''
      let result = await this.ctx.service.bdsale.bindChange(params)

      this.success(result)
    }

    /**
     * 发货
     */
    async postDevice () {
      const {
        ctx
      } = this

      let params = ctx.request.body || ''
      let result = await this.ctx.service.bdsale.postDevice(params)

      this.success(result)
    }

    /**
     * 申请进度查询
     */
    async processQuery () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bdsale.processQuery(params)

      this.success(result)
    }

    /**
     * 申请日志查询
     */
    async logQuery () {
      const {
        ctx
      } = this

      let params = ctx.request.body || ''
      let result = await this.ctx.service.bdsale.logQuery(params)

      this.success(result)
    }

    /**
     * 获取故障时间
     */
    async getProblemTime () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bdsale.getProblemTime(params)

      this.success(result)
    }

    /**
     * 换机申请详情
     */
    async getExchangeApplyDetail () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.bdsale.getExchangeApplyDetail(params)

      this.success(result)
    }

    /**
     * 回收快递单号
     */
    async trackInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.body || {}
      let result = await this.ctx.service.bdsale.trackInfo(params)

      this.success(result)
    }

    /**
     * 退款账户查询
     */
    async bankInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bdsale.bankInfo(params)

      this.success(result)
    }

    /**
     * 获取特殊业务列表
     */
    async specialRecallList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bdsale.specialRecallList(params)

      this.success(result)
    }

    /**
     * 配送方式
     */
    async getMailType () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bdsale.getMailType(params)

      this.success(result)
    }

    /**
     * 快递公司
     */
    async getExpressList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || {}
      let result = await this.ctx.service.bdsale.getExpressList(params)

      this.success(result)
    }
  }
}
