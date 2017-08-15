<template>
  <div>
    <mu-dialog :open="showDialog" :title="title" dialogClass="data-definition-column">
      <mu-text-field v-model="daObj.fName" label="组件分类名称（必填）" labelFloat fullWidth  :maxLength="30"></mu-text-field>
      <mu-text-field v-model="daObj.fDescription" label="备注" multiLine labelFloat fullWidth   :maxLength="50"></mu-text-field>
      <mu-flat-button slot="actions"  @click="save"><mu-icon value="save"></mu-icon>保存</mu-flat-button>
      <mu-flat-button slot="actions"  @click="close" >取消</mu-flat-button>
    </mu-dialog>
  </div>
</template>
<script>
  import {addComptType,editComptType} from '@/services/comptTypeService'
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
            return this.daObj.fID == "" ? '新增应用分类' : '修改应用分类';
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
              this.daObj = {fID: "", fName: "", fType:"", fDescription: ""}
          }
      }
    },
    data(){
      return {
        showDialog: this.show,
        daObj:{fID: "", fName: "", fType:"", fDescription: ""}
      }
    },
    methods: {
      close(){
        this.$emit("update:show", false);
      },
      save(){
          this.daObj.fType=1;
          let daObj = this.daObj,that = this
         if(!this.isUpdata){
           //新增时
           addComptType(daObj).then((resp) => {
             if (resp.success) {
               message.success("新增成功")
               this.$emit("doRefresh")
               that.close();
             }
             else message.warning(resp.msg)
           });
         }else{
           //修改时
           editComptType({comptTypeVO:daObj}).then((resp) => {
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
