/**
 * Created by lenovo on 2017/6/26.
 */
export default {
  props: {
    sourceInfo: {
      type: Object,
      default: _ => ({name: '', type: 1, description: '', columns: [], data: [['']], dataItems: []})
    },
  },
  data(){
    return {
      showSourceInfo: true,
      stepper: 1,
    }
  },
  methods: {
    close(){
      this.showSourceInfo = false
      this.stepper = 1;
    },
  }
}
