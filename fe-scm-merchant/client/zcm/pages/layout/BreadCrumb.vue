<template>
   <div v-if="required">
    <ul class="bread-crumb">
      <li class="item-crumb">
         <a @click="goBack">返回</a>
      </li>
      <li> > </li>
      <li class="item-crumb">当前页</li>
    </ul>
   </div>
</template>
<script>
export default {
  props: ['required'],
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>
<style>
.bread-crumb {
    display: -webkit-box;
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    font-size: 12px;
    background: #fff;
    padding: 0 0 5px 5px;
}
.bread-crumb li {
    margin-right: 5px
}
.bread-crumb li a {
    text-decoration: none;
}
a:hover, a:visited, a:link, a:active {
    color: #409EFF;
}
.bread-crumb .item-crumb {
    cursor: pointer;
    color: #409EFF;
}
</style>


