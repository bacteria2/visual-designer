<template>
  <property-row :name="name">
    <el-upload class="avatar-uploader"
               :action="uploadServer"
               :multiple="false"
               :show-file-list="false" name="files" :data="{dashboardId:id}"
               :on-success="handleAvatarSuccess">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="input_item" style="position: relative;height: 28px;">
      <mu-raised-button style="position: absolute;left:0;top: 10px;"
                        label="移除图片" backgroundColor="#0faedb"  @click="removeImage"></mu-raised-button>
    </div>
  </property-row>
</template>
<script>
  import store from "@/store"
export default {
  name:'propUpload',
  props:{
    propName:String,
    model:Object,
    name:String,
    id:[String,Number]
  },
  mounted(){
    if(this.model&&this.propName){
      this.value = this.model[this.propName];
    };
    this.uploadServer = BoardGroble.config.uploadServer;
  },
  data(){
    return{
      value:undefined,
      uploadServer:''
    }
  },
  methods:{
    handleAvatarSuccess(resp){
      if (resp.success){
        this.model[this.propName] = resp.data.url;
        this.value = resp.data.url;
        this.render();
      }
    },
    removeImage(){
      this.model[this.propName]=null;
      this.value = undefined;
      this.render();
    },
    render(){
      this.model.count++;
      let editExtendObj = null;
      store.dispatch("getEditExtendObj").then(data=>{
        if(data){
          data.render();
        }
      });
    }
  }

}
</script>
