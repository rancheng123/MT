<template>
    <div>
        Index
        {{merchantInfo}}
    </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapState, mapGetters, mapActions, mapMutations} = createNamespacedHelpers('index')

  export default {
    name: 'Index',
    computed: {
      ...mapState([
        'merchantInfo'
      ]),
      ...mapGetters([])
    },
    created () {
      this.pageInit()
      this.loadMerchantInfo(11)
      this.submitApplyInfo({
        shopId: 11,
        appId: '22'
      })
    },
    methods: {
      ...mapActions([
        'pageInit',
        'loadMerchantInfo',
        'submitApplyInfo'
      ]),
      ...mapMutations({})
    }
  }
</script>

<style scoped>

</style>
