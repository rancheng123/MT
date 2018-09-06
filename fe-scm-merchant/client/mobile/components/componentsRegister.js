/**
 *  把指定组件注册到vue原型链上
 *  例如：this.$alert 访问
 *  -----------------------
 *  Author : wukong
 */
import Vue from 'vue'
import components from './common/componentsLib'

let { prototypeRegister } = components

/**
 * 组件中间件工厂函数
 *
 * @param { Object } component 组件实例
 * @param { String } key 组件名称
 */
function factory (component, key) {
  let ComponentConstructor = Vue.extend(component)
  let vueExtend = null

  function install () {
    Vue.prototype['$' + key] = (opts = {}) => {
      if (!vueExtend) {
        const vueExtend = new ComponentConstructor({
          el: document.createElement('div'),
          data () {
            return {
              ...opts
            }
          }
        })
        document.body.appendChild(vueExtend.$el)
      }
    }
  }
  return install
}

/**
 * 注册到vue原型链上,通过this.$loading方式访问
 */
Object.keys(prototypeRegister).forEach(key => {
  let middware = factory(prototypeRegister[key], key)
  Vue.use(middware)
})

/**
 * 注册成全局组件
 */
Object.keys(components).forEach(key => {
  if (key !== 'prototypeRegister') {
    Vue.component(key, components[key])
  }
})
