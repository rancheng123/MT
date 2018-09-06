/**
 * deviceAuditList接口返回数据schema
 */
exports.DEVICE_AUDIT_LIST = {
  title: 'deviceAuditList接口返回数据schema',
  type: 'object',
  required: ['applyId', 'applyTime', 'applyType'],
  properties: {
    applyId: {
      type: 'number'
    },
    applyTime: {
      type: 'string'
    },
    applyType: {
      type: 'number'
    },
    applyTypeDesc: {
      type: 'string'
    },
    applyUserInfo: {
      type: 'string'
    },
    applyUserOrg: {
      type: 'string'
    },
    bizName: {
      type: 'string'
    },
    cityName: {
      type: 'string'
    },
    deviceMode: {
      type: 'string'
    }
  }
}
