import ChartContainer from './ChartContainer'
import ExtendContainer from './ExtendContainer'
import {saveDashboard} from '@/services/dashBoardService'
import {clone,message} from '@/utils'
export default class DashBord{
  constructor(){
    this.id = undefined;
    this.containers = {};
    this.extendContainers = {};  //扩展部件：img、text
    this.layouts =[];
    this.style =  {
      scale: 0.7,
      height: 1080,
      width: 1920,
      borderRadius: 0,
      backgroundColor: null,
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center',
      borderColor: null,
      borderWidth: null,
      borderStyle: null,
      backgroundImage:null
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

  /**
   * 获取扩展插件，如果未产生则创建
   * @param id
   * @returns {*}
   */
  getExtendWidget(id) {
    if (id) {
      let extendContainer = this.extendContainers[id];
      if (!extendContainer) { //不存在对象则创建新对象
        extendContainer = new ExtendContainer(id);
        this.extendContainers[id] = extendContainer;
      }
      return extendContainer
    }
  }
  /**
   * 持久化dashboard数据
   */
  save(){
    let self = this;
    let thisClone = clone(this);
    //删除active
    thisClone.layouts.map(el => el.active = false);
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
      }
    });
  }

};
