/**
 * Created by lenovo on 2017/5/18.
 */
import debounceExec from "@/utils"


export default actions={
  submit({commit},payload){
    debounceExec(commit("submitOptions",payload),500)
  }
}
