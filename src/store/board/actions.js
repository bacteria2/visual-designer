import { debounceExec, mergeWith,forOwn } from '@/utils'
import debounce from 'lodash/debounce'
import dropRight from 'lodash/dropRight'
export default{
  get: debounce(({state}) => {
    return state.editExtendObj;
  }, 100, {leading: true}),
}
