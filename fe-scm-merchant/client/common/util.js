/**
 * client端公共方法类库
 */
class Common {
  paramSerialize (params) {
    let queryString = ''
    if (params) {
      for (let p in params) {
        if (params.hasOwnProperty(p)) {
          if (params[p]) {
            queryString = `${queryString}${p}=${params[p]}&`
          }
        }
      }
    }
    return queryString.replace(/&$/, '')
  }
  getHostMapping (map) {
    let host = window.location.host
    let mapping = {
      SCMPC: {
        local: 'http://localhost:8080/',
        dev: 'http://scmpc.web.dev.sankuai.com/',
        test: 'http://scmpc.zc.st.sankuai.com/',
        prod: 'http://scmpc.zc.meituan.com/',
        st: 'http://scmpc.zc.st.sankuai.com/'
      }
    }

    if (!map && host.indexOf('bsbtt-sl-merchant') > -1) {
      return 'http://3324-bsbtt-sl-scmpc.zc.test.sankuai.com'
    } else {
      map = 'SCMPC'
    }

    if (host === 'localhost:7070') {
      return mapping[map]['dev']
    } else if (host === 'merchant.fe.dev.sankuai.com') {
      return mapping[map]['dev']
    } else if (host === 'merchant.fe.test.sankuai.com') {
      return mapping[map]['test']
    } else if (host === 'merchant.fe.st.sankuai.com') {
      return mapping[map]['st']
    } else {
      return mapping[map]['prod']
    }
  }
  removePhotoItem (source, target) {
    if (Array.isArray(source) && target) {
      if (typeof target === 'string') {
        let index = source.indexOf(target)
        if (index > -1) {
          source.splice(index, 1)
        }
      } else {
        for (let i = 0; i < source.length; i++) {
          if (source[i].url === target.url) {
            source.splice(i, 1)
          }
        }
      }
    }
    return source
  }
}

module.exports = new Common()
