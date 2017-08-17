import ChartContainer from './ChartContainer'
import ExtendContainer from './ExtendContainer'
import {saveDashboard} from '@/services/dashBoardService'
import {clone,message} from '@/utils'
import domtoimage from 'dom-to-image'
export default class DashBord{
  constructor(){
    this.id = undefined;
    this.containers = {};
    this.extendContainers = {};  //扩展部件：img、text
    this.paramPackages = []; //参数包
    this.searchParams = {}; //暂存搜索条件
    this.layouts =[];
    this.showGrid = true;
    this.style =  {
      count:0,
      scale: 0.7,
      height: 1080,
      width: 1920,
      borderRadius: 0,
      backgroundColor: 'rgba(255,255,255,1)',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center center',
      backgroundSize:'',
      borderColor: 'rgba(0,0,0,0)',
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
  async save(){
    if(!this.id){
      message.warning("保存失败！未设置驾驶舱ID");
      return
    }
    //去除网格
    let showGrid = this.showGrid;
    this.showGrid = false;

    let thumbnail = undefined;

    //保存缩略图
    let node = document.getElementById("workspace");
    let transform = node.style.transform;

    try{
      node.style.transform = null;
      thumbnail = await domtoimage.toPng(node);
    }catch(e){

    }finally{
      this.showGrid = showGrid;
      node.style.transform = transform;
    }

    let self = this;
    let thisClone = clone(this);
    delete thisClone.searchParams;
    //删除active
    thisClone.layouts.map(el => el.active = false);
    if(thisClone.containers){
      for(let key of Object.keys(thisClone.containers)){
        delete thisClone.containers[key].chart;
        delete thisClone.containers[key].widgetsInstance;
        delete thisClone.containers[key].option;
        delete thisClone.containers[key].dataOption;
        delete thisClone.containers[key].chartSetting;
      }
    }
    let dataStr = JSON.stringify(thisClone);

    let data = {fID:self.id,fJsonContent:dataStr,thumbnail:thumbnail};
    //访问接口保存数据
    saveDashboard(data).then(function (data) {
      if(data.success){
        message.success("保存成功！");
      }else{
        message.warning("保存失败！")
      }
    });
  }

  /**
   * 重新渲染所有复杂组件
   */
  reRoadData(){

    for(let key in this.containers){
      this.containers[key].reRoadData(this.searchParams,true);
    }

  }

};
