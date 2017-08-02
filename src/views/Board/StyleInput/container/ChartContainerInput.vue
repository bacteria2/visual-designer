<template>
  <common-input title="图表容器设置">
    <mu-dialog :open="showSelectCharDidget" title="" dialogClass="widget-list-dialog" bodyClass="widget-list-dialogBody">
      <widget-instance-dialog @closeWidgetDialog="showSelectCharDidget=false"  @widgetInstanceSelected="selectChar"></widget-instance-dialog>
    </mu-dialog>
    <el-collapse :value="['1','2','3','4','5','6']">
      <el-collapse-item title="图表选择" name="1">
        <div class="input_item" style="position: relative;height: 28px;">
          <mu-raised-button style="position:absolute;left: 80px;top: 0;" backgroundColor="#0faedb"  @click="showSelectCharDidget=true">
            <span style="font-size:13px">选择图表</span>
          </mu-raised-button>

          <mu-raised-button style="position:absolute;left:200px;top: 0;" backgroundColor="#0faedb"  @click="desiWidgetInstance">
            <span style="font-size:13px">编辑图表</span>
          </mu-raised-button>
        </div>
      </el-collapse-item>

      <el-collapse-item title="边框和背景" name="2" >
        <prop-border-group name="边框：" :model="targetObj.style"></prop-border-group>
        <prop-box-shadow name="边框阴影:" :model="targetObj.style" propName="boxShadow"></prop-box-shadow>
        <prop-number name="圆角:" :model="targetObj.style" propName="borderRadius" :step="0.5" :min="0" ></prop-number>
        <prop-color name="背景颜色:" :model="targetObj.style" propName="backgroundColor"></prop-color>
        <prop-slider name="透明度:" :model="targetObj.style" :step="0.1" :max="1" propName="opacity"></prop-slider>
        <prop-background-img name="背景图片:" :model="targetObj.style" :id="targetObj.id" ></prop-background-img>
      </el-collapse-item>
      <el-collapse-item title="标题" name="3">
        <prop-checkbox  name="显示标题:" :model="targetObj.title" propName="show" ></prop-checkbox>
        <prop-textarea  name="显示内容:" :model="targetObj.title" propName="text" ></prop-textarea>
        <prop-number  name="标题高度:" :model="targetObj.title.style" propName="height" :step='5' :min="20"></prop-number>
        <prop-font-group name="文字:" :model="targetObj.title.style" ></prop-font-group>
        <prop-padding-group name="标题边距:" :model="targetObj.title.style" ></prop-padding-group>
        <prop-color name="背景颜色:" :model="targetObj.title.style" propName="backgroundColor" ></prop-color>
      </el-collapse-item>

      <el-collapse-item title="页脚" name="4">
        <prop-checkbox  name="显示标题:" :model="targetObj.footer" propName="show" ></prop-checkbox>
        <prop-textarea  name="显示内容:" :model="targetObj.footer" propName="text" ></prop-textarea>
        <prop-number  name="标题高度:" :model="targetObj.footer.style" propName="height" :step='5' :min="20"></prop-number>
        <prop-font-group name="文字:" :model="targetObj.footer.style" ></prop-font-group>
        <prop-padding-group name="页脚边距:" :model="targetObj.footer.style" ></prop-padding-group>
        <prop-color name="背景颜色:" :model="targetObj.footer.style" propName="backgroundColor" ></prop-color>
      </el-collapse-item>

      <el-collapse-item title="内边距" name="5">
        <prop-padding-group name="内边距:" :model="targetObj.style" ></prop-padding-group>
      </el-collapse-item>
    </el-collapse>
  </common-input>
</template>
<style>

  #container_checkgroup .el-checkbox-button__inner{ border-radius: 0;}
  #container_checkgroup .el-checkbox-button.is-checked .el-checkbox-button__inner{ background-color: rgb(15, 174, 219)}
  .el-collapse{ border-left: 0!important;}
</style>
<script>
  import CommonInput from '../Common';
  import widgetInstanceDialog  from '@/views/widgetInstance/widgetInstancesDialog'
  import Router from '@/router'
  import {message} from '@/utils'

  export default{
    name: "ChartContainerInput",
    components:{
      CommonInput,
      widgetInstanceDialog
    },
    watch:{
      'targetObj.title.style.height'(value){
        this.targetObj.title.style.lineHeight = value;
      },
      'targetObj.footer.style.height'(value){
        this.targetObj.footer.style.lineHeight = value;
      },
      beformatStyle(e){
        if(e){
          localStorage.formatStyle = {};

        }else{
          delete localStorage.formatStyle;
        }

      }
    },
    props: {
      targetObj: {
        type: Object
      },
      dashboard:Object
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
        beformatStyle:false
      }
    },
    methods: {
      handleAvatarSuccess(resp){
        if (resp.success){
          this.targetObj.style.imgUrl =  resp.data.url;
        }
      },
      selectChar(data){
        console.log('data)',data);
        if(data&&data.id&&data.code){
          let container = this.targetObj;
          let originalId = container.chartId;
          container.chartId=data.id;
          container.chartType = data.code;
          if(originalId!=data.id){
            //echart渲染会残留背景颜色
            let orginalEle =  document.getElementById(container.id);
            let orginalEleContainer =  document.getElementById(container.id+"_container");
            if(orginalEleContainer&&orginalEle){
              //添加一个新的DOM
              var newlEle = document.createElement('div');
              newlEle.id = container.id;
              newlEle.className = "container_charpanel";
              orginalEleContainer.replaceChild(newlEle,orginalEle);
            }
            container.perRender();
          }
        }else{
          message.warning("图表参数不全！");
        }
      },
      desiWidgetInstance(){
        if(this.targetObj&&this.targetObj.widgetsInstance){
          Router.push({
            name: 'WidgetEditor',
            params: {
              widgetInstance: this.targetObj.widgetsInstance,
              srcUrl:'DashboardDesigner',
              param:{dashboard:this.dashboard}
            }})
        }else{
          message.warning("未选择组件，无法编辑");
        }
      }
    }
  }
</script>
