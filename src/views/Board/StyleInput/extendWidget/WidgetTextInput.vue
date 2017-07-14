<template>
  <common-input title="文本设置">

    <el-collapse :value="['1','2','3']">
      <el-collapse-item title="字体样式" name="1">
        <div class="input_item">
          <label class="input_label">字体:</label>
          <el-color-picker size="small"   v-model="targetObj.style.color"></el-color-picker>
          <el-input-number size="small" v-model="targetObj.style.fontSize" style="margin-left: 12px;width: 80px;" :step="0.5" :controls="false" :min="0" :max="25"></el-input-number>
          <el-select size="small" v-model="targetObj.style.fontFamily" style="margin-left: 12px;width:120px" placeholder="默认字体"
                     value="solid">
            <el-option label="默认字体" value="Helvetica"></el-option>
            <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
            <el-option label="宋体" value="SimSun"></el-option>
          </el-select>
        </div>
        <el-form-item label="粗体:" >
          <el-input-number size="small" v-model="targetObj.style.borderRadius" :step="0.5" :min="0" :max="25"></el-input-number>
        </el-form-item>
        <el-form-item label="背景颜色:">
          <el-color-picker v-model="targetObj.style.backgroundColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="透明度:">
         <el-slider v-model="targetObj.style.opacity" :step="0.1" :max="1" ></el-slider>
        </el-form-item>
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
        <el-form-item label="透明度:">
         <el-slider v-model="targetObj.style.opacity" :step="0.1" :max="1" ></el-slider>
        </el-form-item>
      </el-collapse-item>

    </el-collapse>
  </common-input>
</template>

<script>
  import CommonInput from '../Common';
  import widgetInstanceDialog  from '@/views/widgetInstance/src/widgetInstancesDialog'
  export default{
    name: "WidgetRectangleInput",
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
      }
    }
  }
</script>
