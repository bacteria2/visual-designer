<template>
  <property-row :name="name">
    <el-upload class="avatar-uploader"
               action="http://192.168.40.34:8080/ydp-visual-web/ydp/visual/upload/fileUpload.do"
               :multiple="false"
               :show-file-list="false" name="files" :data="{dashboardId:'222222'}"
               :on-success="handleAvatarSuccess">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="input_item" style="position: relative;height: 28px;">
      <mu-raised-button style="position: absolute;left:0;top: 10px;"
                        label="移除图片"  @click="removeImage"></mu-raised-button>
    </div>
  </property-row>
</template>
<style>
  .mu-raised-button{
    background:#0faedb!important;
    color: #ffffff;
  }
</style>
<script>

export default {
  name:'propUpload',
  props:{
    propName:String,
    model:Object,
    name:String
  },
  mounted(){
    if(this.model&&this.propName){
      this.value = this.model[this.propName];
    }
  },
//  watch:{
//    value(e){
//      if(this.model&&this.propName){
//        this.model[this.propName] = e;
//      }
//    }
//  },
  data(){
    return{
      value:1
    }
  },
  computed:{
    imageUrl(){
      return  this.model[this.propName]
    }
  },
  methods:{
    handleAvatarSuccess(resp){
      if (resp.success){
        this.model[this.propName] = resp.data.url;
      }
    },
    removeImage(){
      this.model[this.propName]=null;
    }
  }

}
</script>
