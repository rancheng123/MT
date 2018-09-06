/**
 *  @file 客户资质信息
 *  --------------------------------------------
 *  Author : wukong
 *  Mail   : wukong@meituan.com
 *  Date   : 2018-07-11
 **/
'use strict';
module.exports = qualification => {
  return class QualificationController extends qualification.EraController {
    /**
     * 获取客户信息
     */
    async getCustomerWithAuth() {

      const {
        ctx
      } = this;

      let params = ctx.request.query || '';
      let result = await this.ctx.service.qualification.getCustomerWithAuth(params);

      this.success(result || {})
    }
    
    /**
     * 保存客户信息
     */
    async saveCustomerWithAuth() {

      const {
        ctx
      } = this;

      let params = ctx.request.body || '';
      let result = await this.ctx.service.qualification.saveCustomerWithAuth(params);

      this.success(result || {})
    }

    /**
     * 提交审核
     */
    async submitAudit () {
      const {
        ctx
      } = this;

      let params = ctx.request.body || '';
      let result = await this.ctx.service.qualification.submitAudit(params);

      this.success(result || {})
    }

    /**
     * 审核详情获取
     */
    async queryAudit() {
      const {
          ctx
        } = this;
      let params = ctx.request.query || '';
      let result = await this.ctx.service.qualification.queryAudit(params);
      this.success(result || {})
    }
    /**
     * 审核驳回原因获取
     */
    async queryReason() {

      const {
          ctx
        } = this;

      let params = ctx.request.query || '';
      let result = await this.ctx.service.qualification.queryReason(params);
      this.success(result || {})
    }


    /**
     * 预读数据
     */
    async preFillCustomerWithAuth() {
      const {
        ctx
      } = this;

      let params = ctx.request.query || '';
      let result = await this.ctx.service.qualification.preFillCustomerWithAuth(params);
      this.success(result || {})
    }

    /**
     * 保存资质审核
     */
    async saveAudit() {
      const {
        ctx
      } = this;

      let params = ctx.request.body || '';
      let result = await this.ctx.service.qualification.saveAudit(params);

      this.success(result || {})
    }  
  }

  
}