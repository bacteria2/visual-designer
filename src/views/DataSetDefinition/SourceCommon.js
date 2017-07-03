/**
 * Created by lenovo on 2017/6/26.
 */
export default {
  props: {
    sourceInfo: {
      type: Object,
      default: _ => ({name: '',type:1, description: '', columns: [], data: [['']],dataItems:[]})
    },
  },
  computed: {
    tableColumns(){
      return this.sourceInfo.columns.map(el => el.name)
    },
  }
}
