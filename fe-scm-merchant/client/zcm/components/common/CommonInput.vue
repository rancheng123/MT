<template>
  <el-form-item :label="label" :required="required">
    <el-input @change="contentChange" :placeholder="placeholder || '请输入内容'" v-model="content"></el-input>
  </el-form-item>
</template>
<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  props: ['label', 'name', 'required', 'placeholder'],
  methods: {
    contentChange () {
      let name = this.name || 'inputValue'
      this.$eventBus.$data[name] = this.content
      this.$eventBus.$emit('contentChange', {
        name: this.name,
        value: this.content
      })
    }
  }
}
</script>

