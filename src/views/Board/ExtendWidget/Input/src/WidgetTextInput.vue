<template>
  <div>
    <prop-textarea name="文本内容:" :model="styles" propName="text" ></prop-textarea>
    <prop-color name="字体颜色" :model="styles" propName="color"></prop-color>
    <prop-number name="字体大小:" :model="styles" propName="fontSize" :step='1' :min='10'></prop-number>
    <prop-select name="字体:" :model="styles" propName="fontFamily" placeholder="请选择" :options="[{text:'默认字体',value:'Helvetica'},{text:'微软雅黑',value:'Microsoft YaHei'},{text:'宋体',value:'SimSun'}]"></prop-select>
    <prop-group name="字体样式" :model="styles"></prop-group>
    <div class="input_item">
      <!--<label class="input_label">字体:</label>-->
      <!--<el-color-picker size="small"   v-model="styles.color"></el-color-picker>-->
      <!--<el-input-number size="small" v-model="styles.fontSize" style="margin-left: 12px;width: 80px;" :step="1" :controls="false" :min="10"></el-input-number>-->
      <!--<el-select size="small" v-model="styles.fontFamily" style="margin-left: 12px;width:120px" placeholder="默认字体"
                 value="Helvetica">
        <el-option label="默认字体" value="Helvetica"></el-option>
        <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
        <el-option label="宋体" value="SimSun"></el-option>
      </el-select>-->
    </div>
    <el-form-item label="粗体:" >
      <el-select size="small" v-model="styles.fontWeight" style="margin-left: 12px;width:120px" placeholder="正常"
                 value="normal">
        <el-option label="正常" value="normal"></el-option>
        <el-option label="加粗" value="bold"></el-option>
        <el-option label="更粗" value="bolder"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="斜体:" >
      <el-select size="small" v-model="styles.fontStyle" style="margin-left: 12px;width:120px" placeholder="正常"
                 value="normal">
        <el-option label="正常" value="normal"></el-option>
        <el-option label="斜体" value="italic"></el-option>
        <el-option label="倾斜" value="oblique"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="下划线:" >
      <el-select size="small" v-model="styles.textDecoration" style="margin-left: 12px;width:120px" placeholder="无下划线"
                 value="none">
        <el-option label="无下划线" value="none"></el-option>
        <el-option label="下划线" value="underline"></el-option>
        <el-option label="删除线" value="line-through"></el-option>
        <el-option label="上划线" value="overline"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="水平对齐:" >
      <el-select size="small" v-model="styles.textAlign" style="margin-left: 12px;width:120px" placeholder="左对齐"
                 value="left">
        <el-option label="左对齐" value="left "></el-option>
        <el-option label="右对齐" value="right"></el-option>
        <el-option label="居中" value="center "></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="透明度:">
      <el-slider v-model="styles.opacity" :step="0.1" :max="1" ></el-slider>
    </el-form-item>
  </div>
</template>

<script>
  export default{
    name: "WidgetTextInput",
    props: {
      styles:Object,
      options:Array
    }
  }
</script>
