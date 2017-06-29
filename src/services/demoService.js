/**
 * Created by lenovo on 2017/6/20.
 */
import request from "@/utils/request"
import api from "./api"

const deData = {
  dsList:[
    { name: '模拟数据接口1', class:'com.ys.bean.Demo',des:'模式数据接口'},
    { name: '模拟数据接口2', class:'com.ys.bean.Demo',des:'模式数据接口'},
    { name: '模拟数据接口3', class:'com.ys.bean.Demo',des:'模式数据接口'},
    { name: '模拟数据接口4', class:'com.ys.bean.Demo',des:'模式数据接口'}
  ]
}

export default  function(params){
  return request({
    url:  api.loadDsInfo,
    data: params,
  })
}
