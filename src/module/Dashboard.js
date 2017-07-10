import CharContainer from '@/module/CharContainer'


export default class DashBord{
  constructor(){
    this.containers ={};
    this.layouts =[{},{}];
    this.style = {};
  }
  /**
   * Dashboard负责提供Container
   * @param id
   * @returns {*}
   */
  getContainer(id){
    if(id){
      let container = this.containers[id];
      if(!container){ //不存在对象则创建新对象
        container = new CharContainer({id:id});
        this.containers[id] = container;
      }
      return container
    }
  }

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
