<template>
  <common-input title="页面设置">
    <el-collapse :value="['1','2','3']">
      <el-collapse-item title="页面尺寸" name="1">
        <div class="input_item" style="margin-top:12px;justify-content: center">
          <mu-raised-button class="demo-raised-button" label="1366x768"
                            @click="dashboard.style.width=1366;dashboard.style.height=768;sizeCustom=false;dashboard.style.scale=1"></mu-raised-button>
          <mu-raised-button class="demo-raised-button" label="1920x1080"  primary
                            @click="dashboard.style.width=1920;dashboard.style.height=1080;sizeCustom=false;dashboard.style.scale=0.6"></mu-raised-button>
          <mu-raised-button class="demo-raised-button" label="4096x2160"  primary
                            @click="dashboard.style.width=4096;dashboard.style.height=2160;sizeCustom=false;dashboard.style.scale=0.3"></mu-raised-button>
          <mu-raised-button class="demo-raised-button" label="自定义"
                            @click="sizeCustom=true"></mu-raised-button>
        </div>
        <div class="input_item">
          <label class="input_label">屏幕大小:</label>
          <el-input-number :disabled="!sizeCustom" :min="100" :max="4096" :step="10" :controls="false" style="width: 120px;"
                           v-model="dashboard.style.width"></el-input-number>
          <div style="width: 16px"></div>
          <el-input-number :disabled="!sizeCustom" :min="100" :max="2160" :step="10" :controls="false" style="width: 120px;"
                           v-model="dashboard.style.height"></el-input-number>
        </div>
        <div class="input_item" style="color: #bdbdbd;position: relative">
          <label class="input_label" style="padding-top:0;position: absolute;left: 20%;">宽(:px)</label>
          <label class="input_label" style="padding-top:0;position: absolute;left: 50%;">高(:px)</label>
        </div>
      </el-collapse-item>

      <el-collapse-item title="边框和背景" name="2">
        <div class="input_item">
          <label class="input_label">边框线:</label>
          <el-color-picker v-model="dashboard.style.borderColor"></el-color-picker>
          <el-input-number v-model="dashboard.style.borderWidth" style="margin-left: 12px;width: 80px;" :step="0.5" :controls="false" :min="0" :max="25"></el-input-number>
          <el-select v-model="dashboard.style.borderStyle" style="margin-left: 12px;width:120px" placeholder="边框线类型"
                     value="solid">
            <el-option label="实线" value="solid"></el-option>
            <el-option label="虚线" value="dashed"></el-option>
            <el-option label="双线" value="double"></el-option>
            <el-option label="点" value="dotted"></el-option>
          </el-select>
        </div>
        <el-form-item label="圆角:">
          <el-input-number v-model="dashboard.style.borderRadius" :step="0.5" :min="0" :max="25"></el-input-number>
        </el-form-item>
        <el-form-item label="背景颜色:">
          <el-color-picker v-model="dashboard.style.backgroundColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="背景图片:">
          <el-upload class="avatar-uploader"
                     action="http://192.168.40.34:8080/ydp-visual-web/ydp/visual/upload/fileUpload.do"
                     :multiple="false"
                     :show-file-list="false" name="files" :data="{dashboardId:'222222'}"
                     :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="input_item" style="position: relative;height: 28px;">
          <mu-raised-button style="position: absolute;left: 80px;top: 0" primary
                            label="移除图片"  @click="dashboard.style.imgUrl=null;"></mu-raised-button>
        </div>
      </el-collapse-item>

      <el-collapse-item title="字体" name="3">
        <el-form-item label="字体颜色:">
          <el-color-picker ></el-color-picker>
        </el-form-item>
        <el-form-item label="字体大小:">
          <el-input-number ></el-input-number>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </common-input>
</template>
<script>
  import CommonInput from '../Common';

  export default{
    components: {CommonInput},
    props: {
      dashboard: {
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
    watch:{
      'dashboard.style.height'(val){
        this.$emit("sizeReset")
      },
      'dashboard.style.width'(val){
        this.$emit("sizeReset")
      }
    },
    name: "DashBoardInput",
    data(){
      return {
        sizeCustom: false,
        imageUrl: null,
        activeList: '1',
      }
    },
    methods: {
      handleAvatarSuccess(resp){
        if (resp.success){
          this.imageUrl = resp.data.url;
          this.dashboard.style.imgUrl =  resp.data.url;
        }
      },
    }
  }
</script>
