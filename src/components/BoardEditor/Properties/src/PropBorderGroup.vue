<template>
  <property-row :name="name">
    <color-picker :value="borderColor" @input="setValue"  :rectangle="true"></color-picker>
    <el-input-number style="float: left;width:120px;" size="small" :min="0" :step="1" v-model="borderWidth"></el-input-number>
    <el-radio-group  v-model="borderStyle" fill="#0faedb" size="small" style="float: left;height:32px; margin:0 10px 10px 12px">
      <el-radio-button  label="dashed">虚线</el-radio-button>
      <el-radio-button  label="solid">实线</el-radio-button>
      <el-radio-button  label="double">双线</el-radio-button>
    </el-radio-group>
  </property-row>
</template>
<style scoped>
</style>

<script>
  export default {
    name:'PropBorderGroup',
    props:{
      model:Object,
      name:String,
    },
    mounted(){
      this.initValue();
    },
    watch:{
      model(){
        this.initValue();
      },
      borderWidth(e){
        if(this.model){
          this.model["borderWidth"] = e;
          this.model.count++;
        }
      },
      borderStyle(e){
        if(this.model){
          this.model["borderStyle"] = e;
          this.model.count++;
        }
      }
    },
    data(){
      return {
        borderColor:'rgba(0,0,0,0)',
        borderWidth:1,
        borderStyle:'solid'
      }
    },
    methods:{
      setValue(e){
        if(this.model){
          this.model["borderColor"] = e;
          this.model.count++;
        }
      },
      initValue(){
        if(this.model){
          this.borderColor= this.model["borderColor"];
          this.borderWidth= this.model["borderWidth"];
          this.borderStyle= this.model["borderStyle"];
        }
      }
    }
  }
</script>
