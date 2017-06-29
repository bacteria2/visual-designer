<template>
  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <Property label="图的宽带" :value.sync="width" style="margin-top: 15px"></Property>
    <Property label="图的宽带1" unit="%" :value.sync="width1"></Property>
    <Property label="多X轴时本系列使用哪个X轴" unit="度" :value.sync="width2"></Property>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px">
        系列的图形类型
      </v-flex>
      <v-flex xs7>
        <v-text-field light
                      name="input-1"
                      id="testing"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px" elevation-5>
        折线转为平滑曲线
      </v-flex>
      <v-flex xs7>
        <v-text-field light name="input-1" id="testing"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px">
        Focus
      </v-flex>
      <v-flex xs7>
        <v-select label="Select" :items="items" v-model="e3" light item-value="text"></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px">
        Focus
      </v-flex>
      <v-flex xs7>
        <color-picker v-model="rgbaColors"></color-picker>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3 offset-xs1 style="line-height: 58px">
        Focus22
      </v-flex>
      <v-flex xs7>
        <check-group v-model="btnGroup" :options="options"></check-group>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        width: 20,
        width1: 20,
        width2: 20,
        msg: 'hello vue'
      }
    }
  }
</script>
