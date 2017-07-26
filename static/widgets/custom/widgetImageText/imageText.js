var imageText=function (id,option) {
    this.id=id;
    this.option=option;
    this.init();
};
imageText.prototype.init=function () {
    var parent=document.getElementById(this.id);
    var wrapper=document.createElement("div");//图文容器
    wrapper.setAttribute("class","imageText-wrapper");
    wrapper.setAttribute("style","width:100%;height:100%;");
    var wrapperImage=document.createElement("div");//图片容器
    wrapperImage.setAttribute("class","imageText-wrapper_imageBox");
    var img=document.createElement("img");
    var imageBoxStyle="";
    var imageBoxs=this.option.imageBox;
    for(var key in imageBoxs.style){
        var val=imageBoxs.style[key];
        if(key==="border-width"||key==="height"||key==="line-height"||(key.indexOf("padding")!=-1)){
            imageBoxStyle+=key+":"+val+"px;";
        }else if(key==="border-radius"||key==="width"){
          if(val.indexOf("%")!=-1){
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
    var imageStyle="";
    for(var key1 in imageBoxs.imgStyle){
      var v=imageBoxs.imgStyle[key1];
        if(key1==="imgUrl"&& v){
            img.setAttribute("src",v);
        }else{
            if(key1==="width"||key1==="height"){
                if(v.indexOf("%")!=-1){
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
    var wrapperText=document.createElement("div");//文字容器
    wrapperText.setAttribute("class","imageText-wrapper_TextBox");
    var textBoxStyle="";
    var textBoxs=this.option.textBox.style;
    for(var k in textBoxs){
        var val1=textBoxs[k];
        if(k==="font-size"||k==="border-width"||k==="height"||(k.indexOf("padding")!=-1)){
            textBoxStyle+=k+":"+val1+"px;";
        }else if(k==="border-radius"||k==="width"){
          if(val1.indexOf("%")!=-1){
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
    var TextBoxTitle=document.createElement("h3");
    var tbt="";//用于存放文本标题的样式
    var tt=this.option.textBox.titleStyle;
    for(var style in tt){
        var val2=tt[style];
        if(style==="font-size"||style==="border-width"||style==="height"||(style.indexOf("padding")!=-1)||(style.indexOf("margin")!=-1)){
            tbt+=style+":"+val2+"px;";
        }else if(style==="border-radius"||style==="width"){
          if(val2.indexOf("%")!=-1){
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
    var TextBoxDes=document.createElement("h5");
    TextBoxTitle.innerHTML=this.option.textBox.data.title;
    TextBoxDes.innerHTML=this.option.textBox.data.des;
    wrapperText.appendChild(TextBoxTitle);
    wrapperText.appendChild(TextBoxDes);

    wrapper.appendChild(wrapperImage);
    wrapper.appendChild(wrapperText);
    parent.innerHTML="";
    parent.appendChild(wrapper);
};
