<template>
    <div class="backBar">
        <div class="fixedBlock">
            <span class="leftNarrow" @click="returnBack"></span>
            {{this.$props.title}}
        </div>
        <div class="occupyBlock"></div>
    </div>

</template>
<script>
/* eslint-disable */
export default {
  name: 'back-bar',
  data () {
    return {}
  },
  props: {
    title: String
  },
  methods: {
    returnBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
    .backBar{
        .fixedBlock{
            height: 1rem;
            line-height: 1rem;
            background: white;
            text-align: center;
            position: fixed;
            width: 100%;
            .leftNarrow{
                position: absolute;
                left: 0.5rem;
                top: 0.3rem;
            }


            .leftNarrow{
                display: inline-block;
                width: 0.3rem;
                height: 0.3rem;
                border: 0.04rem solid black;
                transform: rotate(-45deg);
                border-right-color: transparent;
                border-bottom-color: transparent;
                vertical-align: middle;
            }
        }
        .occupyBlock{
            height: 1rem;
        }
    }


</style>


