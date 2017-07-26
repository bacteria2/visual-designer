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
        if(key==="height"||key==="line-height"||(key.indexOf("padding")!=-1)){
            imageBoxStyle+=key+":"+imageBoxs.style[key]+"px;";
        }else if(key==="fontSize"){
            imageBoxStyle+="font-size:"+imageBoxs.style[key]+"px;";
        }else{
            imageBoxStyle+=key+":"+imageBoxs.style[key]+";";
        }
    }
    if(imageBoxStyle){
        wrapperImage.setAttribute("style",imageBoxStyle);
    }
    var imageStyle="";
    for(var key in imageBoxs.imgStyle){
        if(key==="imgUrl"&& imageBoxs.imgStyle[key]){
            img.setAttribute("src",imageBoxs.imgStyle[key]);
        }else{
            if(key==="width"||key==="height"){
                if(imageBoxs.imgStyle[key].indexOf("%")!=-1){
                    imageStyle+=key+":"+imageBoxs.imgStyle[key]+";"
                }else{
                    imageStyle+=key+":"+imageBoxs.imgStyle[key]+"px;"
                }
            }else {
                imageStyle+=key+":"+imageBoxs.imgStyle[key]+";"
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
        if(k==="height"||(k.indexOf("padding")!=-1)){
            textBoxStyle+=k+":"+textBoxs[k]+"px;";
        }else if(k==="fontSize"){
            textBoxStyle+="font-size:"+textBoxs[k]+"px;";
        }else{
            textBoxStyle+=k+":"+textBoxs[k]+";";
        }
    }
    if(textBoxStyle){
        wrapperText.setAttribute("style",textBoxStyle);
    }
    var TextBoxTitle=document.createElement("h3");
    var tbt="";//用于存放文本标题的样式
    for(var style in this.option.textBox.titleStyle){
        if(style==="height"||(style.indexOf("padding")!=-1)){
            tbt+=style+":"+this.option.textBox.titleStyle[style]+"px;";
        }else if(style==="fontSize"){
            tbt+="font-size:"+this.option.textBox.titleStyle[style]+"px;";
        }else{
            tbt+=style+":"+this.option.textBox.titleStyle[style]+";";
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