<template>
    <div>
        List
    </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapState, mapGetters, mapActions, mapMutations} = createNamespacedHelpers('list')

  export default {
    name: 'List',
    computed: {
      ...mapState([]),
      ...mapGetters([])
    },
    created () {
      this.pageInit()
    },
    methods: {
      ...mapActions([
        'pageInit'
      ]),
      ...mapMutations({})
    }
  }
</script>

<style scoped>

</style>
