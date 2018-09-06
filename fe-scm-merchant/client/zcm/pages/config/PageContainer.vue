<template>
    <div class="page-box">
        <page-container :pageConfig="currentPageConfig"></page-container>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentPage: 'currentPage',
      currentPageConfig: 'currentPageConfig'
    })
  },
  asyncData ({store, route}) {
    store.dispatch('getMtConfig', { key: route.meta.currentPage })
  }
}
</script>
<style lang="less" scoped>

</style>


