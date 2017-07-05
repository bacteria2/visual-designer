<template>
  <div>
    <mu-dialog :open="showDialog" title="新增基本组件" dialogClass="data-definition-column">
      <v-text-field v-model="widget.fPluginName" label="组件名称（必填）"></v-text-field>
      <mu-select-field v-model="widget.impageCategory" labelFloat label="图形分类（必选）" style="width: 100%">
        <mu-menu-item v-for="type in chartType" :value="type.id" :title="type.name" :key="type.id"></mu-menu-item>
      </mu-select-field>
      <mu-select-field v-model="widget.useType" labelFloat label="应用分类" style="width: 100%" :multiple="true">
        <mu-menu-item v-for="type in useType" :value="type.id" :title="type.name" :key="type.id"></mu-menu-item>
      </mu-select-field>
      <v-text-field label="备注" multi-line v-model="widget.fDescription"></v-text-field>
      <v-btn slot="actions" flat @click.native="save"><v-icon>save</v-icon>保存</v-btn>
      <v-btn slot="actions" flat @click.native="close" >取消</v-btn>
    </mu-dialog>
  </div>
</template>
<script>
  import {addWidget,saveWidget} from '@/services/WidgetService'
  import {forOwn} from '@/utils'
  export default{
    props: {
      show: Boolean,
      widgetTyped:{
          type:Array,
        default:[]
      },
      edittingObj:{Object}
    },
    computed:{
        chartType(){
              return this.widgetTyped[0].child;
        },
        useType(){
              return this.widgetTyped[1].child;
        },
        isUpdata(){
            return this.widget.fId!="";
        }
    },
    watch: {
      show(val){
        this.showDialog = val;
      },
      edittingObj(val){
          if(val.fID){
             let  widgets =  this.widget;
            forOwn(widgets,function (v,k) {
              widgets[k] = val[k]
            })
            if(widgets.appCategory){
              widgets.useType = widgets.appCategory.split(",")
            }
          }
      }
    },
    data(){
      return {
        showDialog: this.show,
        widget:{fId: "", fPluginName: "",impageCategory: "", useType: [], fDescription: "",appCategory:''}
      }
    },
    methods: {
      close(){
        this.$emit("update:show", false);
      },
      save(){
          let widget = this.widget;
          widget.appCategory = widget.useType.toString();
         if(!this.isUpdata){
           //新增时
           addWidget(widget).then((resp) => {
             if (resp.success) {
                console.log(resp)
             }
             else console.log(resp.message, resp.data)
           });
         }else{
           //修改时
           saveWidget(widget).then((resp) => {
             if (resp.success) {
               this.widgets = resp
             }
             else console.log(resp.message, resp.data)
           });
         }


        this.close();
      }
    }
  }
</script>
