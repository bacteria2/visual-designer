var createTable=function (id,option) {
  this.id=id;
  this.option=option;
  this.init();
};
createTable.prototype.init=function () {
  var tableStyle="",rowStyle="",thStyle="";
  var tOpt=this.option.tableStyle;//表格样式配置参数
  var thOpt=this.option.thStyle;//表头样式配置参数
  var rOpt=this.option.rowStyle;//行样式配置参数
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
  var bw="border-width";
  var bc="border-color";
  var bs="border-style";
  for(var i=0;i<series.length;i++){//遍历列数据，添加列
    var style="",width="",align="";
    if(series[i].width){
      width="width:"+series[i].width+"px;";
    }
    if(series[i].align){
      align="text-align:"+series[i].align+";";
    }
    style+=width+align;
    if(rOpt.borderCol){
      style+="border-right:"+rOpt[bw]+"px "+rOpt[bs]+" "+rOpt[bc]+";";
    };
    var div=`<div class="cell">${series[i].text}</div>`;
    var th=`<th style="${style}">${div}</th>`;
    ths+=th;
  }
  //创建table表格的主体内容
  var bTrs="";//用于存放表主体的行
  var tdData=this.option.data;
  var rows=this.option.data.length;
  for(var r=1;r<=rows;r++){//遍历表格数据，添加行
    //创建tr
    rowStyle="";
    var bg="background-color";
    for(var style in rOpt){//行样式设置
      var val=rOpt[style];
      if(style.indexOf("border")==-1&&style!="oddColor"&&style!="evenColor"&&style!="background-color"){
        if(style=="height"||style=="font-size"){
          rowStyle+=style+":"+val+"px;";
        }else{
          rowStyle+=style+":"+val+";";
        }
      }
    }
    if(rOpt.borderRow){//添加边框
      rowStyle+="border-bottom:"+rOpt[bw]+"px "+rOpt[bs]+" "+rOpt[bc]+";";
      thStyle+="border-bottom:"+rOpt[bw]+"px "+rOpt[bs]+" "+rOpt[bc]+";";
    };
    if(r%2!=0){
      if(rOpt.oddColor){
        rowStyle+="background-color:"+rOpt.oddColor;
      }else{
        rowStyle+="background-color:"+rOpt[bg];
      }
    }else{
      if(rOpt.evenColor){
        rowStyle+="background-color:"+rOpt.evenColor;
      }else{
        rowStyle+="background-color:"+rOpt[bg];
      }
    }
    var tds="";//存放表主体行的单元格
    for(var i=0;i<series.length;i++){
      //创建td
      var tdStyle="",colStyle="",w="",a="";
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
      tdStyle=w+a+colStyle;
      if(rOpt.borderCol){
        tdStyle+="border-right:"+rOpt[bw]+"px "+rOpt[bs]+" "+rOpt[bc]+";";
      };
      var div=`<div class="cell">${tdData[r-1][i]}</div>`;
      var td=`<td style="${tdStyle?tdStyle:""}">${div}</td>`;
      tds+=td;
    }
    var bTr=`<tr style="${rowStyle?rowStyle:""}">${tds}</tr>`;
    bTrs+=bTr;
  }
  for (var style in tOpt){//添加表格样式
    var valT=tOpt[style];
    if(style!="border"&&style!="align"){
      if(style=="height"||style=="border-width"||style=="font-size"){
        tableStyle+=style+":"+valT+"px;";
      }else{
        tableStyle+=style+":"+valT+";";
      }
    }
  }
  if(!tOpt.border){
    tableStyle+="border:none;"
  };
  //全局设置文本水平对齐方式
  var tableClass="";
  if(tOpt.align==="center"){
    tableClass="alignCenter";
  }else if(tOpt.align==="right"){
    tableClass="alignRight";
  }
  var renderHtml=`
            <div class="ydp-table-wrapper" >
               <table class="ydp-table ${tableClass?tableClass:""}" width="100%" border="0" cellspacing="0" cellpadding="0" style="${tableStyle?tableStyle:""}">
                <thead>
                  <tr style="${thStyle?thStyle:""}">
                    ${ths}
                  </tr>
                </thead>
                <tbody>
                  ${bTrs}
                </tbody>
              </table>
            </div>
        `;
  document.getElementById(this.id).innerHTML = renderHtml;
};

