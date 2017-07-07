const dashBordDetaultConfig = {
  layouts:[
    {x:0,
      y:0,
      w:4,
      h:4,
      html:'哈哈哈',
      style:'',
      id:'idxxsdasdwws1',
      container:{
        style:{color:'white',
          background:'url(http://localhost:8080/01.png)',
          backgroundRepeat:'no-repeat',
          backgroundPosition:'center',
          padding:'50px'
        },
        tilesStyle:{color:'white'}
      }
    },
    { x:0,
      y:0,
      w:4,
      h:4,
      html:'哈哈哈',
      style:'',
      id:'idxxsdasdwws2',
      container:{
        title:true
      }
    }]
};



export default class DashBord{
  constructor() {
    this.config = {} ;
  }
  /**
   * 从文件中读取配置
   */
  init (name) {
    if(name){
      //读取文件
    }else{
      this.config = dashBordDetaultConfig;
    }
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
};
