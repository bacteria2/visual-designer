import { requestJSON, apiPrefix } from './index'

export function requestPropertyPagesByName (name = '',index="0") {
  return requestJSON(apiPrefix + `/widget/propertyPages/${name}/${index}`)
}

export function requestWidgetById (id = '') {
  return requestJSON(apiPrefix + `/widget/instance/${id}`)
}
export async function requestWidgetList(skip,limit) {
  return requestJSON(apiPrefix + `/widget/list`)
}
export function requestWidgetMeta (protoTypeId = '') {
  return requestJSON(apiPrefix + `/prototype/meta/${protoTypeId}`)
}

export async function deployWidget(id){

}