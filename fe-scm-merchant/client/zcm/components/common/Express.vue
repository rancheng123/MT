
<template>
  <el-form-item :label="label || '快递公司:'" :required="required">
    <el-select v-model="selectId" @change = "expressChange" clearable  :placeholder="placeholder || '请选择'">
        <el-option
        v-for="item in expressList"
        :key="item.key"
        :label="item.value"
        :value="item.key">
        </el-option>
    </el-select>
  </el-form-item>  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['label', 'name', 'required', 'placeholder'],
  data () {
    return {
      selectId: ''
    }
  },
  computed: {
    ...mapGetters({
      expressList: 'expressList'
    })
  },
  methods: {
    expressChange () {
      let property = this.name || 'company'
      this.$eventBus.$data[property] = this.selectId
    }
  },
  mounted () {
    this.$store.dispatch('getExpressList')
  }
}
</script>
<style>
</style>

