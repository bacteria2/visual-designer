import EchartsCommon from '../../../../mixins/EchartsCommon'

export default{
  name: 'TextEcharts',
  mixins: [EchartsCommon],
  props: {
    textScript:{},
  },
  watch: {
    textScript(val){
      this.updateChart(val)
    }
  },
  mounted(){
    /*this.updateChart(this.evalOption(this.textScript))*/
    //this.updateChart(this.textScript)
  },
  methods: {
    evalOption(textScript){
      /*if (textScript && typeof textScript === 'string') {

        eval.bind(window)(this.textScript)
        if (option && typeof option === 'object') {
          return option
        }
      /!*  if (weidit && typeof weidit === 'object') {
          console.info(weidit)
          return weidit.option
        }*!/
      }
      console.log(textScript)*/
      return textScript
    }
  }
}
