<template>
  <property-row :name="name">
    <label class="number_input_label first_lable">上:</label> <el-input-number size="small" v-model="paddingTop" :min="0"  :controls="false" class="input_number" ></el-input-number>
    <label class="number_input_label">下:</label> <el-input-number size="small" v-model="paddingBottom"  :min="0" :max="4096" :controls="false" class="input_number"></el-input-number>
    <label class="number_input_label">左:</label> <el-input-number size="small" v-model="paddingLeft"  :min="0" :controls="false" class="input_number"></el-input-number>
    <label class="number_input_label">右:</label> <el-input-number size="small" v-model="paddingRight"  :min="0" :controls="false" class="input_number"></el-input-number>
  </property-row>
</template>
<style scoped>
  .first_lable{ width: 25px !important; text-align: left!important;}
.number_input_label {
  text-align: center;
  width: 30px;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: rgb(72, 88, 106);
  line-height: 1;
  padding: 11px 0;
  box-sizing: border-box;}
  .input_number {float: left;width: 50px; margin-top: 3px;}
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
          this.paddingTop= this.model["paddingTop"];
        }
        if(this.model["paddingBottom"]){
          this.paddingBottom= this.model["paddingBottom"];
        }
        if(this.model["paddingLeft"]){
          this.paddingLeft= this.model["paddingLeft"];
        }
        if(this.model["paddingRight"]){
          this.paddingRight= this.model["paddingRight"];
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
