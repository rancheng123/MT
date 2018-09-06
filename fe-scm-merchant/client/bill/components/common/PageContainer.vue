<template>
   <div class="shop-info-box" v-loading="loading">
     <slot></slot>
   </div>
</template>
<script>
export default {
  props: ['loading']
}
</script>
<style>
 .shop-info-box {
   position: relative;
   overflow: hidden;
   width: 95%;
   margin: 0 auto;
   background: white;
   padding: 20px 20px
 }
 .shop-info-box .shop-info-item {
   position: relative;
   overflow: hidden;
   clear: both;
   margin-top: 20px;
   border-bottom: 1px #E4E7ED solid;
 }
</style>


