<template>
  <property-row :name="name">
    <el-slider v-model="value" :change="setValue"  :step="0.1" :max="1" ></el-slider>
  </property-row>
</template>

<script>
import propertyRow from '../../layout'
import vue from 'vue'
propertyRow.install(vue);

export default {
  name:'opacity',
  props:{
    key:String,
    model:Object
  },
  mounted(){
    if(this.model&&this.key){
      this.value = this.model[this.key];
    }
  },
  data(){
    return{
      value:'1'
    }
  },
  methods:{
    setValue(value){
      if(this.model&&this.key){
        this.model[this.key] = value;
      }
    }
  }
}
</script>
