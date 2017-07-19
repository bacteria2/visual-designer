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

export default {
  name:'PropPaddingGroup',
  props:{
    model:Object,
    name:String,
    options:Array
  },
  mounted(){
    if(this.model){
        if(this.model["paddingTop"]){
          this.color= this.model["paddingTop"];
        }
        if(this.model["paddingBottom"]){
          this.fontSize= this.model["paddingBottom"];
        }
        if(this.model["paddingLeft"]){
          this.fontFamily= this.model["paddingLeft"];
        }
        if(this.model["paddingRight"]){
          this.fontWeight= this.model["paddingRight"];
        }
    }
  },
  watch:{
    paddingTop(e){
      if(this.model){
        this.model["paddingTop"] = e;
      }
    },
    paddingBottom(e){
      if(this.model){
        this.model["paddingBottom"] = e;
      }
    },
    paddingLeft(e){
      if(this.model){
        this.model["paddingLeft"] = e;
      }
    },
    paddingRight(e){
      if(this.model){
        this.model["paddingRight"] = e;
      }
    }
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
