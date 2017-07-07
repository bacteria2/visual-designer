import CharContainer from '@/module/CharContainer'

const dashBordDetaultConfig = {
  layouts:[
    {x:0,
      y:0,
      w:4,
      h:4,
      html:'哈哈哈',
      style:'',
      containerId:'idxxsdasdwws1'
    },
    { x:0,
      y:0,
      w:4,
      h:4,
      html:'哈哈哈',
      style:'',
      containerId:'idxxsdasdwws2'
    }]
};

const containers={
  idxxsdasdwws1:{style:{color:'white',
    background:'url(http://localhost:8080/01.png)',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center',
    paddingTop:'50px',
    paddingBottom:'50px'
  },
    title:true,
    tilesStyle:{color:'white'}},
  idxxsdasdwws2:{ title:true}
};



export default class DashBord{
  constructor() {
    this.config = dashBordDetaultConfig ; //测试数据
    this.containers =containers;
  }

  /**
   * 持久化设置
   */
  saveConfig(){

  }
  getConfig(){
    return this.config;
  }
  getLayouts(){
    return this.config.layouts;
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
        this.containers.push(container);
      }
      return container
    }
  }
};
