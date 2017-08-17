<template>
  <div class="searchWrap">
    <div :id="divid" :class="divid" class="searchWrap ">
      <div class="search_widget" :class="{widgetActived:input.actived}" @click="widgetWrapClick($event)"  v-for="(input,index) in options.inputs" :key="input.inputId">
        <input @click.stop="widgetClick($event)" v-if="input.type!='label'" :type="input.type"   :id="input.inputId"  />
        <label @click.stop="widgetClick($event)" v-if="input.type=='label'"  :id="input.inputId"  type="label">{{input.label}}</label>
        <i v-if="!dashboard.share" class="js-remove">✖</i>
      </div>
      <button class="button" @click.stop="doSearch" :title="options.searchTitle" >{{options.searchTitle}}</button>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>

  import Sortable from "sortablejs";
  import { uuid, message, clone } from '@/utils'
  export default {

  name: 'WidgetSearch',
  props:{
    styles:Object,
    options:Object,
    dashboard:Object
  },
  mounted(){
    let el = document.getElementById(this.divid);
    let _self = this;
    if(!this.dashboard.share){
      let editableList=Sortable.create(el,{
        group:"search",
        animation: 300,
        ghostClass: "ghost",
        onEnd: function (/**Event*/evt) {
          let oi = evt.oldIndex,ni = evt.newIndex;
          _self.options.inputs.splice(ni,0,..._self.options.inputs.splice(oi,1));
        },
        onAdd:function(evt){
          //赋值ID
          let id = uuid();
          let el = editableList.closest(evt.item);
          let inputs = el.getElementsByTagName("input");
          if(inputs&&inputs.length>0){
            let input = inputs[0];
            input.setAttribute("id",id);
          }else{
            el.setAttribute("id",id);
          }
          //dashboard添加输入控件
          let type = el.getAttribute("type");
          el && el.parentNode.removeChild(el);

          //将控件添加到对象中
          if(!_self.options.inputs){
            _self.options.inputs = [];
          }
          let inputWidget = {};
          inputWidget.inputId = id;
          inputWidget.type = type;
          if(type ==="label"){
            inputWidget.label = "标题";
          }else{
            inputWidget.paramBind = [];
          }
          inputWidget.actived = false;

          _self.options.inputs.splice(evt.newIndex,0,inputWidget);
          _self.options.count ++;

        },
        filter: '.js-remove',
        onFilter: function (evt) {
          let el = editableList.closest(evt.item);
          let inputs = el.getElementsByTagName("input");
          if(inputs&&inputs.length>0){
            let input = inputs[0];
            let id = input.getAttribute("id");
            _self.options.inputs = _self.options.inputs.filter(e=>e.inputId!=id);
          }else{
            let labels = el.getElementsByTagName("label");
            let label = labels[0];
            let id = label.getAttribute("id");
            _self.options.inputs = _self.options.inputs.filter(e=>e.inputId!=id);
          }
        }
      });
    }


  },
    data(){
      let divid = uuid();
      return {divid};
    }
    ,
    methods:{
      widgetWrapClick(e){
        if(this.dashboard.share) return;
        let el = null;
        let inputs = e.target.getElementsByTagName("input");
        if(!inputs||inputs.length===0){
          inputs = e.target.getElementsByTagName("label");
        }
        el = inputs[0];

        let id = el.getAttribute("id");
        let input = this.options.inputs.filter(e=>{
          e.actived = false;
          return e.inputId===id;
        })[0];
        input.actived = true;
        this.options.count++;
      },
      widgetClick(e){
        if(this.dashboard.share) return;
        let el = e.target;
        let id = el.getAttribute("id");
        let input = this.options.inputs.filter(e=>{
          e.actived = false;
          return e.inputId===id;
        })[0];
        input.actived = true;
        this.options.count++;
      },

      doSearch(){
        //组合搜索条件，重新渲染所有组件
        let _self = this;
        _self.dashboard.searchParams = {};
        this.options.inputs.filter(e=>{
          if(['date','text','number'].includes(e.type)){
              if(e.paramBind&&e.paramBind.length===3){
                 let paramKey = e.paramBind[0]+"_"+e.paramBind[1]+"_"+e.paramBind[2];
                 let el = document.getElementById(e.inputId);
                 let value = el.value;
                 if(paramKey&&value!==null&&value!==undefined&&value!==""){
                   _self.dashboard.searchParams[paramKey] = value;

                 }
              }
          }else if(['radio','checkbox'].includes(e.type)){
            let el = document.getElementById(e.inputId);
            if(el&&el.checked) {
              let paramPackageID = e.paramPackage;
              let paramPackage = _self.dashboard.paramPackages.filter(ee=>ee.id ===paramPackageID)[0];
              if(paramPackage&&paramPackage.params){
                let params = paramPackage.params;
                params.filter(e=>{
                  let paramKey = e.paramBind[0]+"_"+e.paramBind[1]+"_"+e.paramBind[2];
                  let value = e.value;
                  if(paramKey&&value!==null&&value!==undefined&&value!==""){
                    _self.dashboard.searchParams[paramKey] = value;

                  }
                })
              }
            }
          }
        });
        console.log("搜索参数为:",_self.dashboard.searchParams);
        //重新渲染
        _self.dashboard.reRoadData();

      }
    }
}
</script>
