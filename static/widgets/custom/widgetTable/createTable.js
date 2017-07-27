 var createTable=function(id,option){
        var tableStyle="",rowStyle="",thStyle="";
        var containerDiv=document.createElement("div");
        containerDiv.setAttribute("class","ydp-table");
        var tableHeader=document.createElement("div");
        tableHeader.setAttribute("class","ydp-table_header-wrapper");
        var tableBody=document.createElement("div");
        tableBody.setAttribute("class","ydp-table_tableBody-wrapper");
        containerDiv.appendChild(tableBody);
        //创建table表格的表头
        var hTable=document.createElement("table");
        var hThead=document.createElement("thead");
        hTable.setAttribute("class","ydp-table_header");
        hTable.setAttribute("width","100%");
        hTable.setAttribute("border","0");
        hTable.setAttribute("cellspacing","0");
        hTable.setAttribute("cellpadding","0");
        var hTr=document.createElement("tr");
        if(option.tableStyle.backgroundColor){//添加表格背景色
          thStyle+="background-color:"+option.tableStyle.backgroundColor+";";
        }
        for(var style in option.thStyle){//添加表头样式
          if(style=="height"||style=="font-size"){
            thStyle+=style+":"+option.thStyle[style]+"px;";
          }else if(style==="backgroundColor"){
            thStyle+="background-color:"+option.thStyle[style]+";";
          }else{
            thStyle+=style+":"+option.thStyle[style]+";";
          }
        }
        if(thStyle){
         hTr.setAttribute("style",thStyle);
        }
        var series=option.series;
        for(var i=0;i<series.length;i++){//遍历列数据，添加列
          //创建th
          var th=document.createElement("th");
          var td=document.createElement("td");
          //列样式设置
          var width="";
          var align="";
          if(series[i].width){
            width="width:"+series[i].width+"px;";
          }
          if(series[i].align){
            align="text-align:"+series[i].align+";";
          }
          if(option.tableStyle.borderRight){
            if(!option.tableStyle.borderWidth){
              option.tableStyle.borderWidth=1;
            }
            if(!option.tableStyle.borderColor){
              option.tableStyle.borderColor="#eef1f6";
            }
            if(!option.tableStyle.borderStyle){
              option.tableStyle.borderStyle="solid";
            }
            var border="border:"+option.tableStyle.borderWidth+"px "+option.tableStyle.borderColor+" "+option.tableStyle.borderStyle+";border-top:0;border-left:0;";
            th.setAttribute("style",border+width+align);
          }else{
            var border="border:"+option.tableStyle.borderWidth+"px "+option.tableStyle.borderColor+" "+option.tableStyle.borderStyle+";border-top:0;border-left:0;border-right:0;";
            th.setAttribute("style",border+width+align);
          }
          var div=document.createElement("div");
          div.setAttribute("class","cell");
          div.innerHTML=series[i].text;
          th.appendChild(div);
          hTr.appendChild(th);
        }
        hThead.appendChild(hTr);
        hTable.appendChild(hThead);
        tableHeader.appendChild(hTable);
        containerDiv.appendChild(tableHeader);

        //创建table表格的主体内容
        var bTable=document.createElement("table");
        var bTbody=document.createElement("tbody");
        bTable.setAttribute("class","ydp-table_tableBody");
        bTable.setAttribute("width","100%");
        bTable.setAttribute("border","0");
        bTable.setAttribute("cellspacing","0");
        bTable.setAttribute("cellpadding","0");
        var tdData=option.data;
        var rows=option.data.length;
        for(var r=1;r<=rows;r++){//遍历表格数据，添加行
          //创建tr
          var bTr=document.createElement("tr");
          rowStyle="";
          if(option.tableStyle.backgroundColor){
            rowStyle+="background-color:"+option.tableStyle.backgroundColor+";";
          }
          for(var style in option.rowStyle){//行样式设置
            if(option.rowStyle.stripe){
              if(r%2!=0){
                if(style==="backgroundColor"){
                  rowStyle+="background-color:#ffffff;";
                }else{
                  if(style.indexOf("stripe")==-1){
                    if(style=="height"||style=="font-size"){
                      rowStyle+=style+":"+option.rowStyle[style]+"px;";
                    }else{
                      rowStyle+=style+":"+option.rowStyle[style]+";";
                    }
                  }
                }
              }else{
                if(style==="backgroundColor"){
                  rowStyle+="background-color:"+option.rowStyle[style]+";";
                }else{
                  if(style.indexOf("stripe")==-1){
                    if(style=="height"||style=="font-size"){
                      rowStyle+=style+":"+option.rowStyle[style]+"px;";
                    }else{
                      rowStyle+=style+":"+option.rowStyle[style]+";";
                    }
                  }
                }
              }
            }else{
              if(style.indexOf("stripe")==-1){
                if(style=="height"||style=="font-size"){
                  rowStyle+=style+":"+option.rowStyle[style]+"px;";
                }else{
                  rowStyle+=style+":"+option.rowStyle[style]+";";
                }
              }
            }
          }
          if(rowStyle){
            bTr.setAttribute("style",rowStyle);
          }
          for(var i=0;i<series.length;i++){
            //创建td
            var td=document.createElement("td");
            var colStyle="";
            if(series[i].style){//列其他样式添加
              colStyle=series[i].style;
            }
            var width="";
            var align="";
            //列样式设置
            if(series[i].width){
              width="width:"+series[i].width+"px;";
            }
            if(series[i].align){
              align="text-align:"+series[i].align+";";
            }
            if(option.tableStyle.borderRight){//添加纵向边框
              if(!option.tableStyle.borderWidth){
                option.tableStyle.borderWidth=1;
              }
              if(!option.tableStyle.borderColor){
                option.tableStyle.borderColor="#eef1f6";
              }
              if(!option.tableStyle.borderStyle){
                option.tableStyle.borderStyle="solid";
              }
              var border="border:"+option.tableStyle.borderWidth+"px "+option.tableStyle.borderColor+" "+option.tableStyle.borderStyle+";border-top:0;border-left:0;";
              td.setAttribute("style",border+width+align+colStyle);
            }else{
              var border="border:"+option.tableStyle.borderWidth+"px "+option.tableStyle.borderColor+" "+option.tableStyle.borderStyle+";border-top:0;border-left:0;border-right:0;";
              td.setAttribute("style",border+width+align+colStyle);
            }
            var div=document.createElement("div");
            div.setAttribute("class","cell");
            div.innerHTML=tdData[r-1][i];
            td.appendChild(div);
            bTr.appendChild(td);
          }
          bTbody.appendChild(bTr);
        }
        bTable.appendChild(bTbody);
        tableBody.appendChild(bTable);
        containerDiv.appendChild(tableBody);
        for (var style in option.tableStyle){//添加表格样式
            if(style.indexOf("borderRight")==-1){
                if(style.indexOf("textAlign")==-1){
                  if(style=="borderWidth"){//属性值不带单位需要添加
                    tableStyle+="border-width"+":"+option.tableStyle[style]+"px;";
                  }else if(style=="borderColor"){
                    tableStyle+="border-color:"+option.tableStyle[style]+";";
                  }else if(style=="borderStyle"){
                    tableStyle+="border-style:"+option.tableStyle[style]+";";
                  }else if(style=="backgroundColor"){
                    tableStyle+="background-color:"+option.tableStyle[style]+";";
                  }else{
                    tableStyle+=style+":"+option.tableStyle[style]+";";
                  }
                  if(style=="font-size"){
                    tableStyle+=style+":"+option.tableStyle[style]+"px;";
                  }
                }
            }
        }
        if(tableStyle){//特殊样式处理，文字水平居中
          if(option.tableStyle.align==="center"){
            hTable.setAttribute("class","ydp-table_header alignCenter");
            bTable.setAttribute("class","ydp-table_tableBody alignCenter");
          }else if(option.tableStyle.align==="right"){
            hTable.setAttribute("class","ydp-table_header alignRight");
            bTable.setAttribute("class","ydp-table_tableBody alignRight");
          }
          hTable.setAttribute("style",tableStyle);
          bTable.setAttribute("style",tableStyle);
        }
        document.getElementById(id).innerHTML = "";//渲染之前需要清空元素
        document.getElementById(id).append(containerDiv);
      }
