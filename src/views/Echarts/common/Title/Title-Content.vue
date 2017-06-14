<template>

  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <Property label="是否显示标题组件"   ui="select" v-model="title.show"  :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></Property>
    <Property label="主标题文本"  ui="text" v-model="title.text" ></Property>
    <Property label="主标题文本超链接"  ui="text" v-model="title.link" ></Property>
    <Property label="指定窗口打开主标题超链接，可选"  ui="text" v-model="title.target"  :options="[{text:'当前窗口打开',value:'self'},{text:'新窗口打开',value:'blank'}]"></Property>
    <Property label="副标题文本"  ui="text" v-model="title.subtext" ></Property>
    <Property label="副标题文本超链接"  ui="text" v-model="title.sublink" ></Property>
    <Property label="指定窗口打开副标题超链接，可选："  ui="text" v-model="title.subtarget" :options="[{text:'当前窗口打开',value:'self'},{text:'新窗口打开',value:'blank'}]"></Property>

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
