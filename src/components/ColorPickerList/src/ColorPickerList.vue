<template>
  <v-layout row justify-left class="color-picker">
    <div>
      <v-card-row style="height: 30px;">
      <v-btn floating small icon  :class="{'color-picker__addbtn':true,'btnDisable':disabled}" @click.native="addColor"><v-icon light>add</v-icon></v-btn>
      <v-btn floating small icon :class="{'color-picker__addbtn':true,'btnDisable':disabled}" @click.native="removeColor"><v-icon light>remove</v-icon></v-btn>
      </v-card-row>
      <v-card-row class="color_list_row">
        <transition-group name="fade">
        <div class="color-picker__trigger" @click="close($event,index)" v-for="(color , index) in colorArr_comp" :key="index">
          <span class="color-picker__color" >
            <span class="color-picker__color-inner"  :style="{backgroundColor:disabled?'#8C8C8C':colorArr_comp[index],cursor:disabled?'not-allowed':'pointer'}"></span>
          </span>
        </div>
        </transition-group>
      </v-card-row>
    </div>

    <transition enter-active-class="flipInX" leave-active-class="flipOutY">
      <div v-if="open" :style="computedStyle" class="color-picker__panel animated" ref="popup">
        <sketch-picker v-model="colors" class="color-picker__picker"></sketch-picker>
      </div>
    </transition>
<!--
    <v-card v-show="dialog" class="color-picker__panel">
      <v-card-row>
        <sketch-picker v-model="colors" class="color-picker__picker"></sketch-picker>
      </v-card-row>
      <v-card-row class="color-picker__control-btn">
       &lt;!&ndash; <v-btn dark default class="btn&#45;&#45;dark-flat-pressed z-depth-2" @click.native.stop="clean">清空</v-btn>&ndash;&gt;
        &lt;!&ndash;  <v-spacer></v-spacer>&ndash;&gt;
        <v-btn dark default class="btn&#45;&#45;dark-flat-pressed z-depth-2" @click.native.stop="close(null)">确定</v-btn>
      </v-card-row>
    </v-card>-->

  </v-layout>
</template>
<style scoped>
  body{background-color: #373941}
 .color-picker .color-picker__addbtn{width: 22px; display: block; height: 22px;clear: both; border:solid 2px #fff;
    color: #fff; margin:5px 0px 0px 10px;
  }
  .color-picker .color-picker__trigger { margin:4px 0px 5px 10px}
  .color-picker__colorList{width: 100%; display: block;height:40px}
  .color-picker .color-picker__trigger .color-picker__color{
      width: 22px; height: 22px;}
  .color-picker .color-picker__trigger .color-picker__color .color-picker__color-inner{
    border-radius:50%;border:solid 1px #fff;
  }
  .color-picker  .btnDisable {
    border:solid 2px #8C8C8C;color: #8C8C8C;cursor:not-allowed;
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
  import {PopupManager,Popup} from '@/utils/Popup'
  export default{
    name: "ColorPickerList",
    mixins:[Popup],
    components: {
      SketchPicker: Sketch
    },
    props: {
      value: Array,
      //默认启用状态
      disabled:{
        type:Boolean,
        default:false,
      }
    },
    watch:{
      value(val){
          this.colorArr = val;
      },
      colors(val){
        let rgba = val.rgba;
        this.colorArr[this.key] = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
      },
      disabled(disable){
        if(disable){
          this.dialog=false;
          this.colorArr = [];
        }
      },
      open(e){
        if(!e){
          this.$emit('input',this.colorArr)
        }
      }
    },
    data(){
      return {
        isDisabled:this.disabled,
        hex: false,
        dialog: false,
        colors:  this.transfer('#8C8C8C'),
        colorArr:this.value,
        key:0,
        left:100,
        top:100,
      }
    },
    computed: {
      colorArr_comp:function(){
          if(!this.disabled){
            return this.colorArr;
          }else{
              return [];
          }
      },

      computedStyle(){
        let style={
          zIndex:this.zIndex,
          position:"absolute",
          left:this.left+'px',
        }
        if(window.innerHeight-this.top<320)
          style.bottom='20px';
        else
          style.top=this.top+'px';
        return style
      },
    }
    ,
    methods: {
      transferColorArr(value){
        let colorArr = [];
        value.forEach(color=>{
          let transferColor = this.transfer(color);
          colorArr.push(transferColor);
        });
        return colorArr;
      },
      transfer(value){
        let defaultProps = {
          hex: "#b9b6b3",
          a: 1,
          rgba: {
            r: 185, g: 44, b: 62, a: 1
          }
        };
        //如果使用16进制颜色代码则赋值给hex
        if (value) {
          console.log('value',value);
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
      close(e,index){
        if(this.disabled) return; //禁用，则不弹窗
        if(index||index>=0){
            this.key = index;
          this.colors=this.transfer(this.colorArr[index])
        }
        this.open = !this.open;
        this.left = (e.pageX || e.clientX + document.documentElement.scrollLeft)+20;
        this.top = (e.pageY || e.clientY + document.documentElement.scrollLeft);
        this.$emit("input", this.colorArr);
      },
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
        this.$emit("input", this.colorArr);
      },
      addColor(){
          if(this.disabled) return; //禁用
          this.colorArr.push('#B92C3E');
          this.$emit("input", this.colorArr);
      },
      removeColor(){
         if(this.disabled) return; //禁用
         this.colorArr.splice(this.colorArr.length-1,1);
         this.$emit("input", this.colorArr);
      },
      overlayClick(){
        this.open = false;
      },
    }
  }
</script>
