/**
 * Created by lenovo on 2017/7/7.
 */
import Dashboard from './Dashboard'
import CharContainer from '@/module/CharContainer'

export default class DashboardFactory{
  /**
   * 获取Dashboard实例
   */
  static getInstance(name){
    if(name){
      //读取保存的配置
    }else{
      let dashboard = new Dashboard();
      dashboard.layouts = layoutsDemo;
      dashboard.containers = containersDemo;
      return dashboard;
    }
  }
}
/*const layoutsDemo = [
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
  }] ;*/
const layoutsDemo=[
  {x: 40, y: 20, width: 270, height:210, active: false, id: 0,containerId:'idxxsdasdwws1',style:{}},
  {x: 350,y: 20, width: 560,height: 380,active: false,id: 2,containerId:'idxxsdasdwws2'},
  {x: 930, y: 260, width: 260, height: 140, active: true, id: 3,containerId:'idxxsdasdwws3'}
];

const container1 = new CharContainer({id:'idxxsdasdwws1'});
container1.style = {color:'white',
  // background:'url(http://localhost:8080/01.png)',
  backgroundRepeat:'no-repeat',
  backgroundPosition:'center',
  paddingTop:'10px',
  paddingBottom:'10px'
};

container1.title = true;
container1.tileStyle = {color:'red'};

const container2 = new CharContainer({id:'idxxsdasdwws2'});
container2.showTitle = false;

const containersDemo={
  idxxsdasdwws1:container1,
  idxxsdasdwws2:container2
};


