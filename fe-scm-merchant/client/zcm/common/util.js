/**
 * client端公共方法类库
 */
class Common {
  paramSerialize (params) {
    let queryString = ''
    if (params) {
      for (let p in params) {
        if (params.hasOwnProperty(p)) {
          if (params[p] !== '' && params[p] !== undefined && params[p] !== null) {
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
        local: 'http://localhost:8080',
        dev: 'http://scmpc.web.dev.sankuai.com',
        test: 'http://scmpc.zc.test.sankuai.com',
        prod: 'http://scmpc.zc.meituan.com',
        st: 'http://scmpc.zc.st.sankuai.com'
      },
      SALE: {
        prod: 'http://devicesale-zc.sankuai.com',
        st: 'http://10.32.250.69:8080',
        test: 'http://devicesale.zc.test.sankuai.com',
        dev: 'http://10.24.63.254:8080',
        local: 'http://10.24.63.254:8080'
      },
      /**
       * 还是用pc 1.0的接口配置，注意后期站点下线
       */
      POS: {
        prod: 'http://mtc.pos.sankuai.com',
        st: 'http://mtc.zc.st.sankuai.com',
        test: 'http://mtc.zc.test.sankuai.com',
        dev: 'http://mtc.zc.dev.sankuai.com',
        local: 'http://mtc.zc.dev.sankuai.com'
      }
    }

    if (host.indexOf('3324-romsh-sl-merchant') > -1 && map === 'SCMPC') {
      return 'http://3324-romsh-sl-scmpc.zc.test.sankuai.com'
    } else if (!map) {
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
  formatDate (date, formatType) {
    if (!date) {
      return date
    } else if (formatType === 'yy-MM-dd') {
      return this.getFormatDate(date, '-')
    } else if (formatType === 'yy/MM/dd') {
      return this.getFormatDate(date, '/')
    } else {
      return date
    }
  }
  getFormatDate (date, character) {
    let source = new Date(date)
    let y = source.getFullYear()
    let m = source.getMonth() + 1
    let d = source.getDate()

    if (m < 10) {
      m = '0' + m
    }

    return [y, m, d].join(character)
  }
  getUploadPictrueAction (type) {
    if (type === 'cdc') {
      return 'http://mtc.pos.sankuai.com/japi/coop/uploadPictureUseCDC'
    } else {
      return 'http://mtc.pos.sankuai.com/japi/coop/uploadPicture'
    }
  }
  /**
   * 获取指定的query参数
   */
  getSearchQuery (query) {
    let params = {}
    let search = window.location.search.replace('?', '')
    if (search) {
      let list = search.split('&')
      list.forEach(item => {
        let array = item.split('=')
        params[array[0]] = array[1]
      })
    }

    return params[params]
  }
}

module.exports = new Common()
