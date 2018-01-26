import {requestJSON,apiPrefix} from './index'

export async function getPrototypes(page){
    return requestJSON(apiPrefix+'/prototype/getAll',{method:'POST',body:page||{}})
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