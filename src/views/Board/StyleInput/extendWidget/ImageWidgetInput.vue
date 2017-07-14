<template>
  <common-input title="图片组件设置">
    <el-collapse :value="['1']">
      <el-collapse-item title="图片样式" name="1">
        <el-form-item label="上传图片:">
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
                            label="移除图片"  @click="targetObj.style.imgUrl=null;"></mu-raised-button>
        </div>
        <el-form-item label="圆角:">
          <el-input-number v-model="targetObj.style.borderRadius" :step="0.5" :min="0" :max="25"></el-input-number>
        </el-form-item>
        <el-form-item label="透明度:">
          <el-input-number v-model="targetObj.style.opacity" :step="0.1" :min="0" :max="1"></el-input-number>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </common-input>
</template>
<script>
  import CommonInput from '../Common';

  export default{
    name: "ImageWidgetInput",
    components: {
        CommonInput,
    },
    props: {
      targetObj: {
        type: Object,

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
      }
    },
    methods: {
      handleAvatarSuccess(resp){
        if (resp.success){
          this.targetObj.style.imgUrl =  resp.data.url;
        }
      }
    }
  }
</script>
