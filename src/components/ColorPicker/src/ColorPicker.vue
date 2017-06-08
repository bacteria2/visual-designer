<template>
  <v-layout row justify-center>
    <div class="color-picker">
      <div class="color-picker__trigger">
        <span class="color-picker__color">
          <span class="color-picker__color-inner" style="background-color: rgb(92, 158, 211);"></span><!---->
        </span>
      </div>
    </div>
    <div v-show="dialog">
      <sketch-picker v-model="textColors"></sketch-picker>
    </div>
  </v-layout>
</template>
<style scoped lang="scss">
  .color-picker{
    display: inline-block;
    position: relative;
    .color-picker__trigger {
      display: inline-block;
      box-sizing: border-box;
      height: 36px;
      padding: 6px;
      border: 1px solid #bfcbd9;
      border-radius: 4px;
      font-size: 0;
      .el-color-picker__color {
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        border: 1px solid #666;
        width: 22px;
        height: 22px;
        text-align: center;
        .el-color-picker__color-inner {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
<script>
  import { Sketch } from 'vue-color'

  export default{
    name: "ColorPicker",
    components: {
      SketchPicker: Sketch
    },
    props: {
      color: {
        String,
        defaultValue: "#336953"
      }
    },
    data(){
      return {
        dialog: false,
        textColors: "#336953",
        msg: 'hello vue'
      }
    },
    methods: {
      close(){
        this.dialog = false;
        this.$emit("ok", this.textColors);
      }
    }
  }
</script>
