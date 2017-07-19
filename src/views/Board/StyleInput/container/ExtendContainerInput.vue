<template>
  <common-input title="组件属性设置">
    <mu-dialog :open="showSelectCharDidget" title="" dialogClass="widget-list-dialog" bodyClass="widget-list-dialogBody">
      <widget-instance-dialog @closeWidgetDialog="showSelectCharDidget=false"  @widgetInstanceSelected="selectChar"></widget-instance-dialog>
    </mu-dialog>
    <el-collapse :value="['1','2','3','4','5']">
      <!-----------组件属性编辑------------>
      <el-collapse-item title="组件属性" name="1" >
        <component :is="widgetInput" :options="targetObj.extendWidget.options"  :styles="targetObj.extendWidget.style"></component>
      </el-collapse-item>
      <!-----------/边框属性编辑------------>
      <!-----------边框属性编辑------------>
      <el-collapse-item title="边框背景" name="2" >
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
      <!-----------/边框属性编辑------------>

      <!-----------标题属性编辑------------>
      <el-collapse-item title="标题" name="3">
        <el-form-item label="显示标题:" >
          <el-checkbox v-model="targetObj.title.show"></el-checkbox>
        </el-form-item>
        <el-form-item label="显示内容:">
          <el-input size="small"  placeholder="请输入内容"  v-model="targetObj.title.text"> </el-input>
        </el-form-item>
        <el-form-item size="small" label="标题高度:">
          <el-input-number size="small" v-model="targetObj.title.style.height"  :stop='5' :min="20" ></el-input-number>
        </el-form-item>
        <div class="input_item">
          <label class="input_label">文字:</label>
          <el-color-picker v-model="targetObj.title.style.color"></el-color-picker>
          <el-input-number size="small" v-model="targetObj.title.style.fontSize" style="margin-left: 12px;width: 80px;" :step="0.5" :controls="false" :min="0" :max="25"></el-input-number>
          <el-select size="small" v-model="targetObj.title.style.fontFamily" style="margin-left: 12px;width:120px" placeholder="字体" value="solid">
            <el-option label="宋体"  value="宋体"></el-option>
            <el-option label="黑体" value="黑体"></el-option>
            <el-option label="微软雅黑" value="微软雅黑"></el-option>
          </el-select>
        </div>
        <el-form-item label="文字位置:">
            <el-radio-group size="small" v-model="targetObj.title.style.textAlign">
              <el-radio-button label="left">居左</el-radio-button>
              <el-radio-button label="center">居中</el-radio-button>
              <el-radio-button label="right">居右</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="左边距:" >
          <el-input-number size="small" v-model="targetObj.title.style.paddingLeft"  :stop='5' :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="右边距:" >
          <el-input-number size="small" v-model="targetObj.title.style.paddingRight"  :stop='5' :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="背景颜色:">
          <el-color-picker v-model="targetObj.title.style.backgroundColor"></el-color-picker>
        </el-form-item>
      </el-collapse-item>
      <!-----------/标题属性编辑------------>

      <!-----------页脚属性编辑------------>
      <el-collapse-item title="页脚" name="4">
        <el-form-item label="显示标题:" >
          <el-checkbox v-model="targetObj.footer.show"></el-checkbox>
        </el-form-item>
        <el-form-item label="显示内容:">
          <el-input size="small"  placeholder="请输入内容"  v-model="targetObj.footer.text"> </el-input>
        </el-form-item>
        <el-form-item size="small" label="标题高度:">
          <el-input-number size="small" v-model="targetObj.footer.style.height"  :stop='5' :min="20" ></el-input-number>
        </el-form-item>
        <div class="input_item">
          <label class="input_label">文字:</label>
          <el-color-picker v-model="targetObj.footer.style.color"></el-color-picker>
          <el-input-number size="small" v-model="targetObj.footer.style.fontSize" style="margin-left: 12px;width: 80px;" :step="0.5" :controls="false" :min="0" :max="25"></el-input-number>
          <el-select size="small" v-model="targetObj.footer.style.fontFamily" style="margin-left: 12px;width:120px" placeholder="字体" value="solid">
            <el-option label="宋体"  value="宋体"></el-option>
            <el-option label="黑体" value="黑体"></el-option>
            <el-option label="微软雅黑" value="微软雅黑"></el-option>
          </el-select>
        </div>
        <el-form-item label="文字位置:">
          <el-radio-group size="small" v-model="targetObj.footer.style.textAlign">
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">居右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="左边距:" >
          <el-input-number size="small" v-model="targetObj.footer.style.paddingLeft"  :stop='5' :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="右边距:" >
          <el-input-number size="small" v-model="targetObj.footer.style.paddingRight"  :stop='5' :min="0" ></el-input-number>
        </el-form-item>
        <el-form-item label="背景颜色:">
          <el-color-picker v-model="targetObj.footer.style.backgroundColor"></el-color-picker>
        </el-form-item>
      </el-collapse-item>
      <!-----------/页脚属性编辑------------>

      <!-----------内边距属性编辑------------>
      <el-collapse-item title="内边距" name="5">
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
      <!-----------//内边距属性编辑------------>
    </el-collapse>
  </common-input>
</template>

<script>
  import CommonInput from '../Common';
  import extendWidgetConfig from '@/views/Board/common/ExtendWidgetConfig'
  export default{
    name: "ExtendContainerInput",
    components:{
      CommonInput
    },
    mounted(){
      if(extendWidgetConfig&&this.widgetName){
        let extendWidgetConfigs = extendWidgetConfig.filter((widget)=>widget.name===this.widgetName);
        let extendWidget = extendWidgetConfigs[0];
        this.widgetInput = extendWidget.inputComponet;
      }
    },
    watch:{
      'targetObj.title.style.height'(value){
        this.targetObj.title.style.lineHeight = value;
      },
      'targetObj.footer.style.height'(value){
        this.targetObj.footer.style.lineHeight = value;
      }
    },
    props: {
      targetObj: {
        type: Object
      },
      componentId: [String, Number],
      widgetName:String
    },
    computed:{
      imageUrl(){
        return  this.targetObj.style.imgUrl
      }
    },
    data(){
      return {
        show:true,
        sizeCustom: false,
        activeList: '1',
        showSelectCharDidget:false,
        widgetInput:''
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
