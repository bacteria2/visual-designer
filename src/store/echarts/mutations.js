/**
 * Created by lenovo on 2017/5/18.
 */
import Vue from 'vue'


export default mutations={
  submitOptions(state,payload){
    Vue.set(state,"options",payload)
  }
}
