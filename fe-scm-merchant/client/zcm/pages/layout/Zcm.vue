<template>
  <layout>
   <div v-show="zcmHome" class="zcm">欢迎来到供应链前端系统集成平台～</div>
   <transition :name="effect">
     <router-view>
     </router-view>
   </transition>
  </layout>
</template>
<script>

import layout from './Main.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      effect: 'slide-fade'
    }
  },
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
    color: #409EFF;
    font-weight: 400;
 }
 .slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>


