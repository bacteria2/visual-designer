import EchartsCommon from '../../../../mixins/EchartsCommon'

export default{
  name: 'TextEcharts',
  mixins: [EchartsCommon],
  props: {
    textScript:{},
  },
  watch: {
    textScript(val){
      this.evalOption(val)
    }
  },
  async mounted(){
    await this.initEcharts();
     if(this.textScript){
       this.evalOption(this.textScript)
     }
  },
  methods: {
    evalOption(textScript){
      let obj=eval.bind(window)(textScript)
      this.instance.setOption(obj)
    },
  }
}
