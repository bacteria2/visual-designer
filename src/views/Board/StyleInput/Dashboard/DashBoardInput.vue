<template>
  <common-input title="页面设置">
    <el-collapse :value="['1','2']">
      <el-collapse-item title="页面尺寸" name="1">
        <div class="input_item" style="margin-top:12px;justify-content: center">
          <mu-raised-button class="demo-raised-button" label="1360x760" :backgroundColor="1==activeSize?'#0faedb':''"
                            @click="targetObj.style.width=1360;targetObj.style.height=760;sizeCustom=false"></mu-raised-button>
          <mu-raised-button class="demo-raised-button" label="1920x1080"  :backgroundColor="2==activeSize?'#0faedb':''"
                            @click="targetObj.style.width=1920;targetObj.style.height=1080;sizeCustom=false"></mu-raised-button>
          <mu-raised-button class="demo-raised-button" label="4096x2160" :backgroundColor="3==activeSize?'#0faedb':''"
                            @click="targetObj.style.width=4096;targetObj.style.height=2160;sizeCustom=false"></mu-raised-button>
          <mu-raised-button class="demo-raised-button" label="自定义" :backgroundColor="4==activeSize?'#0faedb':''"
                            @click="sizeCustom=true"></mu-raised-button>
        </div>
        <div class="input_item">
          <label class="input_label">屏幕大小:</label>
          <el-input-number size="small" :disabled="!sizeCustom" :min="1" :max="9999" :step="1" :controls="false" style="width: 120px;"
                           v-model="targetObj.style.width"></el-input-number>
          <div style="width: 16px"></div>
          <el-input-number size="small" :disabled="!sizeCustom" :min="1" :max="99999" :step="1" :controls="false" style="width: 120px;"
                           v-model="targetObj.style.height"></el-input-number>
        </div>
        <div class="input_item" style="color: #bdbdbd;position: relative">
          <label class="input_label" style="padding-top:0;position: absolute;left: 20%;">宽(:px)</label>
          <label class="input_label" style="padding-top:0;position: absolute;left: 50%;">高(:px)</label>
        </div>
        <property-row name="编辑网格:">
          <el-radio-group v-model="targetObj.showGrid" size="small" fill="#0faedb" style="float: left;margin:0 0 10px 0px">
            <el-radio-button  :label="true">显示网格</el-radio-button>
            <el-radio-button  :label="false">隐藏网格</el-radio-button>
          </el-radio-group>
        </property-row>
      </el-collapse-item>

      <el-collapse-item title="边框和背景" name="2">
        <prop-border-group name="边框:" :model="targetObj.style"></prop-border-group>
        <prop-number name="圆角:" :model="targetObj.style" propName="borderRadius" :step="0.5" :min="0" ></prop-number>
        <prop-color name="背景颜色:" :model="targetObj.style" propName="backgroundColor" ></prop-color>
        <prop-background-img name="背景图片:" :model="targetObj.style" :id="targetObj.id" ></prop-background-img>
      </el-collapse-item>

    </el-collapse>
  </common-input>
</template>
<script>
  import CommonInput from '../Common';
  import PropBackgroundImg from "../../../../components/BoardEditor/Properties/src/PropBackgroundImg.vue";

  export default{
    components: {
      PropBackgroundImg,
      CommonInput},
    name: "DashBoardInput",
    props: {
      targetObj: {
        type: Object,
        default(){
          return {
            style: {
              height: 1080,
              width: 1920,
              backgroundColor: null,
              borderColor: null,
              borderWidth: null,
              borderStyle: null,
              borderRadius: 0,
              imgUrl: null
            },
            containers: {}, layouts: [],
          }
        }
      },
      componentId: [String, Number]
    },
    computed:{
      activeSize(){
       let w=  this.targetObj.style.width,h=this.targetObj.style.height;
       let type={"1360x760":1,"1920x1080":2,"4096x2160":3}[`${w}x${h}`];
       return this.sizeCustom?4:type
      }
    },
    watch:{
      'targetObj.style.height'(val){
        this.$emit("sizeReset")
      },
      'targetObj.style.width'(val){
        this.$emit("sizeReset")
      }
    },
    data(){
      return {
        sizeCustom: false,
        activeList: '1',
      }
    },
    methods: {
      handleAvatarSuccess(resp){
        if (resp.success){
          this.targetObj.style.imgUrl =  resp.data.url;
        }
      },
    }
  }
</script>
