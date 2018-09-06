
 <template>
  <div class="page-box">
    <page-container :pageConfig="currentPageConfig"></page-container>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      pageConfig: {}
    }
  },
  computed: {
    ...mapGetters({
      currentPage: 'currentPage',
      currentPageConfig: 'currentPageConfig'
    })
  },
  asyncData ({store, route}) {
    store.dispatch('getMtConfig', { key: route.meta.currentPage }).then(result => {
      result = JSON.parse(result)
      store.dispatch('getPageDataSource', {
        applyId: route.query.applyId,
        applyType: route.query.applyType,
        requestUrl: result.requestUrl,
        hostType: result.hostType
      })
    })
  }
}
</script>
<style>
</style>
