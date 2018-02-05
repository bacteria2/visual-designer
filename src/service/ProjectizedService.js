import {apiPrefix, requestJSON} from "./index";

export  async  function queryProjects(query) {
  return  requestJSON(apiPrefix+'/projectized/list',{method:'POST',body:query});
}

export async function saveProjectMember(id,members){
  return  requestJSON(apiPrefix+`/projectized/member/save/${id}`,{method:'POST',body:members});
}

export async function saveProject(form){
  return  requestJSON(apiPrefix+`/projectized/project/save`,{method:'POST',body:form});
}