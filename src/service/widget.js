import { requestJSON, apiPrefix } from './index'

export function requestPropertyPagesByName (name = '') {
  return requestJSON(apiPrefix + `/widget/propertyPages/${name}`)
}

export function requestWidgetById (id = '') {
  return requestJSON(apiPrefix + `/widget/${id}`)
}

export function requestWidgetMeta (protoTypeId = '') {
  return requestJSON(apiPrefix + `/prototype/meta/${protoTypeId}`)
}


export async function deleteWidget (id) {

}


export async function deployWidget(id){

}