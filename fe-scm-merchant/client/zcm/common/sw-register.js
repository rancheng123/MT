/**
 * service worker注册入口
 */
class SwRegister {
  register () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./../../static/js/sw-client.js', {
        scope: '/static/js/'
      }).then(result => {
        console.log('恭喜你，Service Worker注册成功啦！')
      }).catch(exception => {
        console.log(exception)
      })
    }
  }
}

module.exports = new SwRegister()
