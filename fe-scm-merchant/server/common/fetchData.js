/**
 * http请求的封装
 */

let axios = require('axios')

module.exports = async function fetchData (options) {
  return await axios(options)
}
