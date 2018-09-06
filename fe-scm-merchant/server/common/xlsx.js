const xlsx = require('xlsx')
const os = require('os')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

/**
 * md5
 * @param text
 * @returns {*|PromiseLike<ArrayBuffer>}
 */
function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex')
}

/**
 * createXlsxFactory
 * @param headers
 * @param rootDir
 * @returns {function(*, *=): *}
 */
function createXlsxFactory ({headers, rootDir}) {
  const _root = fs.existsSync(rootDir) ? rootDir : os.tmpdir()

  /**
   * xlsxFactory
   * @param data
   * @param name
   * @returns _path
   */
  return function (data, name = 'output') {
    // name 做md5 hash处理
    const _name = md5(name) + '.xlsx'
    // 基于root 和 name 生成路径
    const _path = path.resolve(_root, _name)
    // 表头格式转换
    const _headers = headers
      .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
      .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {})

    // 表格内容格式转换
    // todo 2层reduce性能可能会有问题，算法还可以优化
    const _data = data
      .map((v, i) => headers.map((k, j) => Object.assign({}, {
        v: v[k],
        position: String.fromCharCode(65 + j) + (i + 2)
      })))
      .reduce((prev, next) => prev.concat(next))
      .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {})

    const output = Object.assign({}, _headers, _data)
    // 获取所有单元格的位置
    const outputPos = Object.keys(output)
    // 计算出范围
    const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]
    // 构建 workbook 对象
    const workbook = {
      SheetNames: ['mySheet'],
      Sheets: {'mySheet': Object.assign({}, output, {'!ref': ref})}
    }
    // 导出 Excel
    xlsx.writeFile(workbook, _path)

    return _path
  }
}

module.exports = createXlsxFactory
