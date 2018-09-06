
<template>
  <el-form-item :label="label" :required="required">
    <el-select v-model="provinceId" @change = "proviceChange" clearable  :placeholder="placeholder || '请选择'">
        <el-option
        v-for="item in provinceList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
    </el-select>
  </el-form-item>   
</template>
<script>
/**
 * el-form-item相关的组件必须包裹到Form组件中
 */
import { mapGetters } from 'vuex'

export default {
  props: ['label', 'name', 'required', 'placeholder'],
  data () {
    return {
      provinceId: ''
    }
  },
  computed: {
    ...mapGetters({
      provinceList: 'provinceList'
    })
  },
  mounted () {
    if (!this.provinceList || !this.provinceList.length) {
      this.$store.dispatch('getProvinceList')
    }
  },
  methods: {
    proviceChange () {
      let property = this.name || 'proviceId'
      this.$eventBus.$data[property] = this.provinceId
      this.$eventBus.$emit('proviceChange', this.provinceId)
    }
  }
}
</script>
<style>
.mt-select .mt-select-label {
  font-size: 14px;
  color: #606266
}
</style>

