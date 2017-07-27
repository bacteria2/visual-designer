var createTable=function (id,option) {
  this.id=id;
  this.option=option;
  this.init();
};
createTable.prototype.init=function () {
  var tableStyle="",rowStyle="",thStyle="";
  var tOpt=this.option.tableStyle;//表格样式配置参数
  if(tOpt.backgroundColor){//添加表格背景色
    thStyle+="background-color:"+tOpt.backgroundColor+";";
  }
  var thOpt=this.option.thStyle;//表头样式配置参数
  for(var style in thOpt){//添加表头样式
    if(style=="height"||style=="font-size"){
      thStyle+=style+":"+thOpt[style]+"px;";
    }else if(style==="backgroundColor"){
      thStyle+="background-color:"+thOpt[style]+";";
    }else{
      thStyle+=style+":"+thOpt[style]+";";
    }
  }
  var ths="";//存放表头行的单元格
  var series=this.option.series;
  for(var i=0;i<series.length;i++){//遍历列数据，添加列
    var style="",width="",align="",border="";
    if(series[i].width){
      width="width:"+series[i].width+"px;";
    }
    if(series[i].align){
      align="text-align:"+series[i].align+";";
    }
    if(tOpt.borderRight){
      if(!tOpt.borderWidth){
        tOpt.borderWidth=1;
      }
      if(!tOpt.borderColor){
        tOpt.borderColor="#eef1f6";
      }
      if(!tOpt.borderStyle){
        tOpt.borderStyle="solid";
      }
      border="border:"+tOpt.borderWidth+"px "+tOpt.borderColor+" "+tOpt.borderStyle+";border-top:0;border-left:0;";
    }else{
      border="border:"+tOpt.borderWidth+"px "+tOpt.borderColor+" "+tOpt.borderStyle+";border-top:0;border-left:0;border-right:0;";
    }
    style=border+width+align;
    var div=`<div class="cell">${series[i].text}</div>`;
    var th=`<th style="${style}">${div}</th>`;
    ths+=th;
  }
  //创建table表格的主体内容
  var bTrs="";//用于存放表主体的行
  var tdData=this.option.data;
  var rows=this.option.data.length;
  var rOpt=this.option.rowStyle;//行样式配置参数
  for(var r=1;r<=rows;r++){//遍历表格数据，添加行
    //创建tr
    rowStyle="";
    if(tOpt.backgroundColor){
      rowStyle+="background-color:"+tOpt.backgroundColor+";";
    }
    for(var style in rOpt){//行样式设置
      var val=rOpt[style];
      if(rOpt.stripe){
        if(r%2!=0){
          if(style==="backgroundColor"){
            rowStyle+="background-color:#ffffff;";
          }else{
            if(style.indexOf("stripe")==-1){
              if(style=="height"||style=="font-size"){
                rowStyle+=style+":"+val+"px;";
              }else{
                rowStyle+=style+":"+val+";";
              }
            }
          }
        }else{
          if(style==="backgroundColor"){
            rowStyle+="background-color:"+val+";";
          }else{
            if(style.indexOf("stripe")==-1){
              if(style=="height"||style=="font-size"){
                rowStyle+=style+":"+val+"px;";
              }else{
                rowStyle+=style+":"+val+";";
              }
            }
          }
        }
      }else{
        if(style.indexOf("stripe")==-1){
          if(style=="height"||style=="font-size"){
            rowStyle+=style+":"+val+"px;";
          }else{
            rowStyle+=style+":"+val+";";
          }
        }
      }
    }
    var tds="";//存放表主体行的单元格
    for(var i=0;i<series.length;i++){
      //创建td
      var tdStyle="",colStyle="",w="",a="",b="";
      if(series[i].style){//列其他样式添加
        colStyle=series[i].style;
      }
      //列样式设置
      if(series[i].width){
        w="width:"+series[i].width+"px;";
      }
      if(series[i].align){
        a="text-align:"+series[i].align+";";
      }
      if(tOpt.borderRight){//添加纵向边框
        if(!tOpt.borderWidth){
          tOpt.borderWidth=1;
        }
        if(!tOpt.borderColor){
          tOpt.borderColor="#eef1f6";
        }
        if(!tOpt.borderStyle){
          tOpt.borderStyle="solid";
        }
        b="border:"+tOpt.borderWidth+"px "+tOpt.borderColor+" "+tOpt.borderStyle+";border-top:0;border-left:0;";
      }else{
        b="border:"+tOpt.borderWidth+"px "+tOpt.borderColor+" "+tOpt.borderStyle+";border-top:0;border-left:0;border-right:0;";
      }
      tdStyle=w+a+b+colStyle;
      var div=`<div class="cell">${tdData[r-1][i]}</div>`;
      var td=`<td style="${tdStyle?tdStyle:""}">${div}</td>`;
      tds+=td;
    }
    var bTr=`<tr style="${rowStyle?rowStyle:""}">${tds}</tr>`;
    bTrs+=bTr;
  }
  for (var style in tOpt){//添加表格样式
    if(style.indexOf("borderRight")==-1){
      if(style.indexOf("align")==-1){
        if(style=="borderWidth"){//属性值不带单位需要添加
          tableStyle+="border-width"+":"+tOpt[style]+"px;";
        }else if(style=="borderColor"){
          tableStyle+="border-color:"+tOpt[style]+";";
        }else if(style=="borderStyle"){
          tableStyle+="border-style:"+tOpt[style]+";";
        }else if(style=="backgroundColor"){
          tableStyle+="background-color:"+tOpt[style]+";";
        }else if(style=="font-size"){
          tableStyle+=style+":"+tOpt[style]+"px;";
        }else{
          tableStyle+=style+":"+tOpt[style]+";";
        }
      }
    }
  }
  //全局设置文本水平对齐方式
  var tableClass="";
  if(tOpt.align==="center"){
    tableClass="alignCenter";
  }else if(tOpt.align==="right"){
    tableClass="alignRight";
  }
  var renderHtml=`
            <div class="ydp-table">
              <div class="ydp-table_header-wrapper">
                <table class="ydp-table_header ${tableClass?tableClass:""}" width="100%" border="0" cellspacing="0" cellpadding="0" style="${tableStyle?tableStyle:""}">
                  <thead>
                    <tr style="${thStyle?thStyle:""}">
                      ${ths}
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="ydp-table_tableBody-wrapper" >
                 <table class="ydp-table_tableBody ${tableClass?tableClass:""}" width="100%" border="0" cellspacing="0" cellpadding="0" style="${tableStyle?tableStyle:""}">
                  <tbody>
                    ${bTrs}
                  </tbody>
                </table>
              </div>
            </div>
        `;
  document.getElementById(this.id).innerHTML = renderHtml;
};

