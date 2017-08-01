<template>
  <div>
    <mu-dialog :open="showDialog" :title="title" dialogClass="data-definition-column">
      <v-text-field v-model="widget.fPluginName" label="组件名称（必填）"></v-text-field>
      <mu-select-field v-model="widget.impageCategory" labelFloat label="图形分类（必选）" style="width: 100%">
        <mu-menu-item v-for="type in chartType" :value="type.id" :title="type.label" :key="type.id"></mu-menu-item>
      </mu-select-field>
      <mu-select-field v-model="widget.useType" labelFloat label="应用分类" style="width: 100%" :multiple="true">
        <mu-menu-item v-for="type in useType" :value="type.id" :title="type.label" :key="type.id"></mu-menu-item>
      </mu-select-field>
      <v-text-field label="备注" multi-line v-model="widget.fDescription"></v-text-field>
      <v-btn slot="actions" flat @click.native="save"><v-icon>save</v-icon>保存</v-btn>
      <v-btn slot="actions" flat @click.native="close" >取消</v-btn>
    </mu-dialog>
  </div>
</template>
<script>
  import {addWidget,saveWidget} from '@/services/WidgetService'
  import {forOwn,message} from '@/utils'
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
              return this.widgetTyped[0].children;
        },
        useType(){
              return this.widgetTyped[1].children;
        },
        isUpdata(){
            return this.widget.fID!="";
        },
        title(){
            return this.widget.fID == "" ? '新增基本组件' : '修改基本组件';
        }
    },
    watch: {
      show(val){
        this.showDialog = val;
      },
      edittingObj(val){
          if(val.fID){//fID 存在的时候，修改状态
            let  widgets =  this.widget;
            forOwn(widgets,function (v,k) {
              widgets[k] = val[k]
            })
            if(widgets.appCategory){
               widgets.useType = widgets.appCategory.split(",")
            }else{
              widgets.useType = []
            }
          }else{
              this.widget = {fID: "", fPluginName: "",impageCategory: "", useType: [], fDescription: "",appCategory:''}
          }
      }
    },
    data(){
      return {
        showDialog: this.show,
        widget:{fID: "", fPluginName: "",impageCategory: "", useType: [], fDescription: "",appCategory:''}
      }
    },
    methods: {
      close(){
        this.$emit("update:show", false);
      },
      save(){
          let widget = this.widget,that = this
          widget.appCategory = widget.useType.toString();
         if(!this.isUpdata){
           //新增时
           addWidget(widget).then((resp) => {
             if (resp.success) {
               message.success("新增成功")
               this.$emit("doRefresh",true)
               that.close();
             }
             else message.warning(resp.msg)
           });
         }else{
           //修改时
           saveWidget({widgetsVO:widget}).then((resp) => {
             if (resp.success) {
               message.success("保存成功")
               this.$emit("doRefresh")
               that.close();
             }
             else message.warning(resp.msg)
           });
         }
      }
    }
  }
</script>
