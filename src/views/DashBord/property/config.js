import { merge } from '@/utils'

export const edits = {
  PropertyCommon(){
    return [
      {title:'页面',active:'PageProperty',name:'PageProperty',component:'pagePropertyEdit'},
      {title:'布局',active:'LayoutProperty',name:'LayoutProperty',component:'pagePropertyEdit'},
      {title:'组件',active:'ComponentProperty',name:'ComponentProperty',component:'pagePropertyEdit'}
    ];
  }
}



