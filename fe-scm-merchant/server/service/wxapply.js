const common = require('../common/util.js')
const curlFactory = require('../common/curl').create('wxapply')
const Service = require('@fdfe/era-node').Service
const fs = require('fs')

/**
 * 表格转换配置
 * @type {{headers: string[]}}
 */
const options = {
  headers: [
    '门店ID', '商户名称', '联系方式', '公众号ID', '营业执照名称', '品类名称',
    '微信商户号', '通道', '子商户号', '通道状态', '通道下所有小程序'
  ]
}

/**
 * 数据字段映射
 * @type {{}}
 */
const transMap = {
  'shopId': '门店ID',
  'shopName': '商户名称',
  'contractTel': '联系方式',
  'appId': '公众号ID',
  'merchantName': '营业执照名称',
  'mccName': '品类名称',
  'wxMerchantId': '微信商户号',
  'channel': '通道',
  'wxSubMerchantId': '子商户号',
  'channelState': '通道状态',
  'subappIds': '通道下所有小程序'
}

/**
 * xlxs工厂方法
 * @type {function(*, *=): *}
 */
const xlsxFactory = require('../common/xlsx')(options)

/**
 * 转换数据格式
 * @param data
 * @returns {*}
 */
const transData = (data = []) => {
  return data.map(item => {
    const _item = {}
    Object.keys(item).forEach(key => {
      const _key = transMap[key] || key
      _item[_key] = item[key]
    })
    return _item
  })
}

/**
 * WxapplyService
 */
class WxapplyService extends Service {
  /**
   * excel下载
   * @param name
   * @param data
   * @returns {Promise<void>}
   */
  async download (name, data) {
    const ctx = this.ctx
    // 获取生成excel文件路径
    const _path = await xlsxFactory(transData(data), name)
    // 设置下载文件名称
    ctx.set('Content-disposition', 'attachment;filename=' + encodeURIComponent(name))
    // 设置文件类型
    ctx.type = '.xlsx'
    // 设置文件内容
    ctx.body = fs.createReadStream(_path)
    // 删除已下载完成文件
    fs.unlinkSync(_path)
  }

  /**
   * post
   * @param path
   * @param params
   * @returns {Promise<*|void>}
   */
  async post (path, params) {
    const ctx = this.ctx
    const url = `${common.getHostMapping('COOP', this)}${path}`
    return await curlFactory(ctx).post(url, params)
  }

  /**
   * get
   * @param path
   * @param params
   * @returns {Promise<*>}
   */
  async get (path, params) {
    const ctx = this.ctx
    const url = `${common.getHostMapping('COOP', this)}${path}`
    return await curlFactory(ctx).get(url, params)
  }

  /**
   * 获取申请记录列表
   * @param params
   * @returns {Promise<*|void>}
   */
  async list (params) {
    return await this.post('/scp/wxmp/list', params)
  }

  /**
   * 运营审核
   * @param params
   * @returns {Promise<*|void>}
   */
  async audit (params) {
    return await this.post('/scp/wxmp/audit', params)
  }

  /**
   * 提交申请
   * @param params
   * @returns {Promise<*|void>}
   */
  async submit (params) {
    return await this.post('/scp/wxmp/submit', params)
  }

  /**
   * 数据导出
   * @param params
   * @returns {Promise<*[]>}
   */
  async query (params) {
    return [
      {
        'shopId': '164587005',
        'shopName': '川西坝子火锅',
        'merchantName': '南昌县川西坝子火锅',
        'contractTel': '18564562365',
        'appId': 'wxa54d7397d',
        'mccName': 'wxa54d7397d',
        'wxMerchantId': '1473257002',
        'channel': 'CEB_XM_1011',
        'wxSubMerchantId': '83834801',
        'channelState': '可用',
        'subappIds': 'fdasfdsafdsafsd'
      }
    ]
    // return await this.get('/scp/wxmp/data/query', params)
  }

  /**
   * 门店查询获取商户信息
   * @param params
   * @returns {Promise<*>}
   */
  async suggest (params) {
    return {
      shopId: '11',
      name: '22',
      contractTel: '33',
      merchantName: '44',
      mccName: '55'
    }
    // return this.get('/scp/wxmp/shopInfo/suggest', params)
  }
}

module.exports = WxapplyService
