import { requestJSON, apiPrefix } from './index'

export function requestPropertyPagesByName (name = '',index="0") {
  return requestJSON(apiPrefix + `/widget/propertyPages/${name}/${index}`)
}

export function requestWidgetById (id = '') {
  return requestJSON(apiPrefix + `/widget/instance/${id}`)
}
export async function requestWidgetList(queryObject) {
  const queryString=new URLSearchParams(queryObject);
  return requestJSON(apiPrefix + `/widget/list?${queryString}`)
}

export async function requestAllWidgets(queryObject) {
  const queryString=new URLSearchParams(queryObject), url = queryString?`/widget/getAll?${queryString}`:'/widget/getAll'
  return requestJSON(apiPrefix + url)
}

export function requestWidgetMeta (protoTypeId = '') {
  return requestJSON(apiPrefix + `/prototype/meta/${protoTypeId}`)
}

export function saveWidget(widgetId,widget){
    return requestJSON(apiPrefix+'/widget/save',{method:'POST',body:{widgetId,widget}})
}

export function addWidget(widget){
    return requestJSON(apiPrefix+'/widget/add',{method:'POST',body:{widget}})
}

export function deployWidget(data){
    if(data.dbOption.database){
        return requestJSON(apiPrefix+'/widget/deploy/mysql' ,{method:'POST',body:{...data}})
    }else{
        return requestJSON(apiPrefix+'/widget/deploy/oracle',{method:'POST',body:{...data}})
    }
}

export function copyWidget(widgetId,newName){
    return requestJSON(apiPrefix+'/widget/copyWidget/' + widgetId + '/' + newName)
}

export function deleteWidget(widgetId){
    return requestJSON(apiPrefix+'/widget/delete/' + widgetId )
}

/*应用分类*/
export function appTypeData(){
    const data = [];
    for (let i = 1; i <= 10; i++) {
        data.push({
            key: i,
            name: `John Brown${i}`,
            notes: `${i}2`,
            childrens:[
                {key: i+'c',
                    name: 'John Brown',
                    notes: `${i}2`,
                },
                {key: i+'c2',
                    name: 'John Brown',
                    notes: `${i}2`,
                },
                {key: i+'c3',
                    name: 'John Brown',
                    notes: `${i}2`,
                },
                {key: i+'c4',
                    name: 'John Brown',
                    notes: `${i}2`,
                },
            ],
        });
    }

    return data;
}