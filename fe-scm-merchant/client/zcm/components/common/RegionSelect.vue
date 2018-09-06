<template>
   <el-form-item :label="label" :required="required">
        <el-select v-model="regionId" @change = "regionChange" clearable :placeholder="placeholder || '请选择'">
            <el-option
            v-for="item in regionList"
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
      regionId: ''
    }
  },
  computed: {
    ...mapGetters({
      regionList: 'regionList'
    })
  },
  methods: {
    regionChange () {
      let property = this.name || 'regionId'
      this.$eventBus.$data[property] = this.regionId
    }
  },
  mounted () {
    /**
     * 选择省份的时候切换城市
     */
    this.$eventBus.$on('regionChange', cityId => {
      this.regionId = ''
      this.$store.dispatch('getRegionList', cityId)
    })
  }
}
</script>
<style>
</style>


