import {requestJSON,apiPrefix} from './index'

export async function getElements(){
    return requestJSON(apiPrefix+'/element/getAll')
}

export async function getElementsById(id){
    return requestJSON(apiPrefix+'/element/getElement',{method:'POST',body:id})
}

export async function saveElement(element){
    return requestJSON(apiPrefix+'/element/getElement',{method:'POST',body:element})
}


