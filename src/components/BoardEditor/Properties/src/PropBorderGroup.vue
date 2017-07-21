<template>
  <property-row :name="name">
    <color-picker :value="model.borderColor" @input="setValue"  :rectangle="true"></color-picker>
    <el-input-number style="float: left;width:120px;" size="small" :min="0" :step="1" v-model="model.borderWidth"></el-input-number>
    <el-radio-group  v-model="model.borderStyle" fill="#0faedb" size="small" style="float: left;height:32px; margin:0 10px 10px 12px">
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
    methods:{
      setValue(e){
        this.model['borderColor'] = e;
      }
    }

  }
</script>
