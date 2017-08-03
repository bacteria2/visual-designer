import Render from '../WidgetRender'

export default class WidgetTableRender extends Render {

  //load方法加载依赖
  load(){
    require('./dataBlock.scss')
  }
  init () {
    this.load();
  }

  afterInit(vueInstance,registry){
    if (registry&&vueInstance) {
      vueInstance.$store.commit('registryInstance', vueInstance)
    }
  }
  //render用于组件渲染
  render (option) {
    this.dataBlock(this.el,option)
  }
  dataBlock(id,option) {//数据块渲染方法
    let parent=document.getElementById(id);//根据id值获取dom元素
    let blocks= option.blocks;
    let len = option.blocks.length;
    let data=option.data;
    let commonStyle="",lis="";
    commonStyle=this.getStyle(option.style,commonStyle);//获取公共设置的样式
    for(let i=0;i<len;i++){
      let liStyle="",dataStyle="",titleStyle="",unitStyle="";
      liStyle=commonStyle+this.getStyle(blocks[i].blockStyle,liStyle);//获取各自的li元素样式
      titleStyle=this.getStyle(blocks[i].titleStyle,titleStyle);//获取title样式
      dataStyle=this.getStyle(blocks[i].dataStyle,dataStyle);//获取data样式
      unitStyle=this.getStyle(blocks[i].unitStyle,unitStyle);//获取unit样式
      let li=`
            <li style="${liStyle}">
                <span class="dataBlock_title" style="${titleStyle}">${blocks[i].titleStyle.text}</span>
                <span class="dataBlock_data" style="${dataStyle}">${data[i]}</span>
                <span class="dataBlock_unit" style="${unitStyle}">${blocks[i].unitStyle.text}</span>
            </li>`;
      lis+=li;
    }
    let html=`<ul class="ydp-dataBlock">${lis}</ul>`;
    parent.innerHTML=html;
  }
  getStyle(obj,style) {//获取样式
    for(let key in obj){
      let val=obj[key];
      if(typeof val === 'number'){
        style+=key+":"+val+"px;";
      }else if(key!=="text"){
        style+=key+":"+val+";";
      }
    }
    return style;
  };
}
