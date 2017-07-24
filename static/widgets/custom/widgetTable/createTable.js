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
        for(var style in option.thStyle){
          thStyle+=style+":"+option.thStyle[style]+";";
          if(thStyle){
            hTr.setAttribute("style",thStyle);
          }
        }
        var series=option.series;
        for(var i=0;i<series.length;i++){
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
          if(option.tableStyle.border){
            if(option.tableStyle.borderRight){
              var border="border:"+option.tableStyle.border+";border-top:0;border-left:0;";
              th.setAttribute("style",border+width+align);
            }else{
              var border="border:"+option.tableStyle.border+";border-top:0;border-left:0;border-right:0;";
              th.setAttribute("style",border+width+align);
            }
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
        for(var r=1;r<=rows;r++){
          //创建tr
          var bTr=document.createElement("tr");
          rowStyle="";
          for(var style in option.rowStyle){//行样式设置
            if(option.rowStyle.stripe){
              if(r%2!=0){
                if(style.indexOf("background")==-1){
                    if(style.indexOf("stripe")==-1){
                      rowStyle+=style+":"+option.rowStyle[style]+";";
                    }
                }
              }else{
                if(style.indexOf("stripe")==-1){
                  rowStyle+=style+":"+option.rowStyle[style]+";";
                }
              }
            }else{
              if(style.indexOf("stripe")==-1){
                rowStyle+=style+":"+option.rowStyle[style]+";";
              }
            }
            if(thStyle){
              bTr.setAttribute("style",rowStyle);
            }
          }
          for(var i=0;i<series.length;i++){
            //创建td
            var td=document.createElement("td");
            var style="";
            if(series[i].style){
              style=series[i].style;
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
            if(option.tableStyle.border){
                if(option.tableStyle.borderRight){
                  var border="border:"+option.tableStyle.border+";border-top:0;border-left:0;";
                  td.setAttribute("style",border+width+align+style);
                }else{
                  var border="border:"+option.tableStyle.border+";border-top:0;border-left:0;border-right:0;";
                  td.setAttribute("style",border+width+align+style);
                }
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
        for (var style in option.tableStyle){
            if(style.indexOf("borderRight")==-1){
                if(style.indexOf("textAlign")==-1){
                    tableStyle+=style+":"+option.tableStyle[style]+";";
                }
            }
        }
        if(tableStyle){
          if(option.tableStyle.textAlign==="center"){
            hTable.setAttribute("class","ydp-table_header alignCenter");
            bTable.setAttribute("class","ydp-table_tableBody alignCenter");
          }else if(option.tableStyle.textAlign==="right"){
            hTable.setAttribute("class","ydp-table_header alignRight");
            bTable.setAttribute("class","ydp-table_tableBody alignRight");
          }
          hTable.setAttribute("style",tableStyle);
          bTable.setAttribute("style",tableStyle);
        }
        document.getElementById(id).innerHTML = "";
        document.getElementById(id).appendChild(containerDiv);
      }
