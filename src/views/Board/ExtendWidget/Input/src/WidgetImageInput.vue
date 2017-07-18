<template>
  <div>
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
                        label="移除图片"  @click="styles.imgUrl=null;"></mu-raised-button>
    </div>
    <el-form-item label="背景颜色:">
      <el-color-picker v-model="styles.backgroundColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="透明度:">
      <el-slider v-model="styles.opacity" :step="0.05" :min="0" :max="1"></el-slider>
    </el-form-item>
  </div>
</template>
<style>
</style>
<script>
  export default{
    name: "WidgetImageInput",
    props: {
      styles: {
        type: Object
      },
      options: {
        type: Object
      }
    },
    computed:{
      imageUrl(){
        return  this.styles.backgroundImage
      }
    },
    methods:{
      handleAvatarSuccess(resp){
        if (resp.success){
          this.styles.backgroundImage = resp.data.url;
        }
      }
    }
  }
</script>
