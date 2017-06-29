<template>
  <v-layout row justify-left class="color-picker">
    <div>
      <v-card-row style="height: 30px;">
      <v-btn floating small icon  class="color-picker__addbtn" @click.native="addColor"><v-icon light>add</v-icon></v-btn>
      <v-btn floating small icon class="color-picker__addbtn" @click.native="removeColor"><v-icon light>remove</v-icon></v-btn>
      </v-card-row>

      <v-card-row class="color_list_row">
        <transition-group name="fade">
        <div class="color-picker__trigger" @click="close(index)" v-for="(color , index) in colorArr" :key="index">
          <span class="color-picker__color" >
            <span class="color-picker__color-inner"  :style="{backgroundColor:colorArr[index]}"></span>
          </span>
        </div>
        </transition-group>
      </v-card-row>
    </div>

    <v-card v-show="dialog" class="color-picker__panel">
      <v-card-row>
        <sketch-picker v-model="colors" class="color-picker__picker"></sketch-picker>
      </v-card-row>
      <v-card-row class="color-picker__control-btn">
        <v-btn dark default class="btn--dark-flat-pressed z-depth-2" @click.native.stop="clean">清空</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark default class="btn--dark-flat-pressed z-depth-2" @click.native.stop="close(null)">确定</v-btn>
      </v-card-row>
    </v-card>
  </v-layout>
</template>
<style>
  body{background-color: #373941}
 .color-picker .color-picker__addbtn{width: 22px; display: block; height: 22px;clear: both; border:solid 2px #fff;
    color: #fff; margin:5px 5px 0px 5px;
  }
  .color-picker .color-picker__trigger { margin:4px 5px 5px 4px}
  .color-picker__colorList{width: 100%; display: block;height:40px}
  .color-picker .color-picker__trigger .color-picker__color{
      width: 22px; height: 22px;}
  .color-picker .color-picker__trigger .color-picker__color .color-picker__color-inner{
    border-radius:50%;border:solid 1px #fff;
  }
  .color_list_row{flex-flow: row wrap}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
<script>
  import { Sketch } from 'vue-color'
  import { toHex } from '@/utils';

  export default{
    name: "ColorPickerList",
    components: {
      SketchPicker: Sketch
    },
    props: {
      value: Array,
    },
    watch:{
      value(val){
          this.colorArr = val;
      },
      colors(val){
        let rgba = val.rgba;
        this.colorArr[this.key] = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
      }
    },
    data(){
      return {
        hex: false,
        dialog: false,
        colors:  this.transfer(this.value),
        colorArr:[],
        key:0
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
      close(index){
        if(index||index>=0){
            this.key = index;
        }
        this.dialog = !this.dialog;
        this.$emit("input", this.colorArr);
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
      },
      addColor(){
          this.colorArr.push('#B92C3E');
          this.$emit("input", this.colorArr);
      },
      removeColor(){
         this.colorArr.splice(this.colorArr.length-1,1);
         this.$emit("input", this.colorArr);
      }
    }
  }
</script>
