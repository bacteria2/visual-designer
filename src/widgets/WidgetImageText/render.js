import Render from '../WidgetRender'

export default class WidgetTableRender extends Render {

  //load方法加载依赖
  load(){
    require('./imageText.scss')
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
    this.imageText(this.el,option)
  }


  imageText(id,option) {
    let parent=document.getElementById(id);
    let wrapper=document.createElement("div");//图文容器
    wrapper.setAttribute("class","imageText-wrapper");
    wrapper.setAttribute("style","width:100%;height:100%;");
    let wrapperImage=document.createElement("div");//图片容器
    wrapperImage.setAttribute("class","imageText-wrapper_imageBox");
    let img=document.createElement("img");
    let imageBoxStyle="";
    let imageBoxs=option.imageBox;
    for(let key in imageBoxs.style){
      let val=imageBoxs.style[key]+"";
      if(key==="border-width"||key==="height"||key==="line-height"||(key.indexOf("padding")!=-1)){
        imageBoxStyle+=key+":"+val+"px;";
      }else if(key==="width"||key==="border-radius"){
        if(val&&val.indexOf("%")!=-1){
          imageBoxStyle+=key+":"+val+";"
        }else{
          imageBoxStyle+=key+":"+val+"px;"
        }
      }else{
        imageBoxStyle+=key+":"+val+";";
      }
    }
    if(imageBoxStyle){
      wrapperImage.setAttribute("style",imageBoxStyle);
    }
    let imageStyle="";
    for(let key1 in imageBoxs.imgStyle){
      let v=imageBoxs.imgStyle[key1]+"";
      if(key1==="imgUrl"){
        if(v){
          img.setAttribute("src",v);
        }
      }else{
        if(key1==="width"||key1==="height"){
          if(v&&v.indexOf("%")!=-1){
            imageStyle+=key1+":"+v+";"
          }else{
            imageStyle+=key1+":"+v+"px;"
          }
        }else {
          imageStyle+=key1+":"+v+";"
        }
      }
    }
    if(imageStyle){
      img.setAttribute("style",imageStyle);
    }
    wrapperImage.appendChild(img);
    let subText=document.createElement("div");
    let subStyle="";//用于存图片子标题的样式
    let st=imageBoxs.subTextStyle;
    for(let s in st){
      let val3=st[s]+"";
      if(s==="font-size"||s==="border-width"||s==="height"||s==="line-height"||(s.indexOf("padding")!=-1)||(s.indexOf("margin")!=-1)){
        subStyle+=s+":"+val3+"px;";
      }else if(s==="width"||s==="border-radius"){
        if(val3&&val3.indexOf("%")!=-1){
          subStyle+=s+":"+val3+";"
        }else{
          subStyle+=s+":"+val3+"px;"
        }
      }else{
        subStyle+=s+":"+val3+";";
      }
    }
    if(option.data.subTitle){
      subText.innerHTML=option.data.subTitle;
    }
    if(subStyle){
      subText.setAttribute("style",subStyle);
    }
    wrapperImage.appendChild(subText);

    let wrapperText=document.createElement("div");//文字容器
    wrapperText.setAttribute("class","imageText-wrapper_TextBox");
    let textBoxStyle="";
    let textBoxs=option.textBox.style;
    for(let k in textBoxs){
      let val1=textBoxs[k]+"";
      if(k==="font-size"||k==="border-width"||k==="height"||(k.indexOf("padding")!=-1)||(k.indexOf("margin")!=-1)){
        textBoxStyle+=k+":"+val1+"px;";
      }else if(k==="width"||k==="border-radius"){
        if(val1&&val1.indexOf("%")!=-1){
          textBoxStyle+=k+":"+val1+";"
        }else{
          textBoxStyle+=k+":"+val1+"px;"
        }
      }else{
        textBoxStyle+=k+":"+val1+";";
      }
    }
    if(textBoxStyle){
      wrapperText.setAttribute("style",textBoxStyle);
    }
    let TextBoxTitle=document.createElement("h3");
    let tbt="";//用于存放文本标题的样式
    let tt=option.textBox.titleStyle;
    for(let style in tt){
      let val2=tt[style]+"";
      if(style==="font-size"||style==="border-width"||style==="height"||(style.indexOf("padding")!=-1)||(style.indexOf("margin")!=-1)){
        tbt+=style+":"+val2+"px;";
      }else if(style==="width"||style==="border-radius"){
        if(val2&&val2.indexOf("%")!=-1){
          tbt+=style+":"+val2+";"
        }else{
          tbt+=style+":"+val2+"px;"
        }
      }else{
        tbt+=style+":"+val2+";";
      }
    }
    if(tbt){
      TextBoxTitle.setAttribute("style",tbt);
    }
    let TextBoxDes=document.createElement("h5");
    TextBoxTitle.innerHTML=option.data.title;
    TextBoxDes.innerHTML=option.data.des;
    wrapperText.appendChild(TextBoxTitle);
    wrapperText.appendChild(TextBoxDes);

    wrapper.appendChild(wrapperImage);
    wrapper.appendChild(wrapperText);
    parent.innerHTML="";
    parent.appendChild(wrapper);
  };

}
