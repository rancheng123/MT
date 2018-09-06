/**
 *  vue自定义指令
 *
 *  ----------------
 *  Author : wukong
 */
import Vue from 'vue'
import loading from './common/loading'

let dom = new Vue(loading).$mount()

let isTrue = (val) => {
  return val && val === true
}
/**
 * v-loading指令
 */
Vue.directive('loading', function (el, binding) {
  let val = binding.value
  let outer = document.createElement('div')

  outer.className = 'mt-loading'
  outer.style.cssText = `position: absolute;
    top: 0; overflow: auto;
    background: rgba(235, 235, 235, .5);
    z-index: 104; width: 100%;
    height: 100%`

  outer.appendChild(dom.$el)

  if (isTrue(val)) {
    el.appendChild(outer)
  } else {
    let loadings = document.querySelectorAll('.mt-loading')
    if (loadings && loadings.length) {
      loadings[0].remove()
    }
  }
})
