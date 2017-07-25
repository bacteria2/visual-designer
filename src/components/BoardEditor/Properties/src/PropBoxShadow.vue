<template>
  <property-row :name="name">
    <color-picker :value="color" @input="setValue"  :rectangle="true"></color-picker>
    <!--<el-checkbox v-model="checked" style="float: left">内阴影</el-checkbox>-->
    <el-radio-group v-model="inset" size="small" fill="#0faedb" style="float: left;margin:0px 100px 0 10px">
      <el-radio-button  label="">外阴影</el-radio-button>
      <el-radio-button  label="inset ">内阴影</el-radio-button>
    </el-radio-group>

    <label class="number_input_label first_lable">水平：</label>
    <el-input-number size="small" v-model="hShadow" class="input_number" ></el-input-number>

    <label class="number_input_label ">垂直：</label>
      <el-input-number size="small" v-model="vShadow"  class="input_number"  ></el-input-number>

    <label class="number_input_label first_lable">模糊：</label>
      <el-input-number size="small" v-model="blur"  :min="0" class="input_number"></el-input-number>

    <label class="number_input_label ">尺寸：</label>
      <el-input-number size="small" v-model="spread"  :min="0" class="input_number"></el-input-number>

  </property-row>
</template>
<style scoped>
  .first_lable{ width: 70px !important; text-align: left!important;}
  .number_input_label {
    text-align: center;
    width: 80px;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: rgb(72, 88, 106);
    line-height: 1;
    padding: 11px 0;
    box-sizing: border-box;}
  .input_number {float: left;width: 100px; margin-top: 3px;}
</style>
<script>

export default {
  name:'PropBoxShadow',
  props:{
    propName:String,
    model:Object,
    name:String,
  },
  mounted(){
    this.initValue();
  },
  watch:{
    model(){
      this.initValue();
    },
    hShadow(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
        this.model.count++;
      }
    },
    vShadow(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
        this.model.count++;
      }
    },
    blur(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
        this.model.count++;
      }
    },
    spread(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
        this.model.count++;
      }
    },
    inset(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
      }
    }
  },
  data(){
    return{
      inset:'inset',
      value:"",
      hShadow:null,
      vShadow:null,
      blur:null,
      spread:null,
      color:"",
      inset:"",
    }
  },
  methods:{//获取颜色值
    setValue(e){
      this.color=e;
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
        this.model.count++;
      }
    },
    initValue(){
      if(this.model&&this.propName){
        let boxShadow=this.model[this.propName];
        if(boxShadow){
          boxShadow=boxShadow.trim();
          let strs=boxShadow.split(" "); //按空格号切割
          this.hShadow=parseInt(strs[0]);//取整数，去掉单位
          this.vShadow=parseInt(strs[1]);//取整数，去掉单位
          this.blur=parseInt(strs[2]);//取整数，去掉单位
          this.spread=parseInt(strs[3]);//取整数，去掉单位
          this.color=strs[4]?strs[4]:"";//当有颜色值时为颜色值，否则为空
          this.inset=strs[5]?strs[5]:"";//默认外阴影，值为空
        }else{
          this.hShadow = 0;
          this.vShadow = 0;
          this.blur = 0;
          this.spread = 0;
          this.color = 'rgba(0,0,0,0.5)';
          this.inset = "";
        }
      }
    }
  }

}
</script>
