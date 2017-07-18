/**
 * Created by lenovo on 2017/6/20.
 */
import request from "@/utils/request"
import api from "./api"

/**
 * 保存Dashboard数据
 * @param params： {id:xxx,dashJson:xxx}
 */
export function saveDashboard(params){
  return request({
    url:  api.saveDashBoard,
    data: params,
    method:'post'
  })
}

/**
 * 读取Dashboard数据
 * @param params：{id:xxxx}
 */
export function readDashboard(params){
  return request({
    url:  api.readDashBoard,
    data: params
  })
}

/**
 * 读取组件实例数据
 * @param params:{key:xxxx}
 */
export function getWidgetInstanceByID(params){
  return request({
    url:  api.getWidgetInstanceByID,
    data: params,
  })
}

export function loadDashboardList(params){
  return request({
    url:  api.loadDashboardList,
    method:'post',
    data: params
  })
}

export function addDashboard(params){
  return request({
    url:  api.addDashboard,
    method:'post',
    data: params
  })
}

export function editDashboard(params){
  return request({
    url:  api.editDashboard,
    method:'post',
    data: params
  })
}

export function getDashboardByID(params){
  return request({
    url:  api.getDashboardByID,
    data: params,
  })
}

export function removeDashboards(params){
  return request({
    url:  api.removeDashboards,
    method:'post',
    data: params
  })
}
