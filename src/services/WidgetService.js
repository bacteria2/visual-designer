/**
 * Created by lenovo on 2017/5/9.
 */
import request from "@/utils/request"
import api from "./api";

export async function loadWidgetTypes(params){
  return request({
    url:  api.loadWidgetTypes,
    data: params,
  })
}

