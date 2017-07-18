<template>
  <common-input title="文本设置">

    <el-collapse :value="['1','2','3']">
      <el-collapse-item title="字体样式" name="1">
        <div class="input_item">
          <label class="input_label">字体:</label>
          <el-color-picker size="small"   v-model="targetObj.style.color"></el-color-picker>
          <el-input-number size="small" v-model="targetObj.style.fontSize" style="margin-left: 12px;width: 80px;" :step="1" :controls="false" :min="10"></el-input-number>
          <el-select size="small" v-model="targetObj.style.fontFamily" style="margin-left: 12px;width:120px" placeholder="默认字体"
                     value="Helvetica">
            <el-option label="默认字体" value="Helvetica"></el-option>
            <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
            <el-option label="宋体" value="SimSun"></el-option>
          </el-select>
        </div>
        <el-form-item label="粗体:" >
          <el-select size="small" v-model="targetObj.style.fontWeight" style="margin-left: 12px;width:120px" placeholder="正常"
                     value="normal">
            <el-option label="正常" value="normal"></el-option>
            <el-option label="加粗" value="bold"></el-option>
            <el-option label="更粗" value="bolder"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="斜体:" >
          <el-select size="small" v-model="targetObj.style.fontStyle" style="margin-left: 12px;width:120px" placeholder="正常"
                     value="normal">
            <el-option label="正常" value="normal"></el-option>
            <el-option label="斜体" value="italic"></el-option>
            <el-option label="倾斜" value="oblique"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下划线:" >
          <el-select size="small" v-model="targetObj.style.textDecoration" style="margin-left: 12px;width:120px" placeholder="无下划线"
                     value="none">
            <el-option label="无下划线" value="none"></el-option>
            <el-option label="下划线" value="underline"></el-option>
            <el-option label="删除线" value="line-through"></el-option>
            <el-option label="上划线" value="overline"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="水平对齐:" >
          <el-select size="small" v-model="targetObj.style.textAlign" style="margin-left: 12px;width:120px" placeholder="左对齐"
                     value="left">
            <el-option label="左对齐" value="left "></el-option>
            <el-option label="右对齐" value="right"></el-option>
            <el-option label="居中" value="center "></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直对齐:" >
          <el-select size="small" v-model="targetObj.style.verticalAlign" style="margin-left: 12px;width:120px" placeholder="左对齐"
                     value="text-top">
            <el-option label="上对齐" value="text-top "></el-option>
            <el-option label="垂直居中" value="middle"></el-option>
            <el-option label="下对齐" value="text-bottom "></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="连接:" >
          <el-button>创建链接</el-button>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="背景和边框" name="2">
        <el-form-item label="背景颜色:">
          <el-color-picker v-model="targetObj.style.backgroundColor"></el-color-picker>
        </el-form-item>
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
      </el-collapse-item>
      <el-collapse-item title="其他" name="3">
        <el-form-item label="透明度:">
          <el-slider v-model="targetObj.style.opacity" :step="0.1" :max="1" ></el-slider>
        </el-form-item>
        <el-form-item label="滚动条:">
          <el-checkbox v-model="checked">显示</el-checkbox>
        </el-form-item>
        <el-form-item label="上内边距:">
          <el-input-number size="small" v-model="targetObj.style.paddingTop"  style="margin-left: 12px;width: 80px;" :step="1" :controls="false" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="右内边距:">
          <el-input-number size="small" v-model="targetObj.style.paddingRight"  style="margin-left: 12px;width: 80px;" :step="1" :controls="false" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="下内边距:">
          <el-input-number size="small" v-model="targetObj.style.paddingBottom"  style="margin-left: 12px;width: 80px;" :step="1" :controls="false" :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="左内边距:">
          <el-input-number size="small" v-model="targetObj.style.paddingLeft"  style="margin-left: 12px;width: 80px;" :step="1" :controls="false" :min="0"></el-input-number>
        </el-form-item>

      </el-collapse-item>
    </el-collapse>
  </common-input>
</template>

<script>
  import CommonInput from '../Common';
  export default{
    name: "WidgetTextInput",
    components:{
      CommonInput
    },
    watch:{
      checked(value){
          if(value){
            this.targetObj.style.overflow = "auto";
          }else{
            this.targetObj.style.overflow = "hidden";
          }
      }
    },
    props: {
      targetObj: {
        type: Object
      },
      componentId: [String, Number]
    },
    computed:{

    },
    data(){
      return {
        sizeCustom: false,
        activeList: '1',
        showSelectCharDidget:false,
        checked:false
      }
    },
    methods: {

    }
  }
</script>
