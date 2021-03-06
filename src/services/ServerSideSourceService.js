/**
 * Created by lenovo on 2017/7/4.
 */
import request from "@/utils/request"
import api from "./api"


export  function previewData(params){
  return request({
    url:  api.previewData,
    method:"post",
    data: params,
  });
}

export function getColumn(params){
  return request({
    url:  api.loadColumns,
    data: params,
  })
}

export function beanList(){
  return request({
    url:  api.loadFunctionList,
  })
}
