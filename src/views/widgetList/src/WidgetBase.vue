<template>
  <div>
    <mu-dialog :open="showDialog" title="新增基本组件" dialogClass="data-definition-column">
      <v-text-field v-model="widget.name" label="组件名称（必填）"></v-text-field>
      <mu-select-field v-model="widget.chartType" labelFloat label="图形分类（必选）" style="width: 100%">
        <mu-menu-item v-for="type in chartType" :value="type.id" :title="type.name" :key="type.id"></mu-menu-item>
      </mu-select-field>
      <mu-select-field v-model="widget.useType" labelFloat label="应用分类" style="width: 100%" :multiple="true">
        <mu-menu-item v-for="type in useType" :value="type.id" :title="type.name" :key="type.id"></mu-menu-item>
      </mu-select-field>
      <v-text-field label="备注" multi-line v-model="widget.dec"></v-text-field>
      <v-btn slot="actions" flat @click.native="save"><v-icon>save</v-icon>保存</v-btn>
      <v-btn slot="actions" flat @click.native="close" >取消</v-btn>
    </mu-dialog>
  </div>
</template>
<script>
  export default{
    //name: "WidgetBase",
    props: {
      show: Boolean,
      widgetTypes:{
          type:Array,
        default:[]
      }
    },
    computed:{
        chartType(){
              return this.widgetTypes.filter((item)=>{return item.type == 0});
        },
        useType(){
            return this.widgetTypes.filter((item) => {
              return item.type == 1
            });
        },
    },
    watch: {
      show(val){
        this.showDialog = val;
      }
    },
    data(){
      return {
        showDialog: this.show,
        widget: {
          name: "", chartType: "",useType:[], dec: ""
        },
      }
    },
    methods: {

      close(){
        this.$emit("update:show", false);
      },
      save(){
        let row = {name: "列", type: "string", alias: "", mergeNumber: 1};
        let data=this.sourceInfo.data;
        //添加列头记录
        this.sourceInfo.columns.push(row)
        //添加空白列记录,如果列为空白,则直接添加
        if(data.length<1){
          this.sourceInfo.data=[]
        }
        //如果存在行内数据，则在第一行追加数据
        else{

        }
        this.sourceInfo.data=[...this.sourceInfo.data,]
        this.singleColumn = row;
      }
    }
  }
</script>
