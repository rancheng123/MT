<template>
  <layout>
   <div class="zcm">没有权限访问该页面，请联系管理员开通权限～</div>
   <router-view>
   </router-view> 
  </layout>
</template>
<script>

import layout from './Main.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    layout
  },
  computed: {
    ...mapGetters({
      zcmHome: 'zcmHome'
    })
  }
}
</script>
<style>
 .zcm {
    height: 200px;
    line-height: 200px;
    font-size: 20px;
    color: #E6A23C;
    font-weight: 400;
 }
</style>


