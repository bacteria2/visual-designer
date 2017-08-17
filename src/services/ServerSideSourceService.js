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
    method:"post",
    data: params,
  })
}

export function beanList(){
  return request({
    url:  api.loadFunctionList,
  })
}

export function dyBeanList(){
  return request({
    url:  api.loadDyFunctionList,
  })
}

export function beanListAll(){
  return request({
    url:  api.loadFunctionListAll,
  })
}

export function setStatus(params){
  return request({
    url:  api.setStatus,
    data: params,
    method:'post'
  })
}
