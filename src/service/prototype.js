import {requestJSON,apiPrefix} from './index'

export async function getPrototypes(queryObject){
    const queryString=new URLSearchParams(queryObject);
    return requestJSON(apiPrefix+`/prototype/getAll?${queryString}`)
}

export async function getPrototypeById(id){
    return requestJSON(apiPrefix+'/prototype/getPrototypeById',{method:'POST',body:id})
}

export async function addPrototype(prototype){
    return requestJSON(apiPrefix+'/prototype/add',{method:'POST',body:prototype})
}

export async function updatePrototype(prototype){
    return requestJSON(apiPrefix+'/prototype/update',{method:'POST',body:prototype})
}