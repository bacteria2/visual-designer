<template>
  <div class="color-picker">
    <div>
      <div class="card__row" style="height: 30px;">

      <button  type="button" :class="{'color-picker__addbtn':true,'btnDisable':disabled}" class="colorList_btn" @click="addColor">
        <i  class="material-icons colorList_icon">add</i>
      </button>

      <button type="button" :class="{'color-picker__addbtn':true,'btnDisable':disabled}" class="colorList_btn" @click="removeColor">
        <i class="material-icons colorList_icon">remove</i>
      </button>

      </div>
      <div class="card__row color_list_row" v-show="!disabled">
        <transition-group name="fade">
        <div :class="isGaugeColors?'color-picker__trigger gauge-colors':'color-picker__trigger'" v-for="(color , index) in colorArr_comp" :key="index">
          <input v-if="isGaugeColors" type="number" v-model.lazy="gaugePercents[index]"/>
          <span class="color-picker__color" >
            <span class="color-picker__color-inner" @click="close($event,index)" :style="{backgroundColor:disabled?'#8C8C8C':colorArr_comp[index],cursor:disabled?'not-allowed':'pointer'}"></span>
          </span>
        </div>
        </transition-group>
      </div>
    </div>

    <transition enter-active-class="flipInX" leave-active-class="flipOutY">
      <div v-if="open" :style="computedStyle" class="color-picker__panel animated" ref="popup">
        <sketch-picker v-model="colors" class="color-picker__picker"></sketch-picker>
      </div>
    </transition>

  </div>
</template>
<style scoped>
  button:focus{
    outline: none;
  }
  .colorList_btn {border-radius: 50%;color: #8C8C8C;line-height: 22px;}
  .colorList_icon { font-size: 18px;}
 .color-picker .color-picker__addbtn{width: 22px; display: block; height: 22px;clear: both; border:solid 2px #8C8C8C;
    color:#8C8C8C; margin:5px 0px 0px 10px;
  }
  .color-picker .color-picker__trigger { margin:4px 0px 5px 10px}
  .color-picker__colorList{width: 100%; display: block;height:40px}
  .color-picker .color-picker__trigger .color-picker__color{
      width: 22px; height: 22px;}
  .color-picker .color-picker__trigger .color-picker__color .color-picker__color-inner{
    border-radius:50%;border:solid 1px #fff;
  }
  .color-picker  .btnDisable {
    border:solid 2px #fff;color: #fff;cursor:not-allowed;
  }
  .color_list_row{flex-flow: row wrap}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  .card__row {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: auto;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    min-height: 36px;
  }
  .gauge-colors{
    display: flex;
    height: 22px !important;
  }
  .gauge-colors .color-picker__color .color-picker__color-inner{
    border-radius:0 !important;
    border-top:solid 1px #a9a9a9 !important;
    border-right:solid 1px #a9a9a9 !important;
    border-bottom:solid 1px #a9a9a9 !important;
    border-left: 1px !important;;
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
      },
      isGaugeColors:{type:Boolean,default:false}
    },
    mounted(){
        if(!this.value || this.value.length < 1){
          return
        }
        if(this.isGaugeColors){
          this.colorArr = this.value.map(v=>{
              this.gaugePercents.push(v[0])
              return v[1]
          })
        }else{
          this.colorArr = this.value
        }
    },
    watch:{
     /* value(val){
          this.colorArr = val;
      },*/
      colors(val){
        let rgba = val.rgba,
          value = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
          this.colorArr.splice(this.key,1,value) //触发更新事件
        //this.colorArr[this.key] = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
      },
      disabled(disable){
        if(disable){
          this.dialog=false;
          //this.colorArr = [];
        }
      },
      open(e){
        if(!e){
          this.$emit('input',this.colorList)
        }
      },
      gaugePercents(val){
        this.$emit('input',this.colorList)
      }
    },
    data(){
      return {
        isDisabled:this.disabled,
        hex: false,
        dialog: false,
        colors:  this.transfer('#8C8C8C'),
        colorArr:[],
        key:0,
        left:100,
        top:100,
        gaugePercents:[]
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

      colorList(){
          let cl = [];
          if(this.isGaugeColors){
               this.colorArr.forEach((c,index)=>{
                  cl.push([this.gaugePercents[index],c])
              })
          }else{
              cl = this.colorArr
          }
          return cl
      }
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
        this.$emit("input", this.colorList);
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
        this.$emit("input", this.colorList);
      },
      addColor(){
          if(this.disabled) return; //禁用
          this.colorArr.push('#B92C3E');
          if(this.isGaugeColors){
              this.gaugePercents.push(0.2)
          }
          this.$emit("input", this.colorList);
      },
      removeColor(){
         if(this.disabled) return; //禁用
         this.colorArr.splice(this.colorArr.length-1,1);
        if(this.isGaugeColors){
          this.gaugePercents.splice(this.gaugePercents.length-1,1)
        }
         this.$emit("input", this.colorList);
      },
      overlayClick(){
        this.open = false;
      },
    }
  }
</script>
