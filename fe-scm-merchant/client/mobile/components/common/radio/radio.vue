<template>
   <label class="mt-radio" @click="radioCheck">
     <span class="mt-radio__input">
         <span ref="radio" class="mt-radio-icon" :class="{'checked': checked, 'uncheck': !checked}"></span>
     </span>
     <span class="mt-radio__label">
         <slot></slot>
     </span>
   </label> 
</template>
<script>
import emitter from '../../../src/mixins/emitter'

export default {
  name: 'radio',
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {
      radio: '',
      name: 'radio',
      checked: false
    }
  },
  methods: {
    radioCheck () {
      this.unCkeckRadios()
      const _radio = this.$refs.radio
      if (_radio) {
        let classList = _radio.classList
        if (classList.contains('checked')) {
          _radio.classList.remove('checked')
          _radio.classList.add('uncheck')
        } else {
          _radio.classList.remove('uncheck')
          _radio.classList.add('checked')
          this.dispatch('radioGroup', 'handleRadioClick', this.label)
        }
      }
    },
    unCkeckRadios () {
      if (this.$parent.$refs.radioGroup) {
        const allRadio = this.$parent.$refs.radioGroup.querySelectorAll('.mt-radio-icon')
        for (let i = 0; i < allRadio.length; i++) {
          allRadio[i].classList.remove('checked')
          allRadio[i].classList.add('uncheck')
        }
      }
    },
    /**
     * 获取父组件的值
     */
    _getParentValue () {
      return this.$parent && this.$parent.value
    }
  },
  created () {
    this.checked = this.label === this._getParentValue()
  }
}
</script>
<style lang="less" scoped>
  .mt-radio {
    position: relative;
    overflow: hidden;
    display: inline-block;
    font-size: .32rem;
    vertical-align: middle;
    .mt-radio__input {
      position: relative;
      outline: none;
      vertical-align: middle;
      .mt-radio-ip {
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
      }
      .mt-radio-icon {
        width: .32rem;
        height: .32rem;
        display: inline-block;
        border-radius: 100%;
        vertical-align: middle;
      }
      .uncheck {
        border: .03rem solid #CCCCCC;
      }
      .checked {
        background: url(./assets/checked.png);
        background-size: .32rem .32rem;
      }
    }
    .mt-radio__label {
      font-family: PingFangSC-Regular;
      font-size: .32rem;
      color: #333333;
      letter-spacing: 0;
      line-height: 1;
      vertical-align: middle;
    }
  }
</style>


