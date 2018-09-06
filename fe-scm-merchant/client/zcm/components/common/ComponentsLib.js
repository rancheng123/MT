/**
 * 引入所有公共组件库
 */
import ProviceSelect from './ProviceSelect.vue'
import CitySelect from './CitySelect.vue'
import RegionSelect from './RegionSelect.vue'
import Form from './Form.vue'
import DivCard from './DivContainer.vue'
import DataTable from './DataTable.vue'
import SearchBtn from './SearchBtn.vue'
import CommonInput from './CommonInput.vue'
import CommonSelect from './CommonSelect.vue'
import ApplyTypeSelect from './ApplyTypeSelect.vue'
import ProcessSelect from './ProcessSelect.vue'
import ExpressSelect from './ExpressSelect.vue'
import TimeRangeSelect from './TimeRangeSelect.vue'
import Fieldset from './Fieldset.vue'

module.exports = {
  /**
   * 对外暴露组件，名称id必须唯一
   */
  'mt-province-select': ProviceSelect,
  'mt-region-select': RegionSelect,
  'mt-form': Form,
  'mt-fieldset': Fieldset,
  'mt-div-card': DivCard,
  'mt-city-select': CitySelect,
  'mt-data-table': DataTable,
  'mt-btn-search': SearchBtn,
  'mt-input-common': CommonInput,
  'mt-select-common': CommonSelect,
  'mt-apply-type-common': ApplyTypeSelect,
  'mt-process-select': ProcessSelect,
  'mt-express-select': ExpressSelect,
  'mt-time-range-select': TimeRangeSelect
}
