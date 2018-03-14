import {apiPrefix, requestJSON} from "./index";

export  async  function queryProjects() {
  return  requestJSON(apiPrefix+'/projectized/list');
}

export async function saveProjectMember(id,members){
  return  requestJSON(apiPrefix+`/projectized/member/save/${id}`,{method:'POST',body:members});
}
export async function deleteProject(id){
    return  requestJSON(apiPrefix+`/projectized/project/delete/${id}`,{method:'POST'});
}
export async function saveProject(form){
  return  requestJSON(apiPrefix+`/projectized/project/save`,{method:'POST',body:form});
}