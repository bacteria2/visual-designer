<template>
  <div>
    <mu-dialog :open="showDialog" :title="title" dialogClass="data-definition-column">
      <v-text-field v-model="daObj.fName" label="Dashboard名称（必填）"></v-text-field>
      <v-text-field label="备注" multi-line v-model="daObj.fDescription"></v-text-field>
      <v-btn slot="actions" flat @click.native="save"><v-icon>save</v-icon>保存</v-btn>
      <v-btn slot="actions" flat @click.native="close" >取消</v-btn>
    </mu-dialog>
  </div>
</template>
<script>
  import {addDashboard,editDashboard} from '@/services/dashBoardService'
  import {forOwn,message} from '@/utils'
  export default{
    props: {
      show: Boolean,
      edittingObj:{Object}
    },
    computed:{
        isUpdata(){
            return this.daObj.fID!="";
        },
        title(){
            return this.daObj.fID == "" ? '新增Dashboard' : '修改Dashboard';
        }
    },
    watch: {
      show(val){
        this.showDialog = val;
      },
      edittingObj(val){
          if(val.fID){//fID 存在的时候，修改状态
            let  dashVars =  this.daObj;
            forOwn(dashVars,function (v,k) {
              dashVars[k] = val[k]
            })
          }else{
              this.daObj = {fID: "", fName: "", fDescription: ""}
          }
      }
    },
    data(){
      return {
        showDialog: this.show,
        daObj:{fID: "", fName: "", fDescription: ""}
      }
    },
    methods: {
      close(){
        this.$emit("update:show", false);
      },
      save(){
          let daObj = this.daObj,that = this
        console.log(daObj)
         if(!this.isUpdata){
           //新增时
           addDashboard(daObj).then((resp) => {
             if (resp.success) {
               message.success("新增成功")
               this.$emit("doRefresh")
               that.close();
             }
             else message.warning(resp.msg)
           });
         }else{
           //修改时
           editDashboard({dashboardVO:daObj}).then((resp) => {
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
