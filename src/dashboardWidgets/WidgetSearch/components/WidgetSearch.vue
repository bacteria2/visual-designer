<template>
  <div class="searchWrap">

    <div :id="divid" :class="divid" class="searchWrap ">

      <div class="search_widget" :class="{widgetActived:input.actived}" @click.stop="widgetClick($event)"  v-for="(input,index) in options.inputs" :key="input.inputId">
        <input v-if="input.type!='label'" :type="input.type"   :id="input.inputId" />
        <label v-if="input.type=='label'"  :id="input.inputId"  type="label">{{input.label}}</label>
        <i class="js-remove">✖</i>
      </div>

      <button class="search_widget button" @click="doSearch" :title="options.searchTitle" >{{options.searchTitle}}</button>
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
    options:Object
  },
  mounted(){
    let el = document.getElementById(this.divid);
    let _self = this;

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

  },
    data(){
      let divid = uuid();
      return {divid};
    }
    ,
    methods:{
      widgetClick(e){
        let el = null;
        let inputs = e.target.getElementsByTagName("input");
        if(!inputs||inputs.length===0){
          inputs = e.target.getElementsByTagName("label");
        }
        el = inputs[0];

        let id = el.target.getAttribute("id");
        let input = this.options.inputs.filter(e=>{
          el.actived = false;
          return el.inputId===id;
        })[0];
        input.actived = true;
        this.options.count++;

      },
      doSearch(){

      }
    }
}
</script>
