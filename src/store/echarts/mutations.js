import Vue from 'vue'
import { mergeWith,get,forOwn,uniqBy,remove,clone,uuid,checkedControlItem,set,omit,parse} from '../../utils'


export default {
  chartConfigUpdate(state, payload){
    state.config = Object.assign({}, state.config, payload)
  },
  //新增rawData
  addRawData(state, {node, value}){
    console.info('addRawData',node,value);
    if (node && typeof node === `string`)
      Vue.set(state.rawData, node, value)
  },
  //更新rawData
  updateRawData(state, {key, value}){
    if (state.rawData.hasOwnProperty(key)) {
      state.rawData[key] = value
    }else {
      Vue.set(state.rawData, key, value)
    }
  },
  //注册charts组件
  registryInstance(state, instance){
    if (instance) {
      state.chartComponent = instance
    }
  },
  //更新option
  updateMergedOption(state, payload){
    if (payload && typeof payload === 'object'){
      Vue.set(state,'mergedOption',payload)
    }

  },
  /*更新disabled*/
  updateDisabled(state, {key,disabled}){
    //不存在属性则添加
    if(!state.disabled.hasOwnProperty(key)){
      Vue.set(state.disabled,key,disabled)
    }else{
      state.disabled[key]=disabled
    }
    if(disabled){
      let originVal = get(state.option,key)
      //存在原生数据
        if(originVal !== undefined){
          set(state.mergedOption,key,originVal)
        }else{
          //如果是undefined删了它
          state.mergedOption = omit(state.mergedOption,[key])
        }

    }
  },
   //更新SeriesData
  updateSeriesData(state,{key,value,seriesIndex}){
   /* console.info(key,value,seriesIndex)*/
    if (!state.series[seriesIndex].hasOwnProperty(key)) {
      Vue.set(state.series[seriesIndex],key,value)
    }else{
      state.series[seriesIndex][key] = value
    }
  },
  //增加序列
  addSerial(state,{type}){
    //Vue.set(state,'seriesItemHandlerState',true) //标记个状态
    //搞series
    let disabledSetting = {},
    seriesIndex = state.series.length,
    tempSerie = {type,name:`序列-${seriesIndex+1}`}
    //先从series找，是否存在类型一样的序列，直接复制一份
    let exsitSeries = {}
      state.series.forEach((s,index)=>{
      if(!exsitSeries.index && s.type == type){
        exsitSeries.index = index;
        exsitSeries.series = s;
      }
    });

    console.log(exsitSeries)

    if(Object.keys(exsitSeries).length>0){
       tempSerie = clone(exsitSeries.series)
       tempSerie.name = `序列-${seriesIndex+1}`
       disabledSetting = clone(state.seriesDisabled[exsitSeries.index])
      console.log('tempSerie',tempSerie,disabledSetting)
    }else{
      forOwn(state.show.series[type], function (v, k) {
        Vue.set(tempSerie,k,null)
        Vue.set(disabledSetting,k,true)
        //tempSerie[k] = undefined;
      });
    }

    state.series.push(tempSerie);
    state.mergedOption.series.push(tempSerie)
    state.seriesDisabled.push(disabledSetting);
    //搞demension
    /*//检测是否有原生序列定义被禁用，如果有进行还原,否则克隆一个出来
    let hasOriginSeriesItems = false

    state.demension.forEach(item =>{
        if(item.disabled && item.originIndex && item.originIndex == seriesIndex){
          item.disabled = false;
          hasOriginSeriesItems = true;
        }
    });

    if(!hasOriginSeriesItems){*/
      //根据key去重
      let demensionItems =clone(uniqBy(state.demension.filter((item) => {
          return item.type == type;
        }), function (n) { //用于去重
          let kValue = n.key
          if(kValue.startsWith('series')){
            return n.key.substr(kValue.indexOf('.'))
          }else{
            return kValue
          }
        })) ,
        curSeriesIndex = state.series.length - 1;
      demensionItems.forEach((item) => {
        item.index = curSeriesIndex;
        item.id    = uuid();
        item.label = `序列${curSeriesIndex+1}`
        let dataKey = item.key.substr(item.key.indexOf('.'))
        item.key   = `series[${curSeriesIndex}]${dataKey}`
        item.dataItem = null;
        if(item.originIndex !== undefined){
          item.originIndex = undefined
          item.disabled = undefined
          state.demension.push(JSON.parse(JSON.stringify(item)))
        }else{
          state.demension.push(item);
        }
      })
    //}
    //Vue.set(state,'seriesItemHandlerState',false) //标记个状态
  }
  ,
  //删除序列
  delSerial(state,{realIndex}){
    //Vue.set(state,'seriesItemHandlerState',true) //标记个状态
    let seriesLen = state.series.length
    //删series
    state.series.splice(realIndex,1);
    //删禁用设定
    state.seriesDisabled.splice(realIndex,1);
    //删demension
    let removeDim = remove(state.demension,(item)=>{
      return item.index == realIndex;
    });
    if(!removeDim || removeDim.length == 0){
      //没有找到，检测是否来源原生设置
      state.demension.forEach((item) => {
        if(item.originIndex == realIndex){
          //增加disabled属性
          set(item,'disabled',true);
          item.dataItem = null;
        }
      })
    }
    //删mergedOption中的series
    state.mergedOption.series.splice(realIndex,1)
    //重排 dimension
    if(seriesLen != realIndex) {//如果不是从最后一位删
      state.demension.filter((item) => {
        return ((item.index && item.index > realIndex) || (!item.disabled && item.originIndex && item.originIndex > realIndex))
      }).forEach((item)=>{
        let index;
        if(item.index) {
          index = item.index - 1;
          item.index = index;
        }
        if(item.originIndex){
          index = item.originIndex - 1;
          item.originIndex = index;
        }
        let dataKey = item.key.substr(item.key.indexOf('.'))
        item.key = `series[${index}]${dataKey}`
      })
    }
    state.demension = clone(state.demension);
    //Vue.set(state,'seriesItemHandlerState',false) //标记个状态
  },
  //修改维度
  updateDemension({demension,series},{key,value}){
   /* demension[key] = value*/
   let dim = demension.filter((item)=>{return item.id == key})[0];
       dim.dataItem = value
       if(series[dim.index] && series[dim.index]['name'] && value !== null){
         series[dim.index]['name'] = value.alias
       }
  },

  deleteDemension({demension},key){
    demension.filter((item)=>{return item.id == key})[0].dataItem = '';
  },

  addDemensionIds({demension}){
    demension.forEach((item)=>{
        if(!item.id || item.id.trim() == ""){
          item.id = uuid();
        }
    })
  },

  setPropertyCheckedControl(state,{type}){
    state.propertyCheckedControl = checkedControlItem[type];
  },

  updateShowSetting({showSetting},{key,show,componentType}){
    if(!show){show = undefined} //如果是false，设置成undefined
    if(componentType && componentType.startsWith('series')){//如果是序列
      let seriesType = componentType.slice(-(componentType.length-7));
      if(!showSetting.series[seriesType].hasOwnProperty(key)){
          Vue.set(showSetting.series[seriesType],key,show)
        }else{
          showSetting.series[seriesType][key] = show
      }
    }else{//不是序列
      if(!showSetting.hasOwnProperty(key)){
        Vue.set(showSetting,key,show)
      }else{
        showSetting[key]=show
      }
    }
  },

  updateShowSettingBatch({showSetting},{showConfigObj,seriesType}){
    let {isShowAll,keys} = showConfigObj;
    if(!isShowAll){isShowAll = undefined}
    if(seriesType){//如果是序列
      keys.forEach((item)=>{
        if(!showSetting.series[seriesType].hasOwnProperty(item)){
          Vue.set(showSetting.series[seriesType],item,isShowAll)
        }else{
          showSetting.series[seriesType][item]=isShowAll
        }
      })
    }else{//其他
      keys.forEach((item)=>{
        if(!showSetting.hasOwnProperty(item)){
          Vue.set(showSetting,item,isShowAll)
        }else{
          showSetting[item]=isShowAll
        }
      })
    }
  },

  initShowSetting({showSetting},{seriesTypes}){
    seriesTypes.forEach((type)=>{
      ///2
      if(!showSetting.series.hasOwnProperty(type)){//判断一下有没有该类型的定义,没有就设一个
        Vue.set(showSetting.series,type,{})
      }
    })
  },
  //从数据库中还原
  loadShowSetting(state,{sSetting}){
    Vue.set(state,'showSetting',JSON.parse(sSetting))
  },

  saveDataSet(state,dataSet){
    state.dataSet=clone(dataSet);
  },
  /**
   * 保存sourceData,
   * payload:
   *   sourceData；
   *   merged=false;
   * */
  saveSourceData(state,{sourceData,merged=false}){
    if(merged){
      state.sourceData= mergeWith(sourceData,state.sourceData)
    }
    state.sourceData=sourceData;
  },
  /**
   * 清除sourceData
   * */
  clearSourceData(state){
    state.sourceData={};
  },
  /**
   * widgetInstance 创建前初始化State数据
   * @param state
   * @param widgetInstance
   * 写成屎，有空重写
   */
  initEchartState(state,{widgetInstance}){
    let optionStr = widgetInstance.fOption,
        dataOptionStr = widgetInstance.fDataOption,
        settingStr = widgetInstance.fSetting,
        mergedOptionStr = widgetInstance.fMergeOption,
        isDynamic = widgetInstance.fDynamic;
    let optionObj = parse(optionStr),
        settingObj = JSON.parse(settingStr),
        mergedOptionObj = parse(mergedOptionStr);
          let dataOptionObj = JSON.parse(dataOptionStr),
             {dataSet,dimension} = dataOptionObj;
          if(dataSet){
            Vue.set(state,'dataSet',dataSet)
          }
         if(!isDynamic){//不是动态序列
           if(dimension){
             Vue.set(state,'demension',dimension)
           }
         }
        if(optionObj){
          Vue.set(state,'option',optionObj)
        }
        if(mergedOptionObj){
          Vue.set(state,'mergedOption',mergedOptionObj)
        }
        let {rawData,show,series,disabled,seriesDisabled,extJs} = settingObj
        if(rawData){
          Vue.set(state,'rawData',rawData)
        }
        if(show){
          Vue.set(state,'show',show)
        }
        if(disabled){
          Vue.set(state,'disabled',disabled)
        }
    if(!isDynamic) {//不是动态序列
        if (series) {
          Vue.set(state, 'series', series)
        }
        if (seriesDisabled) {
          Vue.set(state, 'seriesDisabled', seriesDisabled)
        }
        if (extJs) {
          Vue.set(state, 'extJs', extJs)
        }
    }
  },
  /*更新disabled*/
  updateSeriesDisabled(state, {index,key,disabled}){
    Vue.set(state.seriesDisabled[index], key, disabled)
    if(disabled){
      let path = `series[${index}].${key}`,
        originVal  = get(state.option,path)
      if(originVal !== undefined){
        set(state.mergedOption,path,originVal)
      }else{
        //如果是undefined删了它
        if(path.endsWith("]")){
           path = path.substring(0,path.lastIndexOf("["))
        }
        console.log('path',path)
        state.mergedOption = omit(state.mergedOption,[path])
      }
    }
  },
  /**
   * 清除clearDashbord
   * */
  clearDashbord(state){
    state.dashBord.layout =[];
  },
  /**
   * 向Dashbord中新增一个布局
   * */
  addDashbordLayout(state,layout){
    state.dashBord.layouts.push(layout);
  },
  /**
   * 更新Dashbord中容器的值
   * */
  updateCharContainer(state,{key,value,id}){
    if(key&&id){
      let layout = state.dashBord.layouts.filter((layout)=>layout.id==id);
      if(layout){
        layout.contain[key] = value;
      }
    }
  },

  /**
   * 为序列设置名字
   */
  initSeriesName(state){
    let baseSeries = state.option.series,
         baseSeriesName = !baseSeries ? undefined:baseSeries.map(({name})=>{
              return name
         })
    state.series.forEach((s,index)=>{
           if(!s.hasOwnProperty('name')){
               let v = baseSeriesName?baseSeriesName[index]:`序列-${index}`
                Vue.set(s,'name',v)
           }
    })
  },

  /**
   * 初始化dataSet，用于原生组件设计器
   */
  initDataSet(state,{dataSet}){
     Vue.set(state,'dataSet',dataSet)
  },
  /**
   * 实例设计器退出时清理State的数据
   */
  clearEchartState(state){
        ['option','mergedOption','rawData','show','disabled'].forEach(key=>{
          Vue.set(state,key,{})
        });
        ['dataSet','demension','series','seriesDisabled'].forEach(key=>{
          Vue.set(state,key,[])
        });
          Vue.set(state,'extJs','');
  },
  /**
   * 清空showSetting的配置
   */
  clearShowSetting(state){
    Vue.set(state,'showSetting',{series:{}});
  },
  /**
   * 批量更新序列可用性
   * @param state
   * @param index
   * @param keys
   * @param disabled
   */
  updateSeriesDisabledBatch(state, {seriesIndex,keys,disabled}){
    keys.forEach(k=>{
      Vue.set(state.seriesDisabled[seriesIndex], k, disabled)
    })
  },

  //更新option
  setMergedOptionValueByPath(state, {path,value}){
    set(state.mergedOption,path,value)
    console.log(1,state.mergedOption)
  },
}
