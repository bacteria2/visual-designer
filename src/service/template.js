import {requestJSON,apiPrefix} from './index'

export async function getTemplates(page){
    return requestJSON(apiPrefix+'/template/getAll',{method:'POST',body:page||{}})
}

export async function getTemplateByName(name){
    return requestJSON(apiPrefix+'/template/getTemplateByName',{method:'POST',body:name})
}

export async function saveTemplate(template){
    return requestJSON(apiPrefix+'/template/add',{method:'POST',body:template})
}

export async function updateTemplate(template){
    return requestJSON(apiPrefix+'/template/update',{method:'POST',body:template})
}


