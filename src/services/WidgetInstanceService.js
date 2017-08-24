/**
 * Created by lenovo on 2017/5/9.
 */
import request from "@/utils/request"
import api from "./api";

//根据分类获取组件
export async function loadWidgetInstancesByType(Type){
  return request({
    url:api.loadWidgetInstancesByType,
    method:'post',
    data:Type
  })
}

//新增保存组件
export async function addWidgetInstance(params) {
  return request({
    url:api.addWidgetInstance,
    method:'post',
    data:params
  })
}

//修改保存组件
export async function saveWidgetInstance(params) {
  return request({
    url:api.saveWidgetInstance,
    method:'post',
    data:params
  })
}

//根据ID一个组件
export async function getWidgetInstanceByID(params,option={}) {
  return request({
    url:api.getWidgetInstanceByID,
    data:params,
    option
  })
}

//
export function getWidget(params,option={}) {
  return request({
    url:api.getWidgetInstanceByID,
    data:params,
    option
  })
}
//删除组件
export async function removeWidgetInstances(params){
  return request({
    url:api.removeWidgetInstances,
    method:'post',
    data:params
  })
}

export async function loadRemoteData(params,option={}) {
  return request({
    url:api.loadRemoteData,
    method:'post',
    data:params,
    option
  })
}

