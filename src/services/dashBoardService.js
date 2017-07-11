/**
 * Created by lenovo on 2017/6/20.
 */
import request from "@/utils/request"
import api from "./api"


export function saveDashboard(params){
    return request({
      url:  api.saveDashBoard,
      data: params,
    })
  }
export function readDashboard(params){
    return request({
      url:  api.readDashBoard,
      data: params,
    })
  }
