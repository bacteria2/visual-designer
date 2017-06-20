import EchartsCommon from '../../../../mixins/EchartsCommon'
import store from '@/store'

export default{
  name: 'EchartsPanel',
  mixins: [EchartsCommon],
  store,
  mounted(){
    //如果成功初始化,注册echarts
    if (this.instance) {
      this.$store.commit('registryInstance', this)
      this.updateChart(this.$store.state.echarts.option)
    }
  },
}
