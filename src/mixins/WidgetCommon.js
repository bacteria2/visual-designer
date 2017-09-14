import {forOwn} from '@/utils'
import {loadWidgetTypes} from '@/services/WidgetService'
export default{
  mounted(){
    //加载应用分类
    loadWidgetTypes().then((resp) => {
      if (resp.success) {
        this.widgetTypes = resp.rows.map((item)=>{
          return {id:item.fID,label:item.fName,value:item.fID}
        })
      }
      else console.log(resp.message, resp.data)
    });
  },
  computed:{
    widgetTyped(){
      let baseType = [];
      forOwn(widgetConfigs,function (v,k) {
          baseType.push({id:k,label:v.alias,value:k})
      })
      return [
        {label:'图形分类',value:'base',icon:'',children:baseType},
        {label:'应用分类',value:'app',icon:'',children:this.widgetTypes}]
    },
    pages(){
      let val = Number.parseInt(this.totalWidgets / this.itemsOfPage),
        mod = this.totalWidgets % this.itemsOfPage,
        pages = mod == 0?val:val+1
      return pages
    },
    hasMore(){
      return this.curPage < this.pages
    }
  },
  data(){
    return{
      widgetTypes:[],//组件分类
      edittingWidget:'',
      curPage:1,
      totalWidgets:0,
      itemsOfPage:50,
      keyWord:''
    }
  }
}
