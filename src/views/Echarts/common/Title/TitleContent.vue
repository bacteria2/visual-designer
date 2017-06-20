<template>
  <div>
    <property-select label="是否显示标题组件" option-key="title.show"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <property-text   label="主标题文本"  option-key="title.text" :disabled="true"></property-text>
    <property-text   label="主标题文本超链接"  option-key="title.link"></property-text>
    <property-select label="指定窗口打开主标题超链接" option-key="title.target"
                     :options="[{text:'当前窗口打开',value:'self'},{text:'新窗口打开',value:'blank'}]"></property-select>
    <property-text label="副标题文本"        option-key="title.subtext"></property-text>
    <property-text label="副标题文本超链接"  option-key="title.sublink" ></property-text>
    <property-select label="指定窗口打开副标题超链接" option-key="title.subtarget" :options="[{text:'当前窗口打开',value:'self'},{text:'新窗口打开',value:'blank'}]"></property-select>
  </div>
</template>
<script>
  export default {
    name:'EchartsTitleContent',
  }
</script>
