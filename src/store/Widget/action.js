export const  SubmitProperty=Symbol('WIDGET_SUBMIT');
export const  DisableProperty=Symbol('WIDGET_DISABLE');
export const  SaveRawOption=Symbol('WIDGET_SAVE_RAW_OPTION');
export const  ChangLoading=Symbol('WIDGET_CHANGELODING');



export function submitProperty(key,value){
  return {
    type:SubmitProperty,
    payload:{
      key,value
    }
  }
}

export function disableProperty(key,value){
  return {
    type:DisableProperty,
    payload:{
      key,value
    }
  }
}

export function fetchRawOption(){

}

export function saveRawOption(){
  
}

