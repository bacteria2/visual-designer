/**
 * Created by lenovo on 2017/9/11.
 */
import Vue from 'vue'

export default {
  componentUpdated(el,binding) {
    Vue.nextTick(function(){
      if(binding.value > 0){
        el.scrollTop = binding.value
      }
    })
  }
}
