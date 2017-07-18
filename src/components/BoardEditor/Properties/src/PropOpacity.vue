<template>
  <property-row :name="name">
    <el-slider v-model="value"  :step="0.1" :max="1" ></el-slider>
  </property-row>
</template>

<script>
import propertyRow from '../../layout'
import vue from 'vue'
propertyRow.install(vue);

export default {
  name:'propOpacity',
  props:{
    propName:String,
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
