import ChartContainer from './ChartContainer'
import {saveDashboard} from '@/services/dashBoardService'
import {clone} from '@/utils'

export default class DashBord{
  constructor(){
    this.id = undefined;
    this.containers = {};
    this.layouts =[];
    this.style = {};
    this.alert = false;  //显示弹窗
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
        container = new ChartContainer({ id: id });
        this.containers[id] = container;
      }
      return container
    }
  }
  /**
   * 持久化dashboard数据
   */
  save(){
    let self = this;
    let thisClone = clone(this);
    delete thisClone.alert;
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
        self.alert = true;
        setTimeout(function(){self.alert = false;},1000);
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
