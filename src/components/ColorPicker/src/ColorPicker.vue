<template>
  <v-layout row justify-left class="color-picker">
    <div class="color-picker__trigger" @click="close">
        <span class="color-picker__color">
          <span class="color-picker__color-inner" :style="{backgroundColor:backgroundColor}"></span>
        </span>
    </div>
    <v-card v-show="dialog" class="color-picker__panel">
      <v-card-row>
        <sketch-picker v-model="colors" class="color-picker__picker"></sketch-picker>
      </v-card-row>
      <v-card-row class="color-picker__control-btn">
        <v-btn dark default class="btn--dark-flat-pressed z-depth-2" @click.native.stop="clean">清空</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark default class="btn--dark-flat-pressed z-depth-2" @click.native.stop="close">确定</v-btn>
      </v-card-row>
    </v-card>
  </v-layout>
</template>
<script>
  import { Sketch } from 'vue-color'
  import { toHex } from '@/utils';

  export default{
    name: "ColorPicker",
    components: {
      SketchPicker: Sketch
    },
    props: {
      value: String,
    },
    watch:{
      value(val){
        this.colors=this.transfer(val);
      }
    },
    computed: {
      backgroundColor(){
        //如果使用16进制颜色代码则返回color.hex
        if (this.hex) {
          return this.colors.hex
        }
        //否则返回rgba字符串
        let rgba = this.colors.rgba
        return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    },
    data(){
      return {
        hex: false,
        dialog: false,
        colors:  this.transfer(this.value),
      }
    }
    ,
    methods: {
      transfer(value){
        let defaultProps = {
          hex: "#B92C3E",
          a: 1,
          rgba: {
            r: 185, g: 44, b: 62, a: 1
          }
        };
        //如果使用16进制颜色代码则赋值给hex
        if (value) {
          if (value.startsWith("#")) {
            defaultProps.hex = value;
            this.hex = true;
          }
          else {
            let subIndex = value.indexOf("(");
            let subEnd = value.length;
            let attrs;
            //输入值包含rgba值
            if (subIndex !== -1 && subEnd > 1) {
              attrs = value.substring(subIndex + 1, subEnd - 1).split(",");
              defaultProps.rgba = {
                r: attrs[0],
                g: attrs[1],
                b: attrs[2],
                a: attrs[3]
              }
              defaultProps.hex = toHex(defaultProps.rgba);
              defaultProps.a = attrs[3];
            }
          }
        }
        return defaultProps;
      },
      close(){
        this.dialog = !this.dialog;
        this.$emit("input", this.backgroundColor);
      }
      ,
      //清空颜色
      clean(){
        this.dialog = !this.dialog;
        this.colors = {
          hex: "#b9b6b3",
          a: 1,
          rgba: {
            r: 185, g: 182, b: 179, a: 1
          }
        };
        this.$emit("input", "");
      }
    }
  }
</script>
