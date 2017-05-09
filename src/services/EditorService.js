/**
 * Created by lenovo on 2017/5/9.
 */
import request from "@/utils/request"
import api from "./api";

export async function loadTextScript(params){
  return request({
    url:  api.loadTextScript,
    data: params,
  })
}
