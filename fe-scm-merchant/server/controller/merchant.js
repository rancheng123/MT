/**
 *  @file 商户信息管理系统首页控制器
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-04-20
 **/
'use strict'

module.exports = merchant => {
  return class HomeController extends merchant.EraController {
    /**
     *  查询列表页
     */
    async index () {
      const {ctx} = this
      await ctx.setClient('merchant')
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
     * 巡检列表页
     */
    async inspection () {
      const {ctx} = this
      await ctx.setClient('merchant')
      await ctx.render('home.ejs', {
        title: '巡检记录',
        userInfo: ctx.userInfo,
        node_env: process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      })
    }

    /**
     * 根据省份id查询城市列表
     */
    async getCityList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchant.getCityList(params)

      this.success(result)
    }

    /**
     * 获取城市列表
     */
    async getProvinceList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchant.getProvinceList(params)

      this.success(result)
    }

    /**
     * 查询商户信息
     */
    async getBusinessInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchant.getBusinessInfo(params)

      this.success(result)
    }

    /**
     * 查询巡检记录
     */
    async getShopCheckInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchant.getShopCheckInfo(params)

      this.success(result)
    }

    /**
     * 获取用户角色
     */
    async getUserRole () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchant.getUserRole(params)

      this.success(result)
    }

    /**
     * 获取产品列表
     */
    async getProductTypeList () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchant.getProductTypeList(params)

      this.success(result)
    }

    /**
     * 获取下载记录
     */
    async getDownLoadInfo () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchant.getDownLoadInfo(params)

      this.success(result)
    }

    /**
     * 导出信息
     */
    async exportMerchant () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchant.exportMerchant(params)

      this.success(result)
    }
  }
}
