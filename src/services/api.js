/**
 * Created by lenovo on 2017/5/9.
 */

module.exports = {
  loadTextScript:"/text-option/load",
  //保存Dashboard保存的配置数据
  saveDashBoard:"/dashboard/desiDashboard.do",
  //获取Dashboard保存的配置数据
  readDashBoard:"/dashboard/queryJson.do",
  //加载组件分类
  loadDsInfo:"/dsManager/queryFns.do",
  //--widget start--//
  //加载组件分类
  loadWidgetTypes:"/compttype/queryComptTypes.do",
  //加载基础组件
  loadWidgetsByType:"/widgets/queryWidgets.do",
  //增加组件
  addWidget:"/widgets/addWidgets.do",
  //编辑组件
  getWidgetByID:"/widgets/toEditWidgetsPage.do",
  //保存组件
  saveWidget:"/widgets/saveWidgets.do",
  //移除组件
  removeWidgets:"/widgets/removeWidgets.do",
  //--widget end--//

  //--widgetInstance start--//
  loadWidgetInstancesByType:"/widgetsInstance/queryWidgetsInstance.do",
  addWidgetInstance:"/widgetsInstance/addWidgetsInstance.do",
  saveWidgetInstance:"/widgetsInstance/editWidgetsInstance.do",
  getWidgetInstanceByID:"/widgetsInstance/toEditPage.do",
  removeWidgetInstances:"/widgetsInstance/removeWidgetsInstance.do",
  //--widgetInstance end--//

  //--dataset start--//
  loadColumns:"/dsManager/getColumns.do",
  /**
   * 查询数据源列表，不显示关闭的数据源
   */
  loadFunctionList:"/dsManager/queryFns.do",
  /**
   * 查询数据源列表，关闭的也显示出来
   */
  loadFunctionListAll:"/dsManager/queryList.do",
  previewData:"/dsManager/callBean.do",
  setStatus:"/dsManager/setStatus.do",
  //--dataset end--//

  //--loadRemote--//
  loadRemoteData:"/widgetsInstance/getSeriesByDS.do",
  //----//

  //--Dashboard start--//
  loadDashboardList:"/dashboard/queryDashboards.do",
  addDashboard:"/dashboard/addDashboard.do",
  editDashboard:"/dashboard/editDashboard.do",
  getDashboardByID:"/dashboard/toEditPage.do",
  removeDashboards:"/dashboard/removeDashboard.do",
  //--Dashboard end--//

  //--ComptType start--//
  loadComptTypeList:"/compttype/queryComptTypes.do",
  addComptType:"/compttype/addComptType.do",
  editComptType:"/compttype/editComptType.do",
  getComptTypeByID:"/compttype/toEditPage.do",
  removeComptTypes:"/compttype/removeComptType.do",
  //--ComptType end--//
}
