<template>
  <property-row :name="name">
    <color-picker :value="color" @input="setValue" :rectangle="true" ></color-picker>
    <el-input-number style="float: left;width:120px;" size="small" :min="10" :step="1" v-model="fontSize"></el-input-number>
    <el-radio-group  v-model="fontFamily" fill="#0faedb" size="small" style="float: left;height:32px; margin:0 10px 10px 8px">
      <el-radio-button  label="Microsoft YaHei">雅黑</el-radio-button>
      <el-radio-button  label="SimSun">宋体</el-radio-button>
      <el-radio-button  label="SimHei">黑体</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="fontWeight" size="small" fill="#0faedb" style="float: left;margin:0 0 10px 0px">
      <el-radio-button  label="normal">默认</el-radio-button>
      <el-radio-button  label="bold">加粗</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="fontStyle" size="small" fill="#0faedb" style="float: left;margin:0 0 10px 8px">
      <el-radio-button  label="normal">默认</el-radio-button>
      <el-radio-button  label="italic">斜体</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="textAlign" size="small" fill="#0faedb" style="float: left;margin:0 0 10px 0px">
      <el-radio-button  label="left">左对齐</el-radio-button>
      <el-radio-button  label="center">居中</el-radio-button>
      <el-radio-button  label="right">右对齐</el-radio-button>
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
    if(this.model){
        if(this.model["color"]){
          this.color= this.model["color"];
        }
        if(this.model["fontSize"]){
          this.fontSize= this.model["fontSize"];
        }
        if(this.model["fontFamily"]){
          this.fontFamily= this.model["fontFamily"];
        }
        if(this.model["fontWeight"]){
          this.fontWeight= this.model["fontWeight"];
        }
        if(this.model["fontStyle"]){
          this.fontStyle= this.model["fontStyle"];
        }
        if(this.model["textAlign"]){
          this.textAlign= this.model["textAlign"];
        }
    }
  },
  watch:{
    fontSize(e){
      if(this.model){
        this.model["fontSize"] = e;
      }
    },
    fontFamily(e){
      if(this.model){
        this.model["fontFamily"] = e;
      }
    },
    fontWeight(e){
      if(this.model){
        this.model["fontWeight"] = e;
      }
    },
    fontStyle(e){
      if(this.model){
        this.model["fontStyle"] = e;
      }
    },
    textAlign(e){
      if(this.model){
        this.model["textAlign"] = e;
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
      }
    }
  }

}
</script>
