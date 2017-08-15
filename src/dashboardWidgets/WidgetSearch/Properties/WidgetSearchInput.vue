<template>
 <div >
   <property-row name="输入组件:"  >
     <div class="extendWidgetContainer">
      <div id="search_widgets_input" class="search_widgets_input">
        <div class="search_widget" type="label"><label type="label">标题</label></div>
        <div class="search_widget" type="date"><input type="date"/></div>
        <div class="search_widget" type="text"><input type="text"/></div>
        <div class="search_widget" type="number"><input type="number"/></div>
      </div>
     </div>
   </property-row>

   <property-row v-if="activeType&&activeType!=='label'" name="绑定参数:" size="small" >
       <el-cascader
         size="small"
         :options="beanClass"
         v-model="paramBind"
         style="width: 100%"
       >
       </el-cascader>
   </property-row>

   <property-row v-if="activeType&&activeType==='label'" name="标签内容:" size="small" >
     <el-input v-model="labelText" size="small" ></el-input>
   </property-row>
   <property-row name="参数包:"></property-row>
   <prop-input name="搜索按钮:" size="small"  :model="options" propName="searchTitle"></prop-input>
 </div>
</template>
<style >
  .el-cascader-menu__item { font-size: 12px !important;}
  .el-cascader-menu {    min-width: 145px!important;}
  .el-cascader--small .el-cascader__label { line-height: 36px}
</style>
<script>
  import Sortable from "sortablejs";
  export default{
    name: "WidgetSearchInput",
    props:{
      styles:Object,
      options:Object,
      dashboard:Object
    },
    data(){
      return {paramBind:null,activeType:"text",labelText:''}
    },
    watch:{
      "options.count"(){
        this.getActiveInputWdigetParamBind();
      },
      paramBind(v){
        let inputs = this.options.inputs;
        if(inputs&&inputs.length>0){
          let activeInputs = inputs.filter(e=>e.actived===true);
          if(activeInputs.length>0){
            let activeInput = activeInputs[0];
            activeInput.paramBind = v ;
          }
        }
      },
      labelText(v){
        let inputs = this.options.inputs;
        if(inputs&&inputs.length>0){
          let activeInputs = inputs.filter(e=>e.actived===true);
          if(activeInputs.length>0){
            let activeInput = activeInputs[0];
            activeInput.label = v ;
          }
        }
      }
    },
    mounted(){
      //初始化绑定参数
      this.getActiveInputWdigetParamBind();

      //初始化拖拽
      var el = document.getElementById("search_widgets_input");
      Sortable.create(el,{
        sort:false,
        group:{ name: "search", pull: 'clone', put: false },
        handle:".search_widget",
        animation: 300,
      });
    },
    computed:{

      beanClass(){
        let beanClasses = [];
        //计算接口参数
        let containers = this.dashboard.containers;
        console.log("containers",containers);
        if(containers){
          for(let key in containers){
            let container = containers[key];
            console.log("container.dataOption",container.dataOption);
            if(container.dataOption){
              let dataSet = container.dataOption.dataSet;
              console.log("dataSet",dataSet);
              if(dataSet){
                  let dataSetByDI = dataSet.filter(e=>e.type===2);
                  console.log("dataSetByDI",dataSetByDI);
                  dataSetByDI.forEach(e=>{
                    if(e.di)
                    this.setBeanClassAndFun(beanClasses,e.di);
                  });
              }
            }

          }
        }
        console.log("beanClasses",beanClasses);
        return beanClasses;
      },
    },

    methods: {
      handleItemChange(val) {

      },
      setBeanClassAndFun(beanClasses,di){
       if(beanClasses&&di&&di.params&&di.params.length>0){
         let beanClass = {};
         let fun = {};
         //设置bean
         let newBeanclasses = beanClasses.filter(e=>e.value === di.className);

         if(newBeanclasses.length>0){
           beanClass = newBeanclasses[0]
         }else{

           beanClass.children = [];
           beanClass.label = di.classCNName;
           beanClass.value = di.className;

         }

         //设置function
         let beanFuns =  beanClass.children.filter(e=>e.value = di.funName);

         if(beanFuns.length===0){

           fun.label = di.funCNName;
           fun.value = di.funName;
           fun.children = [];
           //设置参数
           di.params.forEach(e=>{
             let param = {};
             param.value = e.index;
             param.label = e.name;
             if(this.activeType ==="date"){
               if(e.type==="Date"){
                 fun.children.push(param);
               }
             }else if(this.activeType ==="text"){
               if(e.type==="String"){
                 fun.children.push(param);
               }
             }else if(this.activeType ==="number"){
               if(e.type==="Integer"||e.type==="Float"){
                 fun.children.push(param);
               }
             }
           });

           if(fun.children.length > 0){
             beanClass.children.push(fun);
           }

           if(beanClass.children.length>0){
             beanClasses.push(beanClass);
           }

         }

       }

      },
      getActiveInputWdigetParamBind(){
        let inputs = this.options.inputs;
        if(inputs&&inputs.length>0){
          let activeInputs = inputs.filter(e=>e.actived===true);
          if(activeInputs.length>0){
            let activeInput = activeInputs[0];
            if(!activeInput.paramBind)  activeInput.paramBind = [];
            this.paramBind = activeInput.paramBind;
            this.activeType = activeInput.type;
            this.labelText = activeInput.label;
          }else{
            this.paramBind = [];
          }
        }
      }
    }

  }
</script>
