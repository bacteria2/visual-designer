<template>
  <property-row :name="name">
    <color-picker v-model="model.color" propName="color"></color-picker>
    <el-input-number size="small" v-model="model.fontSize" :step="step" :min="min" :max="max"></el-input-number>
    <el-select size="small" v-model="model.fontFamily"  :placeholder="placeholder" style="width: 90px">
      <el-option v-for="option in options" :label="option.text" :value="option.value"></el-option>
    </el-select>
  </property-row>
  <property-row>
    <el-select size="small" v-model="value"  :placeholder="placeholder" style="width: 90px">
      <el-option v-for="option in options" :label="option.text" :value="option.value"></el-option>
    </el-select>
    <el-select size="small" v-model="value"  :placeholder="placeholder" style="width: 90px">
      <el-option v-for="option in options" :label="option.text" :value="option.value"></el-option>
    </el-select>
    <el-select size="small" v-model="value"  :placeholder="placeholder" style="width: 90px">
      <el-option v-for="option in options" :label="option.text" :value="option.value"></el-option>
    </el-select>
  </property-row>
</template>

<script>
import propertyRow from '../../layout'
import vue from 'vue'
propertyRow.install(vue);

export default {
  name:'propGroup',
  props:{
    model:Object,
    name:String
  },
  mounted(){
    if(this.model&&this.propName){
      this.value = this.model[this.propName];
    }
  },
  watch:{
    value(e){
      if(this.model&&this.propName){
        this.model[this.propName] = e;
      }
    }
  },
  data(){
    return{
      value:1
    }
  }

}
</script>
