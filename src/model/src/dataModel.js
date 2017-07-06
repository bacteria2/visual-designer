/**
 * Created by lenovo on 2017/7/5.
 */
export const dataModel = {
  //start
  dimensionItem({id="",label="",key="",required=false,type="",measured=true,dataItem=""} = {}){
    return {id,lable,key,required,type,measured,dataItem}
  },
  optionDataItem({key="",value=""}={}){
    return {key,value}
  }
//end
}
