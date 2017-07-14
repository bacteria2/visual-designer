import ChartContainer from './ChartContainer'
import {saveDashboard} from '@/services/dashBoardService'
import {clone,message} from '@/utils'
export default class DashBord{
  constructor(){
    this.id = undefined;
    this.containers = {};
    this.extendWidgets = {};  //扩展部件：img、text
    this.layouts =[];
    this.style =  {
      scale: 0.7,
      height: 1080,
      width: 1920,
      borderRadius: 0,
      backgroundColor: null,
      backgroundRepeat:'no-repeat',
      borderColor: null,
      borderWidth: null,
      borderStyle: null,
      imgUrl: null,
    };
  }
  /**
   * Dashboard负责提供Container
   * @param id
   * @returns {*}
   */

  getContainer(id) {
    if (id) {
      let container = this.containers[id];
      if (!container) { //不存在对象则创建新对象
        container = new ChartContainer(id);
        this.containers[id] = container;
      }
      return container
    }
  }
  getExtendWidget(id) {
    if (id) {
      return this.extendWidgets[id];
    }
  }
  /**
   * 持久化dashboard数据
   */
  save(){
    let self = this;
    let thisClone = clone(this);
    // delete thisClone.alert;
    if(thisClone.containers){
      for(let key of Object.keys(thisClone.containers)){
        delete thisClone.containers[key].chart;
        delete thisClone.containers[key].option;
        delete thisClone.containers[key].dataOption;
        delete thisClone.containers[key].chartSetting;
      }
    }
    let dataStr = JSON.stringify(thisClone);
    let data = {id:self.id,dashJson:dataStr};
    //访问接口保存数据
    saveDashboard(data).then(function (data) {
      if(data.success){
        message.success("保存成功！");
        /*self.alert = true;
        setTimeout(function(){self.alert = false;},1000);*/
      }
    });
  }
  // 15203881300
/*
  get layouts(){
    return this._layouts;
  }
  set layouts(layouts){
    this._layouts = layouts;
  }

  get containers(){
    return this._containers;
  }
  set containers(containers){
    this._containers = containers;
  }*/
};
