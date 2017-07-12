/**
 * Created by lenovo on 2017/7/7.
 */
import Dashboard from './Dashboard'
import ChartContainer from './ChartContainer'
import {readDashboard} from '@/services/dashBoardService'

export default class DashboardFactory{
  /**
   * 获取Dashboard实例
   */
   static async getInstance(id){
    if(id){
      let param = {id:id};
      let dashboard = new Dashboard();
      let dataOjb = undefined;
      let dashBoardResp = await  readDashboard(param);
      if(dashBoardResp.success){
        dataOjb=JSON.parse(dashBoardResp.data);
        dashboard.id = dataOjb.id;
        dashboard.style = dataOjb.style;
        dashboard.layouts = dataOjb.layouts;
        //解析container
        let containerObjs = dataOjb.containers;
        for(let key of Object.keys(containerObjs)){
          let containerObj = containerObjs[key];
          let container = new ChartContainer();
          container.analysisObj(containerObj);
          if(container.id){
            console.log(containerObj);
            dashboard.containers[container.id] = container;
          }
        }
        return dashboard;
      }
    }
  }
  static getBlankDashboard(){
    let dashboard = new Dashboard();
    dashboard.id = 'demoId';
    dashboard.layouts = layoutsDemo;
    dashboard.containers = containersDemo;
    return dashboard;
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
  {x: 40, y: 20, width: 270, height:210, active: false, id: 0,containerId:'idxxsdasdwws1',style:{backgroundColor:'#eee'}},
  {x: 350,y: 20, width: 560,height: 380,active: false,id: 2,containerId:'idxxsdasdwws2'},
  {x: 930, y: 260, width: 260, height: 140, active: true, id: 3,containerId:'idxxsdasdwws3'}
];

const container1 = new ChartContainer({id:'idxxsdasdwws1'});
container1.style = {color:'white',
  // background:'url(http://localhost:8080/01.png)',
  backgroundRepeat:'no-repeat',
  backgroundPosition:'center',
  paddingTop:'10px',
  paddingBottom:'10px'
};

container1.title = true;
container1.tileStyle = {color:'red'};

const container2 = new ChartContainer({id:'idxxsdasdwws2'});
container2.showTitle = false;

const containersDemo={
  idxxsdasdwws1:container1,
  idxxsdasdwws2:container2
};


