<template>
  <property-row :name="name">
    <el-select size="small" v-model="value" @change="setValue"  :placeholder="placeholder" style="width: 90px">
      <el-option v-for="option in options" :label="option.text" :key="option.value" :value="option.value"></el-option>
    </el-select>
  </property-row>
</template>

<script>
  import mixinsProp from "../mixins"
export default {
  name:'propSelect',
  mixins:[mixinsProp],
  props:{
    options:Array,
    placeholder:String,
  },
  data(){
    return{
      value:1
    }
  }
}
</script>
