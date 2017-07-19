<template>
  <property-row :name="name">
    <el-select size="small" v-model="value"  :placeholder="placeholder" style="width: 90px">
      <el-option v-for="option in options" :label="option.text" :key="option.value" :value="option.value"></el-option>
    </el-select>
  </property-row>
</template>

<script>
import propertyRow from '../../layout'
import vue from 'vue'
propertyRow.install(vue);

export default {
  name:'propSelect',
  props:{
    propName:String,
    model:Object,
    options:Array,
    name:String,
    placeholder:String,
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
