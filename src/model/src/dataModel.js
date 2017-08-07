/**
 * Created by lenovo on 2017/7/5.
 */
 const dataModel = {
  //start
  dimensionItem({id="",label="",key="",required=false,type="",measured=true,dataItem=""} = {}){
    return {id,label,key,required,type,measured,dataItem}
  },
  optionDataItem({key="",value=""}={}){
    return {key,value}
  },
  widget({fCreator='',appCategory='',fCreateTime='',fID='',fDataOption='',fExtensionJs='',
           fDescription='',fModifier='',fModifierTime='',fOption='',fPluginName='',fIsShort='',
           fViewModel='',showSetting=''} = {}){
    return {fCreator,appCategory,fCreateTime,fID,fDataOption,fExtensionJs,fDescription,fModifier,
      fModifierTime,fOption,fPluginName,fIsShort,fViewModel,showSetting}
  },
  widgetInstance({fID='',fName='',fWidgetsID='',fOption='',fDataOption='', fSetting='',fThemeInstanceID='',fDashboardID='',fViewModel='',fIsShort="",fMergeOption=""}={}){
    return {fID,fName,fWidgetsID,fOption,fDataOption,fSetting,fThemeInstanceID,fDashboardID,fViewModel,fIsShort,fMergeOption}
  },
  widgetInstanceSetting({show="",rawData="",series="",disabled="",seriesDisabled="",extJs=""}={}){
     return {show,rawData,series,disabled,seriesDisabled,extJs}
  }
//end
}

export default dataModel
