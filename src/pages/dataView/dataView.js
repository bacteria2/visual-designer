/**
 * Created by lenovo on 2017/8/7.
 */
import{ RenderProxy } from '../../widgets/RenderProxy'
import{ getWidgetInstanceByID } from '@/services/WidgetInstanceService'
import {clone,parse} from '@/utils'

class DataView {
  constructor (el, {host, apiPrefix = '/ydp-visual-web/ydp/visual', timeout = 1000,interval}) {
    this.host = host
    this.apiPrefix = apiPrefix
    this.timeout = timeout
    this.el = el
    this.proxy = new RenderProxy()
    this.interval=interval
    this.option = null
    this.dataOption = null
    this.rawData = null
    if(this.interval && this.interval>3000){
      setInterval(_=>{
        if(this.option && this.dataOption){
          this.mergeAndRender()
        }
      },this.interval)
    }
    return this
  }

  async init(instanceId){
    if (instanceId) {
      let resp = await getWidgetInstanceByID({key: instanceId}, {
        baseURL: this.host?`${this.host}${this.apiPrefix}`:this.apiPrefix,
        timeout: this.timeout
      })
      if (resp.success&&resp.widgetsInstance) {
        let {fRender,fMergeOption,fDataOption,fDynamic,fOption,fSetting} = resp.widgetsInstance
        if(fDynamic == 1){
          let {rawData,disabled,extJs} = JSON.parse(fSetting)
          this.rawData = {rawData,disabled,extJs}
          this.option = parse(fOption)
        }else{
          let {extJs} = JSON.parse(fSetting)
          this.rawData = {extJs}
          this.option = parse(fMergeOption)
        }
        this.proxy.proxyModelRender(fRender, this.el)
        await this.proxy.init()
        this.dataOption = JSON.parse(fDataOption)
      }
    }else{
      throw new Error(`request widgetInstance error,
        baseURL:${this.host}:${this.apiPrefix},id:${instanceId},response:${JSON.stringify(resp)}`)
    }
  }

  async render(instanceId) {
   await this.init(instanceId)
           this.mergeAndRender()
  }

  mergeAndRender(){
      this.proxy.mergeAndRender(this.option,this.dataOption,{
        baseURL: this.host?`${this.host}${this.apiPrefix}`:this.apiPrefix,
        timeout: this.timeout
      },this.rawData)
  }

  /**
   *
   * @param params  过滤参数
   * @param oneTime true|false 是否影响一次
   */
 async filterAndRender(instanceId,SearchParams,oneTime=false){
    await this.init(instanceId)
    let paramValueChange = false;
    if(this.option && this.dataOption){
         let dataSet
         if(oneTime){
           dataSet = clone(this.dataOption.dataSet.filter(e=>e.type!==1))
         }else{
           dataSet = this.dataOption.dataSet.filter(e=>e.type!==1)
         }
         if(Array.isArray(dataSet) && dataSet.length > 0){
             let ds = dataSet[0],
                  di = ds.di,
              params = di.params;
           if(Array.isArray(params) && params.length>0){
             if(Array.isArray(SearchParams)){//传值对象数组
               params.forEach(e=>{
                  let index = e.index;
                 if(SearchParams[index - 1]){
                   e.value = SearchParams[index - 1];
                   paramValueChange = true;
                 }
               })
             }else{//传键值对
               let paramKey_part1 = di.className +"_" + di.funName;
               params.forEach(e=>{
                 let paramKey = paramKey_part1 +"_"+e.index;
                 if(SearchParams[paramKey]){
                   e.value = SearchParams[paramKey];
                   paramValueChange = true;
                 }
               })
             }
           }
         }
        if(paramValueChange){
           if(oneTime){
             let dOption = clone(this.dataOption);
             dataSet.forEach(ds=>{
               let id = ds.id;
               dOption.dataSet.forEach(ods=>{
                   if(ods.id == id){
                      ods.di = ds.di
                   }
               })
             })
             this.proxy.mergeAndRender(this.option,dOption,{
               baseURL: this.host?`${this.host}${this.apiPrefix}`:this.apiPrefix,
               timeout: this.timeout
             },this.rawData)
           }else{
             this.mergeAndRender()
           }
        }
    }
  }

}

window.DataView = DataView
