/**
 * 全局组件混入
 */
module.exports = {
  beforeMount () {
    console.log(this.$el)
    this.$el.innerHTML = '<div>shshshsh</div>'
  }
}
