/**
 * Created by lenovo on 2017/7/7.
 */
import Dashboard from './Dashboard'
import ChartContainer from './ChartContainer'
import ExtendContainer from './ExtendContainer'
import {readDashboard} from '@/services/dashBoardService'

export default class DashboardFactory{
  /**
   * 获取Dashboard实例
   */
   static async getInstance(id) {
    if (id) {
      let param = { id: id };
      let dashboard = new Dashboard();
      let dataOjb = undefined;
      let dashBoardResp = await  readDashboard(param);
      if (dashBoardResp.success&&dashBoardResp.data) {
        if(dashBoardResp.data instanceof Object){
          if(window.replaceImagePath ){
            let dataString = JSON.stringify(dashBoardResp.data);
            dataString = window.replaceImagePath(dataString);
            dataOjb = JSON.parse(dataString);
          }else{
            dataOjb = dashBoardResp.data;
          }
        }else{
          //将绝对路径替换成相对路径，项目使用
          if(window.replaceImagePath){
            let newData = window.replaceImagePath(dashBoardResp.data);
            dataOjb = JSON.parse(newData);
          }else{
            dataOjb = JSON.parse(dashBoardResp.data);
          }
        }

        dashboard.id = dataOjb.id;
        dashboard.style = dataOjb.style;
        dashboard.layouts = dataOjb.layouts;
        dashboard.extendWidgets = dataOjb.extendWidgets;
        dashboard.paramPackages = dataOjb.paramPackages;
        dashboard.containers = {};
        //解析container
        let containerObjs = dataOjb.containers;
        if(containerObjs){
          for (let key of Object.keys(containerObjs)) {
            // console.log(key);
            let containerObj = containerObjs[key];
            let container = new ChartContainer();
            //设置数据到对象中
            container.analysisObj(containerObj);
            if (container.id) {
              dashboard.containers[key] = container;
            }
          }
        }


        //解析extendContainer
        let extendContainerObjs = dataOjb.extendContainers;
        if(extendContainerObjs){
          // console.log(containerObjs);
          for (let key of Object.keys(extendContainerObjs)) {
            // console.log(key);
            let containerObj = extendContainerObjs[key];
            let extendContainer = new ExtendContainer();
            //设置数据到对象中
            extendContainer.analysisObj(containerObj);
            if (extendContainer.id) {
              dashboard.extendContainers[key] = extendContainer;
            }
          }
        }


        return dashboard;
      }
    }
  }

  static getBlankDashboard(){
    let dashboard = new Dashboard();
    return dashboard;
  }

}

