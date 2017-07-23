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
      <el-collapse-item title="边框和背景" name="2" >
        <prop-border-group name="边框：" :model="targetObj.style"></prop-border-group>
        <prop-number name="圆角:" :model="targetObj.style" propName="borderRadius" :step="0.5" :min="0" ></prop-number>
        <prop-color name="背景颜色:" :model="targetObj.style" propName="backgroundColor"></prop-color>
      </el-collapse-item>
      <!-----------/边框属性编辑------------>

      <!-----------标题属性编辑------------>
      <el-collapse-item title="标题" name="3">
        <prop-checkbox  name="显示标题:" :model="targetObj.title" propName="show" ></prop-checkbox>
        <prop-textarea  name="显示内容:" :model="targetObj.title" propName="text" ></prop-textarea>
        <prop-number  name="标题高度:" :model="targetObj.title.style" propName="height" :step='5' :min="20"></prop-number>
        <prop-font-group name="文字:" :model="targetObj.title.style" ></prop-font-group>
        <prop-padding-group name="标题边距:" :model="targetObj.title.style" ></prop-padding-group>
        <prop-color name="背景颜色:" :model="targetObj.title.style" propName="backgroundColor" ></prop-color>
      </el-collapse-item>
      <!-----------/标题属性编辑------------>

      <!-----------页脚属性编辑------------>
      <el-collapse-item title="页脚" name="4">
        <prop-checkbox  name="显示标题:" :model="targetObj.footer" propName="show" ></prop-checkbox>
        <prop-textarea  name="显示内容:" :model="targetObj.footer" propName="text" ></prop-textarea>
        <prop-number  name="标题高度:" :model="targetObj.footer.style" propName="height" :step='5' :min="20"></prop-number>
        <prop-font-group name="文字:" :model="targetObj.footer.style" ></prop-font-group>
        <prop-padding-group name="页脚边距:" :model="targetObj.footer.style" ></prop-padding-group>
        <prop-color name="背景颜色:" :model="targetObj.footer.style" propName="backgroundColor" ></prop-color>
      </el-collapse-item>
      <!-----------/页脚属性编辑------------>

      <!-----------内边距属性编辑------------>
      <el-collapse-item title="内边距" name="5">
        <prop-padding-group name="内边距:" :model="targetObj.style" ></prop-padding-group>
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
