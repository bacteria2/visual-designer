/**
 * Created by lenovo on 2017/5/9.
 */
import request from "@/utils/request"
import api from "./api";

//获取分类
export async function loadWidgetTypes(params){
  return request({
    url:  api.loadWidgetTypes,
    data: params,
  })
}

//根据分类获取组件
export async function loadWidgetsByType(Type){
  return request({
    url:api.loadWidgetsByType,
    method:'post',
    data:Type
  })
}

//新增保存组件
export async function addWidget(params) {
  return request({
    url:api.addWidget,
    method:'post',
    data:params
  })
}

//修改保存组件
export async function saveWidget(params) {
  return request({
    url:api.saveWidget,
    method:'post',
    data:params
  })
}

//根据ID一个组件
export async function getWidgetByID(params) {
  return request({
    url:api.getWidgetByID,
    data:params
  })
}

//删除组件
export async function removeWidgets(params){
  return request({
    url:api.removeWidgets,
    method:'post',
    data:params
  })
}

