/**
 * Created by lenovo on 2017/7/7.
 */
import Dashboard from './Dashboard'
export default class DashboardFactory{
  constructor(){

  }

  /**
   * 获取Dashboard实例
   */
  static getInsance(name){
    if(name){
      //读取保存的配置
    }else{
      let dashboard = new Dashboard();
      return dashboard;
    }

  }
}
