<template>
    <div class="mt-sectionItem">
        {{this.$props.title}}
        <span class="mt-sectionItemValue">
            {{this.$props.value}}
            <slot name='value'></slot>
        </span>
    </div>

</template>
<script>
  /* eslint-disable */
export default {
  name: 'item-bar',
  data () {
    return {}
  },
  props: {
    title: String,
    value: {}
  },
  methods: {

  },
  mounted () {
    //debugger
  }
}
</script>
<style lang="less" scoped>
    .mt-sectionItem{
        line-height: 0.58rem;
        border-bottom: 0.02rem solid #EFEFEF;
        padding: 0.27rem 0;

        .mt-sectionItemValue{
            float: right;
        }
    }
    .mt-sectionItem:last-child{
        border: none;
    }
</style>


