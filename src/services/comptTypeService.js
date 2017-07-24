/**
 * Created by lenovo on 2017/6/20.
 */
import request from "@/utils/request"
import api from "./api"

export function getComptTypeByID(params){
  return request({
    url:  api.getComptTypeByID,
    data: params,
  })
}

export function loadComptTypeList(params){
  return request({
    url:  api.loadComptTypeList,
    method:'post',
    data: params
  })
}

export function addComptType(params){
  return request({
    url:  api.addComptType,
    method:'post',
    data: params
  })
}

export function editComptType(params){
  return request({
    url:  api.editComptType,
    method:'post',
    data: params
  })
}

export function removeComptTypes(params){
  return request({
    url:  api.removeComptTypes,
    method:'post',
    data: params
  })
}
