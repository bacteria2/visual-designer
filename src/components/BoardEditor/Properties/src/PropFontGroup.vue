<template>
  <property-row :name="name">
    <color-picker :value="color" @input="setValue" :rectangle="true" ></color-picker>
    <el-input-number style="float: left;width:120px;" size="small" :min="10" :step="1" v-model="fontSize"></el-input-number>
    <el-radio-group  v-model="fontFamily" fill="#0faedb" size="small" style="float: left;height:32px; margin:0 10px 10px 12px">
      <el-radio-button  label="Microsoft YaHei">雅黑</el-radio-button>
      <el-radio-button  label="SimSun">宋体</el-radio-button>
      <el-radio-button  label="SimHei">黑体</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="textAlign" size="small" fill="#0faedb" style="float: left;margin:0px 0 10px 0">
      <el-radio-button  label="left">居左</el-radio-button>
      <el-radio-button  label="center">居中</el-radio-button>
      <el-radio-button  label="right">居右</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="fontWeight" size="small" fill="#0faedb" style="float: left;margin:0px 0 10px 8px">
      <el-radio-button  label="normal">默认</el-radio-button>
      <el-radio-button  label="bold">加粗</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="fontStyle" size="small" fill="#0faedb" style="float: left;margin:0 0 10px 8px">
      <el-radio-button  label="normal">默认</el-radio-button>
      <el-radio-button  label="italic">斜体</el-radio-button>
    </el-radio-group>

  </property-row>
</template>

<style>
  .el-radio-button--small .el-radio-button__inner{
    padding: 8px 9px;
  }
</style>
<script>

export default {
  name:'propFontGroup',
  props:{
    model:Object,
    name:String,
    options:Array
  },
  mounted(){
    this.initValue();
  },
  watch:{
    model(){
      this.initValue();
    },
    fontSize(e){
      if(this.model){
        this.model["fontSize"] = e;
        this.model.count++;
      }
    },
    fontFamily(e){
      if(this.model){
        this.model["fontFamily"] = e;
        this.model.count++;
      }
    },
    fontWeight(e){
      if(this.model){
        this.model["fontWeight"] = e;
        this.model.count++;
      }
    },
    fontStyle(e){
      if(this.model){
        this.model["fontStyle"] = e;
        this.model.count++;
      }
    },
    textAlign(e){
      if(this.model){
        this.model["textAlign"] = e;
        this.model.count++;
      }
    }
  },
  data(){
    return{
      color:"#444444",
      fontSize:14,
      fontFamily:"",
      fontWeight:"normal",
      fontStyle:"normal",
      textAlign:"left",
    }
  },
  methods:{
    setValue(e){
      if(this.model){
        this.model["color"] = e;
        this.model.count++;
      }
    },
    initValue(){
      if(this.model){
          this.color= this.model["color"];
          this.fontSize= this.model["fontSize"];
          this.fontFamily= this.model["fontFamily"];
          this.fontWeight= this.model["fontWeight"];
          this.fontStyle= this.model["fontStyle"];
          this.textAlign= this.model["textAlign"];
      }
    }
  }

}
</script>
