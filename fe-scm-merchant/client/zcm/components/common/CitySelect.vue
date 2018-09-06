<template>
   <el-form-item :label="label" :required="required">
        <el-select v-model="cityId" @change = "cityChange" clearable :placeholder="placeholder || '请选择'">
            <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
      cityId: ''
    }
  },
  computed: {
    ...mapGetters({
      cityList: 'cityList'
    })
  },
  methods: {
    cityChange () {
      let property = this.name || 'cityId'
      this.$eventBus.$data[property] = this.cityId
      /**
       * 选择城市会自动拉取区域数据
       */
      this.$eventBus.$emit('regionChange', this.cityId)
    }
  },
  mounted () {
    /**
     * 选择省份的时候切换城市
     */
    this.$eventBus.$on('proviceChange', provinceId => {
      this.cityId = ''
      this.$store.dispatch('getCityList', provinceId)
    })
  }
}
</script>
<style>
</style>


