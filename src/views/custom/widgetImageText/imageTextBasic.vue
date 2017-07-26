<template>
  <div class="widget-table">
    <subheader text="图片容器样式"/>
    <property-switch label="图片容器宽度" option-key="imageBox.style.width" :ui="['number-%','number-px']" :min="0" :max="1000" :step="1"></property-switch>
    <property-number label="图片容器高度"  unit="px" option-key="imageBox.style.height" ></property-number>
    <property-number label="图片容器行高"  unit="px" option-key="imageBox.style.line-height" ></property-number>
    <property-color label="图片容器背景"   option-key="imageBox.style.background"></property-color>
    <property-select label="图片容器位置"  option-key="imageBox.style.float"
                     :options="[{text:'左',value:'left'},{text:'右',value:'right'}]">
    </property-select>
    <property-number label="边框粗细" unit="px" option-key="imageBox.style.borderWidth" :min="0" :max="30" :step="1"></property-number>
    <property-color label="边框颜色" option-key="imageBox.style.borderColor"></property-color>
    <property-select label="线条类型" option-key="imageBox.style.borderStyle" :options="[
          {text:'实线',value:'solid'},
          {text:'点状线',value:'dotted'},
          {text:'虚线',value:'dashed'}
    ]"></property-select>
    <property-switch label="圆角" option-key="imageBox.style.border-radius" :ui="['number-%','number-px']" :min="0" :max="30" :step="1"></property-switch>
    <property-number label="内边距(上)"  unit="px" option-key="imageBox.style.padding-top" ></property-number>
    <property-number label="内边距(右)"  unit="px" option-key="imageBox.style.padding-right" ></property-number>
    <property-number label="内边距(下)"  unit="px" option-key="imageBox.style.padding-bottom" ></property-number>
    <property-number label="内边距(左)"  unit="px" option-key="imageBox.style.padding-left" ></property-number>
    <divider/>
    <subheader text="图片样式"/>
    <property-switch label="图片宽度" option-key="imageBox.imgStyle.width" :ui="['number-px','number-%']" :min="0" :max="1000" :step="1"></property-switch>
    <property-switch label="图片高度" option-key="imageBox.imgStyle.height" :ui="['number-px','number-%']" :min="0" :max="1000" :step="1"></property-switch>
    <property-text label="上传图片"    option-key="imageBox.imgStyle.imgUrl" ></property-text>
    <property-select label="水平对齐" option-key="imageBox.style.text-align" :options="[
          {text:'左',value:'left'},
          {text:'中',value:'center'},
          {text:'右',value:'right'}
    ]"></property-select>
    <property-select label="垂直对齐" option-key="imageBox.imgStyle.vertical-align" :options="[
          {text:'左',value:'left'},
          {text:'中',value:'center'},
          {text:'右',value:'right'}
    ]"></property-select>
    <divider/>

    <subheader text="文本容器样式"/>
    <property-switch label="文本容器宽度" option-key="textBox.style.width" :ui="['number-%','number-px']" :min="0" :max="1000" :step="1"></property-switch>
    <property-number label="文本容器高度"  unit="px" option-key="textBox.style.height" ></property-number>
    <property-color label="文本容器背景"   option-key="textBox.style.background"></property-color>
    <property-color label="文本颜色"   option-key="textBox.style.color"></property-color>
    <property-number label="字体大小"  unit="px" option-key="textBox.style.font-size" :min="10"></property-number>
    <property-text label="字体系列"    option-key="textBox.style.font-family" ></property-text>
    <property-select label="字体样式"  option-key="textBox.style.font-style"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
    </property-select>
    <property-select label="字体粗细"  option-key="textBox.style.font-weight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <property-number label="边框粗细" unit="px" option-key="textBox.style.border-width" :min="0" :max="30" :step="1"></property-number>
    <property-color label="边框颜色" option-key="textBox.style.border-color"></property-color>
    <property-select label="线条类型" option-key="textBox.style.border-style" :options="[
          {text:'实线',value:'solid'},
          {text:'点状线',value:'dotted'},
          {text:'虚线',value:'dashed'}
    ]"></property-select>
    <property-switch label="圆角" option-key="textBox.style.border-radius" :ui="['number-%','number-px']" :min="0" :max="30" :step="1"></property-switch>
    <property-number label="内边距(上)"  unit="px" option-key="textBox.style.padding-top" ></property-number>
    <property-number label="内边距(右)"  unit="px" option-key="textBox.style.padding-right" ></property-number>
    <property-number label="内边距(下)"  unit="px" option-key="textBox.style.padding-bottom" ></property-number>
    <property-number label="内边距(左)"  unit="px" option-key="textBox.style.padding-left" ></property-number>

    <subheader text="标题样式"/>
    <property-text label="标题内容"    option-key="textBox.data.title" ></property-text>
    <property-switch label="标题宽度" option-key="textBox.titleStyle.width" :ui="['number-%','number-px']" :min="0" :max="1000" :step="1"></property-switch>
    <property-number label="标题高度"  unit="px" option-key="textBox.titleStyle.height" ></property-number>
    <property-color label="标题背景"   option-key="textBox.titleStyle.background"></property-color>
    <property-color label="标题文本颜色"   option-key="textBox.titleStyle.color"></property-color>
    <property-number label="标题字体大小"  unit="px" option-key="textBox.titleStyle.font-size" :min="10"></property-number>
    <property-text label="标题字体系列"    option-key="textBox.titleStyle.font-family" ></property-text>
    <property-select label="标题字体样式"  option-key="textBox.titleStyle.font-style"
                     :options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
    </property-select>
    <property-select label="标题字体粗细"  option-key="textBox.titleStyle.font-weight"
                     :options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]"></property-select>
    <property-number label="标题边框粗细" unit="px" option-key="textBox.titleStyle.borderWidth" :min="0" :max="30" :step="1"></property-number>
    <property-color label="标题边框颜色" option-key="textBox.titleStyle.borderColor"></property-color>
    <property-select label="标题线条类型" option-key="textBox.titleStyle.borderStyle" :options="[
          {text:'实线',value:'solid'},
          {text:'点状线',value:'dotted'},
          {text:'虚线',value:'dashed'}
    ]"></property-select>
    <property-switch label="标题圆角" option-key="textBox.titleStyle.border-radius" :ui="['number-%','number-px']" :min="0" :max="30" :step="1"></property-switch>
    <property-number label="标题内边距(上)"  unit="px" option-key="textBox.titleStyle.padding-top" ></property-number>
    <property-number label="标题内边距(右)"  unit="px" option-key="textBox.titleStyle.padding-right" ></property-number>
    <property-number label="标题内边距(下)"  unit="px" option-key="textBox.titleStyle.padding-bottom" ></property-number>
    <property-number label="标题内边距(左)"  unit="px" option-key="textBox.titleStyle.padding-left" ></property-number>
    <property-number label="标题外边距(上)"  unit="px" option-key="textBox.titleStyle.margin-top" ></property-number>
    <property-number label="标题外边距(右)"  unit="px" option-key="textBox.titleStyle.margin-right" ></property-number>
    <property-number label="标题外边距(下)"  unit="px" option-key="textBox.titleStyle.margin-bottom" ></property-number>
    <property-number label="标题外边距(左)"  unit="px" option-key="textBox.titleStyle.margin-left" ></property-number>
    <divider/>
    <subheader text="描述文本"/>
    <property-text label="描述内容"    option-key="textBox.data.des" ></property-text>
  </div>
</template>
<script>
  export default {
    name:'ImageTextBasic',
  }
</script>


