/**
 * Created by lenovo on 2017/5/18.
 */
import {debounceExec} from "@/utils"


export default{
  saveToServer({commit},payload){
    debounceExec(commit("submitOptions",payload),500)
  },
  renderCharts({commit,getters,state}){
    let option=getters.getOptionsFromRaw
    commit('updateOption',option)
  }


}
