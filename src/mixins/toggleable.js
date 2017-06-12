/**
 * Created by lenovo on 2017/6/9.
 */
export default {
  data () {
    return {
      isActive: !!this.value
    }
  },

  props: {
    value: {
      required: false
    }
  },

  watch: {
    value (val) {
      this.isActive = !!val
    },
    isActive (val) {
      this.$emit('input', val)
    }
  }
}
