
import Vue from 'vue'
import ComponentsLib from './components/common/ComponentsLib'

/**
 * 注入全局的页面容器组件
 * 所有组件必须包裹在一个容器组件中
 */
Vue.component('page-container', {
  render: function (createElement) {
    return this.deepComponents(this.pageConfig, createElement)
  },
  methods: {
    deepComponents (pageConfig, createElement) {
      if (pageConfig) {
        return createElement(ComponentsLib[pageConfig.uniqueId], {
          ...pageConfig.attrs
        }, this.deepChildren(pageConfig.children, createElement))
      }
    },
    /**
     * 递归遍历所有子组件
     * @param {} pageConfig
     * @param {*} createElement
     */
    deepChildren (pageConfig, createElement) {
      if (!pageConfig) {
        return createElement('span')
      }
      if (pageConfig) {
        let children = []
        for (let i = 0; i < pageConfig.length; i++) {
          let item = pageConfig[i]
          if (item) {
            children.push(createElement(ComponentsLib[item.uniqueId], {
              ...item.attrs }, this.deepChildren(item.children, createElement)))
          }
        }
        return children
      }
    }
  },
  props: {
    pageConfig: {
      type: Object,
      required: true
    }
  }
})
