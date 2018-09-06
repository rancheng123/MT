/**
 * 售后运营相关测试用例
 * 结合了BDD / TDD写法
 */
let {fetchData, paramSerialize} = require('../common/util')
let chai = require('chai')
let assert = chai.assert
let expect = chai.expect
let {DEVICE_AUDIT_LIST} = require('../schemas/bdsale/bdsale')
/**
 * 主要用于断言schema
 */
chai.use(require('chai-json-schema'))

describe('售后运营获取退换机申请单列表接口测试', () => {
  let apiResult = null
  let params = {
    pageNum: 1,
    pageSize: 10
  }

  describe('获取退机申请单列表', () => {
    it('接口正常返回，且接口返回状态码为200', async () => {
      params.applyType = 1
      let result = await fetchData({
        url: `/zcm/bdsale/deviceAuditList?${paramSerialize(params)}`
      })

      apiResult = result.data.data
      expect(apiResult.status).to.equal(200)
    })

    it('接口正常返回，且数据类型为数组', async () => {
      expect(apiResult.data).to.be.a('object')
      expect(apiResult.data.list).to.be.a('array')
      assert.jsonSchema(apiResult.data.list[0], DEVICE_AUDIT_LIST)
    })

    it('接口正常返回，且数组中的元素为对象，对象的的属性符合指定Schema', async () => {
      expect(apiResult.data.list).to.have.lengthOf.at.least(1)
      assert.jsonSchema(apiResult.data.list[0], DEVICE_AUDIT_LIST)
    })
  })

  describe('获取换机申请单列表', () => {
    it('接口正常返回，且接口返回状态码为200', async () => {
      params.applyType = 2
      let result = await fetchData({
        url: `/zcm/bdsale/deviceAuditList?${paramSerialize(params)}`
      })

      apiResult = result.data.data
      expect(apiResult).to.be.a('object')
      expect(apiResult.status).to.equal(200)
    })

    it('接口正常返回，且数据类型为数组', async () => {
      expect(apiResult.data).to.be.a('object')
      expect(apiResult.data.list).to.be.a('array')
    })

    it('接口正常返回，且数组中的元素为对象，对象的的属性符合指定Schema', async () => {
      expect(apiResult.data.list).to.have.lengthOf.at.least(1)
      assert.jsonSchema(apiResult.data.list[0], DEVICE_AUDIT_LIST)
    })
  })
})

describe('售后运营退换机申请预判断接口', () => {
  let apiResult = null
  let params = {
    'deviceType': 4,
    'shopId': 10000,
    'applyType': 1,
    'deviceSn': 10000
  }

  describe('退机申请', () => {
    it('接口正常返回，且接口返回状态码为500', async () => {
      let result = await fetchData({
        method: 'post',
        url: `/zcm/bdsale/applyPreCheck`,
        data: params
      })

      apiResult = result.data.data
      expect(apiResult).to.be.a('object')
      expect(apiResult.status).to.equal(500)
    })
  })

  describe('换机申请', () => {
    it('接口正常返回，且接口返回状态码为500', async () => {
      params.applyType = 2
      let result = await fetchData({
        method: 'post',
        url: `/zcm/bdsale/applyPreCheck`,
        data: params
      })

      apiResult = result.data.data
      expect(apiResult).to.be.a('object')
      expect(apiResult.status).to.equal(500)
    })
  })
})
