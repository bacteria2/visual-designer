/**
 * Created by lenovo on 2017/5/9.
 */

module.exports = {
  loadTextScript:"/text-option/load",
  //保存Dashboard保存的配置数据
  saveDashBoard:"/dashboard/saveJson.do",
  //获取Dashboard保存的配置数据
  readDashBoard:"http://localhost:8080/ydp-visual-web/ydp/visual/dashboard/queryJson.do",
  //加载组件分类
  loadDsInfo:"http://localhost:8080/ydp-visual-web/visual/dsManager/queryFns.do",
  //--widget start--//
  //加载组件分类
  loadWidgetTypes:"http://localhost:8080/ydp-visual-web/ydp/visual/compttype/queryComptTypes.do",
  //加载基础组件
  loadWidgetsByType:"http://localhost:8080/ydp-visual-web/ydp/visual/widgets/queryWidgets.do",
  //增加组件
  addWidget:"http://localhost:8080/ydp-visual-web/ydp/visual/widgets/addWidgets.do",
  //编辑组件
  getWidgetByID:"http://localhost:8080/ydp-visual-web/ydp/visual/widgets/toEditWidgetsPage.do",
  //保存组件
  saveWidget:"http://localhost:8080/ydp-visual-web/ydp/visual/widgets/saveWidgets.do",
  //移除组件
  removeWidgets:"http://localhost:8080/ydp-visual-web/ydp/visual/widgets/removeWidgets.do",
  //--widget end--//

  //--widgetInstance start--//
  loadWidgetInstancesByType:"http://localhost:8080/ydp-visual-web/ydp/visual/widgetsInstance/queryWidgetsInstance.do",
  addWidgetInstance:"http://localhost:8080/ydp-visual-web/ydp/visual/widgetsInstance/addWidgetsInstance.do",
  saveWidgetInstance:"http://localhost:8080/ydp-visual-web/ydp/visual/widgetsInstance/editWidgetsInstance.do",
  getWidgetInstanceByID:"http://localhost:8080/ydp-visual-web/ydp/visual/widgetsInstance/toEditPage.do",
  removeWidgetInstances:"http://localhost:8080/ydp-visual-web/ydp/visual/widgetsInstance/removeWidgetsInstance.do",
  //--widgetInstance end--//

  //--dataset start--//
  loadColumns:"http://localhost:8080/ydp-visual-web/api/visual/dsManager/getColumns.do",
  loadFunctionList:"http://localhost:8080/ydp-visual-web/api/visual/dsManager/queryFns.do",
  previewData:"http://localhost:8080/ydp-visual-web/api/visual/dsManager/callBean.do"
  //--dataset end--//
}
