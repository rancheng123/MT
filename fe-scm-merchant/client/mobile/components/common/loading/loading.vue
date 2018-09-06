<template>
  <div class="loading">
    <span class="loading-spinners" :style="style">
      <i class="loading-spinner" v-for="(item, index) in balde" :key="index"></i>
    </span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'loading',
    data () {
      return {
        balde: 12
      }
    },
    props: {
      size: {
        type: Number
      }
    },
    computed: {
      style () {
        if (!this.size) {
          return
        }
        const value = `${this.size}px`
        return {
          width: value,
          height: value
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @num: 12;
  .loading {
    font-size: 14px;
    padding: 5px 0px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    .loading-spinners {
      position: relative;
      display: block;
      width: 40px;
      height: 40px;
      margin: 0 auto;
      .loading-spinner {
        position: absolute;
        left: 44.5%;
        top: 37%;
        width: 1px;
        height: 25%;
        border-radius: 50%/20%;
        opacity: .25;
        background-color: #292323;
        animation: spinner-fade 1s linear infinite;
        &:nth-child(1) {
            animation-delay: 0s;
            transform: rotate(30deg * (1 - 6)) translateY(-150%);
        }
        &:nth-child(2) {
            animation-delay: 0.083s;
            transform: rotate(30deg * (2 - 6)) translateY(-150%);
        }
        &:nth-child(3) {
            animation-delay: 0.166s;
            transform: rotate(30deg * (3 - 6)) translateY(-150%);
        }
        &:nth-child(4) {
            animation-delay: 0.25s;
            transform: rotate(30deg * (4 - 6)) translateY(-150%);
        }
        &:nth-child(5) {
            animation-delay: 0.333s;
            transform: rotate(30deg * (5 - 6)) translateY(-150%);
        }
        &:nth-child(6) {
            animation-delay: 0.416s;
            transform: rotate(30deg * (6 - 6)) translateY(-150%);
        }
        &:nth-child(7) {
            animation-delay: 0.5s;
            transform: rotate(30deg * (7 - 6)) translateY(-150%);
        }
        &:nth-child(8) {
            animation-delay: 0.583s;
            transform: rotate(30deg * (8 - 6)) translateY(-150%);
        }
        &:nth-child(9) {
            animation-delay: 0.666s;
            transform: rotate(30deg * (9 - 6)) translateY(-150%);
        }
        &:nth-child(10) {
            animation-delay: 0.75s;
            transform: rotate(30deg * (10 - 6)) translateY(-150%);
        }
        &:nth-child(11) {
            animation-delay: 0.916s;
            transform: rotate(30deg * (11 - 6)) translateY(-150%);
        }
        &:nth-child(12) {
            animation-delay: 1s;
            transform: rotate(30deg * (12 - 6)) translateY(-150%);
        }
      }
    }
  }
  @keyframes spinner-fade {
    0% {
      opacity: .85;
    }
    50% {
      opacity: .25;
    }
    100% {
      opacity: .25;
    }
  }
</style>
