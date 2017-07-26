<template>
  <property-row :name="name">
    <el-upload class="avatar-uploader"
               :action="uploadServer"
               :multiple="false"
               :show-file-list="false" name="files" :data="{dashboardId:id}"
               :on-success="handleAvatarSuccess" style=" margin-bottom:15px"
               @mouseover.native="deleteHandle" >
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <label class="number_input_label first_lable">水平位置：</label>
    <el-radio-group v-model="position_x" size="small" fill="#0faedb" style="float: left;margin:0px 0 10px 0">
      <el-radio-button  label="left"> 左 </el-radio-button>
      <el-radio-button  label="center"> 中 </el-radio-button>
      <el-radio-button  label="right"> 右 </el-radio-button>
    </el-radio-group>
    <label class="number_input_label">垂直位置：</label>
    <el-radio-group v-model="position_y" size="small" fill="#0faedb" style="float: left;margin:0px 0 10px 0">
      <el-radio-button  label="top"> 上 </el-radio-button>
      <el-radio-button  label="center">中 </el-radio-button>
      <el-radio-button  label="bottom ">下 </el-radio-button>
    </el-radio-group>
    <label class="number_input_label first_lable">是否重复：</label>

    <el-radio-group v-model="repeatAble" size="small" fill="#0faedb" style="float: left;margin:0px 0 10px 0">
      <el-radio-button  label="no-repeat"> 不重复</el-radio-button>
      <el-radio-button  label="repeat"> 重复</el-radio-button>
      <el-radio-button  label="repeat-x"> 水平重复</el-radio-button>
      <el-radio-button  label="repeat-y"> 垂直重复</el-radio-button>
    </el-radio-group>
    <label class="number_input_label first_lable">图片大小：</label>
    <el-radio-group v-model="sizeValue" size="small" fill="#0faedb" style="float: left;margin:0px 0 10px 0">
      <el-radio-button  label="">默认</el-radio-button>
      <el-radio-button  label="100% 100%">全屏拉伸</el-radio-button>
      <el-radio-button  label="cover"> 等比填充</el-radio-button>
      <el-radio-button  label="contain">自动适应</el-radio-button>
    </el-radio-group>
    <div v-show="deleteBtn" @mouseout="deleteBtn=false" class="input_item prop_img_delete_panel" @click="removeImage" >
    </div>
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
  .input_number {float: left;width: 50px; margin-top: 3px;}
  .prop_img_delete_panel {
      position:absolute; height: 178px; width: 100%;
      transition: background-color 1s;
      z-index: 99; top: 0;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      background-image: url("/static/image/delete.png");
      background-position: center center;
    }
  .prop_img_delete_panel:hover {background-color:rgba(0,0,0,0.5);}

</style>

<script>

export default {
  name:'PropBackgroundImg',
  props:{
    model:Object,
    name:String,
    id:[String,Number]
  },
  mounted(){
    this.initValue();
    this.uploadServer = BoardGroble.config.uploadServer;
  },
  watch:{
    model(){
      this.initValue();
    },
    position_y(e){
      if(this.model){
        let postion = this.position_y +" "+this.position_x;
        this.model["backgroundPosition"] = postion;
        this.model.count++;
      }
    },
    position_x(e){
      if(this.model){
        let postion = this.position_y +" "+this.position_x;
        this.model["backgroundPosition"] = postion;
        this.model.count++;
      }
    },
    repeatAble(e){
      if(this.model){
        this.model["backgroundRepeat"] = this.repeatAble;
        this.model.count++;
      }
    },
    sizeValue(e){
      if(this.model&&e){
        this.model["backgroundSize"] = e;
        this.model.count++;
      }else{
        delete this.model["backgroundSize"];
        this.model.count++;
      }
    }
  },
  data(){
    return{
      value:undefined,
      uploadServer:'',
      position_x:"left",
      position_y:"top",
      repeatAble:undefined,
      sizeValue:"",
      deleteBtn:false
    }
  },
  methods:{
    handleAvatarSuccess(resp){
      if (resp.success){
        this.model['backgroundImage'] = resp.data.url;
        this.value = resp.data.url;
        this.model.count++;
      }
    },
    removeImage(){
      this.model['backgroundImage']=null;
      this.value = '';
      this.model.count++;
    },
    initValue(){
      if(this.model){
        this.value = this.model['backgroundImage'];
        this.repeatAble = this.model['backgroundRepeat'];
        if(this.model['backgroundSize'])
          this.sizeValue = this.model['backgroundSize'];
        if(this.model['backgroundPosition']){
          this.position_x = this.model['backgroundPosition'].split(" ")[1];
          this.position_y = this.model['backgroundPosition'].split(" ")[0];
        }

      }
    },
    deleteHandle(){
      if(this.value)
        this.deleteBtn=true;
    }
  }

}
</script>
