<template>
  <property-row :name="name">
    <el-tooltip content="水平阴影,必填" placement="top" effect="light" >
      <el-input-number size="small" v-model="hShadow"  ></el-input-number>
    </el-tooltip>
    <el-tooltip content="垂直阴影,必填" placement="top" effect="light">
      <el-input-number size="small" v-model="vShadow"   ></el-input-number>
    </el-tooltip>
    <el-tooltip content="模糊距离,可选" placement="left" effect="light">
      <el-input-number size="small" v-model="blur"  :min="0" ></el-input-number>
    </el-tooltip>
    <el-tooltip content="阴影尺寸,可选" placement="bottom" effect="light">
      <el-input-number size="small" v-model="spread"  :min="0" ></el-input-number>
    </el-tooltip>
    <color-picker :value="color" @input="setValue" style="margin-right:87px;" :rectangle="true"></color-picker>
    <el-checkbox v-model="checked" style="float: left">内阴影</el-checkbox>
  </property-row>
</template>
<script>
export default {
  name:'PropBoxShadow',
  props:{
    propName:String,
    model:Object,
    name:String,
  },
  mounted(){
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
        }
    }
  },
  watch:{
    hShadow(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
      }
    },
    vShadow(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
      }
    },
    blur(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
      }
    },
    spread(e){
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
      }
    },
    checked(e){
        if(e){
          this.inset="inset";
        }else{
          this.inset="";
        }
      if(this.model&&this.propName){
        this.model[this.propName] =this.hShadow+"px "+this.vShadow+"px "+this.blur+"px "+this.spread+"px "+this.color+" "+this.inset;
      }
    }
  },
  data(){
    return{
      checked:false,
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
      }
    }
  }

}
</script>
