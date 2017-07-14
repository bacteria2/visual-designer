<template>
  <common-input title="图表容器设置">

    <mu-dialog :open="showSelectCharDidget" title="" dialogClass="widget-list-dialog" bodyClass="widget-list-dialogBody">
      <widget-instance-dialog @closeWidgetDialog="showSelectCharDidget=false"  @widgetInstanceSelected="selectChar"></widget-instance-dialog>
    </mu-dialog>

    <el-collapse :value="['1','2','3']">
      <el-collapse-item title="图表选择" name="1">
        <div class="input_item" style="position: relative;height: 28px;">
          <mu-raised-button style="position:absolute;left: 80px;top: 0;" backgroundColor="#0faedb"
                            @click="showSelectCharDidget=true">
            <span style="font-size:13px">选择图表</span>
          </mu-raised-button>
        </div>
      </el-collapse-item>

      <el-collapse-item title="边框和背景" name="2">
        <div class="input_item">
          <label class="input_label">边框线:</label>
          <el-color-picker size="small"   v-model="targetObj.style.borderColor"></el-color-picker>
          <el-input-number size="small" v-model="targetObj.style.borderWidth" style="margin-left: 12px;width: 80px;" :step="0.5" :controls="false" :min="0" :max="25"></el-input-number>
          <el-select size="small" v-model="targetObj.style.borderStyle" style="margin-left: 12px;width:120px" placeholder="边框线类型"
                     value="solid">
            <el-option label="实线" value="solid"></el-option>
            <el-option label="虚线" value="dashed"></el-option>
            <el-option label="双线" value="double"></el-option>
            <el-option label="点" value="dotted"></el-option>
          </el-select>
        </div>
        <el-form-item label="圆角:" >
          <el-input-number size="small" v-model="targetObj.style.borderRadius" :step="0.5" :min="0" :max="25"></el-input-number>
        </el-form-item>
        <el-form-item label="背景颜色:">
          <el-color-picker v-model="targetObj.style.backgroundColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="背景图片:">
          <el-upload class="avatar-uploader"
                     action="http://192.168.40.34:8080/ydp-visual-web/ydp/visual/upload/fileUpload.do"
                     :multiple="false"
                     :show-file-list="false" name="files" :data="{dashboardId:targetObj.id}"
                     :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="input_item" style="position: relative;height: 28px;">
          <mu-raised-button style="position: absolute;left: 80px;top: 0"  backgroundColor="#0faedb"
                            @click="targetObj.style.imgUrl=null;"><span style="font-size:13px">移除图片</span></mu-raised-button>
        </div>
      </el-collapse-item>
      <el-collapse-item title="内边距" name="3">
        <el-form-item label="上边距:" >
          <el-input-number size="small" v-model="targetObj.style.paddingTop"  :stop='5' :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="下边距:" >
          <el-input-number size="small" v-model="targetObj.style.paddingBottom"  :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="左边距:" >
          <el-input-number size="small" v-model="targetObj.style.paddingLeft"  :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="右边距:" >
          <el-input-number size="small" v-model="targetObj.style.paddingRight"  :min="0" ></el-input-number>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </common-input>
</template>
<style scoped>
  body {
    font-family: "Microsoft YaHei";
  }
  </style>
<script>
  import CommonInput from '../Common';
  import widgetInstanceDialog  from '@/views/widgetInstance/src/widgetInstancesDialog'

  export default{
    name: "ChartContainerInput",
    components:{
      CommonInput,
      widgetInstanceDialog
    },
    props: {
      targetObj: {
        type: Object
      },
      componentId: [String, Number]
    },
    computed:{
      imageUrl(){
        return  this.targetObj.style.imgUrl
      }
    },
    data(){

      return {
        sizeCustom: false,
        activeList: '1',
        showSelectCharDidget:false
      }
    },
    methods: {
      handleAvatarSuccess(resp){
        if (resp.success){
          this.targetObj.style.imgUrl =  resp.data.url;
        }
      },
      selectChar(data){
        if(data&&data.id&&data.code){
          let container = this.targetObj;
          let originalId = container.chartId;
          container.chartId=data.id;
          container.chartType = data.code;
          if(originalId!=data.id){
            container.perRender();
          }
        }else{
          alert("图标参数不全！");
        }
      }
    }

  }
</script>
