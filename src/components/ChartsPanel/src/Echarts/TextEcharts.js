import EchartsCommon from '../../../../mixins/EchartsCommon'

export default{
  name: 'TextEcharts',
  mixins: [EchartsCommon],
  props: {
    textScript: String,
  },
  watch: {
    textScript(val){
      this.updateChart(this.evalOption(val))
    }
  },
  mounted(){
    this.updateChart(this.evalOption(this.textScript))
  },
  methods: {
    evalOption(textScript){
      if (textScript && typeof textScript === 'string') {
        eval.bind(window)(this.textScript)
        if (option && typeof option === 'object') {
          return option
        }
      /*  if (weidit && typeof weidit === 'object') {
          console.info(weidit)
          return weidit.option
        }*/
      }
      return {}
    }
  }
}
