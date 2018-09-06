/**
 *  @暴露所有组件
 *  -----------------
 *  Author : wukong
 */
import alert from './alert'
import mtDialog from './dialog'
import drawer from './drawer'
import upload from './upload'
import toast from './toast'
import tabBar from './tab-bar'
import loading from './loading'
import scrollToBottom from './scrollToBottom'
import { tabPanel, tabPanelItem } from './tab-panel'
import processBar from './processBar'
import mtButton from './button'
import mtInput from './input'
import { itemLabel, itemLabelSelect } from './item-label'
import { radio as mtRadio, radioGroup as mtRadioGroup } from './radio'
import backBar from './backBar'
import itemBar from './itemBar'
import datePicker from './date-picker'

export default {
  alert,
  mtDialog,
  drawer,
  upload,
  tabBar,
  tabPanel,
  tabPanelItem,
  loading,
  scrollToBottom,
  mtButton,
  mtRadio,
  mtRadioGroup,
  mtInput,
  itemLabel,
  itemLabelSelect,
  datePicker,
  prototypeRegister: {
    alert,
    toast,
    loading,
    processBar
  },
  backBar,
  itemBar
}
