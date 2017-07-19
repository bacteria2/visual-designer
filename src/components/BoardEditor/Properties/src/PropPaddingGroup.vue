<template>
  <property-row :name="name">
    <el-tooltip content="上内边距" placement="top" effect="light">
      <el-input-number size="small" v-model="paddingTop" :min="0" ></el-input-number>
    </el-tooltip>
    <el-tooltip content="下内边距" placement="top" effect="light">
      <el-input-number size="small" v-model="paddingBottom"  :min="0" ></el-input-number>
    </el-tooltip>
    <el-tooltip content="左内边距" placement="bottom" effect="light">
      <el-input-number size="small" v-model="paddingLeft"  :min="0" ></el-input-number>
    </el-tooltip>
    <el-tooltip content="右内边距" placement="bottom" effect="light">
      <el-input-number size="small" v-model="paddingRight"  :min="0" ></el-input-number>
    </el-tooltip>
  </property-row>
</template>
<style >

</style>
<script>
import propertyRow from '../../layout'
import vue from 'vue'
propertyRow.install(vue);

export default {
  name:'PropPaddingGroup',
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
    paddingTop(e){
      if(this.model){
        this.model["paddingTop"] = e;
      }
    },

  },
  data(){
    return{
      paddingTop:null,
      paddingBottom:null,
      paddingLeft:null,
      paddingRight:null,
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
