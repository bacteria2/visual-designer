import { debounceExec, mergeWith,forOwn } from '@/utils'
import debounce from 'lodash/debounce'
import dropRight from 'lodash/dropRight'
export default{
  getEditExtendObj: debounce(({state}) => {
    return state.editExtendObj;
  }, 100, {leading: true}),

  getWidgetData:debounce(({state},param) => {
    return state.editExtendObj;
  }, 1000, {leading: true}),
}
