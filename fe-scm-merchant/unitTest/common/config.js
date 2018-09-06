const HOSTENUM = {
  prod: 'http://merchant-zc.meituan.com',
  dev: ' http://localhost:7070'
}

/**
 * 请求携带的cookies，必须传，不然会跳转到sso
 */
exports.Cookie = '86148138_ssoid=c2ecf94253*74c5d8d5e9fc99583a8d4'

/**
 * 域名可以随便切换，线上线下接口均可以测试
 */
exports.Host = HOSTENUM.prod

/**
 * 用户userID
 */
exports.userId = 2238275
