<template>
<div>
    <el-form-item label="背景颜色:">
      <el-color-picker v-model="styles.backgroundColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="透明度:">
     <el-slider v-model="styles.opacity" :step="0.1" :max="1" ></el-slider>
    </el-form-item>
</div>
</template>

<script>
  export default{
    name: "WidgetRectangleInput",
    props: {
      styles: {
        type: Object
      },
      options: {
        type: Object
      }
    }
  }
</script>
