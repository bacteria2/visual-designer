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
    let parent=document.getElementById(id);
    let rows= option.rows;
    let len = option.rows.length;
    let data=option.data;
    let commonStyle="",lis="";
    commonStyle=this.getStyle(option.style,commonStyle);
    for(let i=0;i<len;i++){
      let liStyle="",dataStyle="",titleStyle="",unitStyle="";
      liStyle=commonStyle+this.getStyle(rows[i].rowStyle,liStyle);
      titleStyle=this.getStyle(rows[i].titleStyle,titleStyle);
      dataStyle=this.getStyle(rows[i].dataStyle,dataStyle);
      unitStyle=this.getStyle(rows[i].unitStyle,unitStyle);
      let li=`
            <li style="${liStyle}">
                <span class="dataBlock_title" style="${titleStyle}">${rows[i].titleStyle.text}</span>
                <span class="dataBlock_data" style="${dataStyle}">${data[i]}</span>
                <span class="dataBlock_unit" style="${unitStyle}">${rows[i].unitStyle.text}</span>
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
