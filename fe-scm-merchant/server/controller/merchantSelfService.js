/**
 *  @file 上单管理系统首页控制器
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-04-20
 **/
'use strict';

module.exports = mobile => {
  return class MerchantSelfServiceController extends mobile.EraController {
    /**
     *  查询列表页
     */
    async index() {
      const { ctx } = this;
      await ctx.setClient('mobile');
      await this.getUserRoles();
      await ctx.render('mobile.ejs', {
        title: "商户自助申请",
        userInfo: ctx.userInfo,
        node_env:  process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      });
    }
    /**
     *  退机详情页
     */
    async returnMachineDetail() {
      const { ctx } = this;
      await ctx.setClient('mobile');
      await this.getUserRoles();
      await ctx.render('mobile.ejs', {
        title: "退机详情页",
        userInfo: ctx.userInfo,
        node_env:  process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      });
    }
    /**
     *  换机详情页
     */
    async changeMachineDetail() {
      const { ctx } = this;
      await ctx.setClient('mobile');
      await this.getUserRoles();
      await ctx.render('mobile.ejs', {
        title: "换机详情页",
        userInfo: ctx.userInfo,
        node_env:  process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      });
    }
    /**
     *  退换机协议
     */
    async returnAndChangeProtocol() {
      const { ctx } = this;
      await ctx.setClient('mobile');
      await this.getUserRoles();
      await ctx.render('mobile.ejs', {
        title: "换机详情",
        userInfo: ctx.userInfo,
        node_env:  process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      });
    }
    /**
     *  旧机邮寄
     */
    async oldMachinePost() {
      const { ctx } = this;
      await ctx.setClient('mobile');
      await this.getUserRoles();
      await ctx.render('mobile.ejs', {
        title: "旧机邮寄",
        userInfo: ctx.userInfo,
        node_env:  process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      });
    }
    /**
     *  设备换绑
     */
    async machineReplaceBind() {
      const { ctx } = this;
      await ctx.setClient('mobile');
      await this.getUserRoles();
      await ctx.render('mobile.ejs', {
        title: "设备换绑",
        userInfo: ctx.userInfo,
        node_env:  process.env.NODE_ENV,
        _eraState: {
          csrf: ctx.csrf
        }
      });
    }

    /**
     * 故障时间
     */
    async problemTime () {
      const {
        ctx
      } = this

      let params = ctx.request.query || ''
      let result = await this.ctx.service.merchantSelfService.problemTime(params)

      this.success(result)
    }
  }
}
