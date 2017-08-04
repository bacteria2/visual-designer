import Render from '../WidgetRender'

export default class WidgetTableRender extends Render {

  //load方法加载依赖
  load(){
    require('./create.scss')
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
    this.createTable(this.el,option)
  }
  createTable(id,option){
    let tableStyle="",rowStyle="",thStyle="";
    let tOpt=option.tableStyle;//表格样式配置参数
    let thOpt=option.thStyle;//表头样式配置参数
    let rOpt=option.rowStyle;//行样式配置参数
    for(let style in thOpt){//添加表头样式
      if(style=="height"||style=="font-size"){
        thStyle+=style+":"+thOpt[style]+"px;";
      }else if(style==="backgroundColor"){
        thStyle+="background-color:"+thOpt[style]+";";
      }else{
        thStyle+=style+":"+thOpt[style]+";";
      }
    }
    let ths="";//存放表头行的单元格
    let series=option.series;
    let bw="border-width";
    let bc="border-color";
    let bs="border-style";
    for(let i=0;i<series.length;i++){//遍历列数据，添加列
      let style="",width="",align="";
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
      let div=`<div class="cell">${series[i].text}</div>`;
      let th=`<th style="${style}">${div}</th>`;
      ths+=th;
    }
    //创建table表格的主体内容
    let bTrs="";//用于存放表主体的行
    let tdData=option.data;
    let rows=option.data.length;
    for(let r=1;r<=rows;r++){//遍历表格数据，添加行
      //创建tr
      rowStyle="";
      let bg="background-color";
      for(let style in rOpt){//行样式设置
        let val=rOpt[style];
        if(style&&style.indexOf("border")==-1&&style!="oddColor"&&style!="evenColor"&&style!="background-color"){
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
      let tds="";//存放表主体行的单元格
      for(let i=0;i<series.length;i++){
        //创建td
        let tdStyle="",colStyle="",w="",a="";
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
        let div=`<div class="cell">${tdData[r-1][i]}</div>`;
        let td=`<td style="${tdStyle?tdStyle:""}">${div}</td>`;
        tds+=td;
      }
      let bTr=`<tr style="${rowStyle?rowStyle:""}">${tds}</tr>`;
      bTrs+=bTr;
    }
    for (let style in tOpt){//添加表格样式
      let valT=tOpt[style];
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
    let tableClass="";
    if(tOpt.align==="center"){
      tableClass="alignCenter";
    }else if(tOpt.align==="right"){
      tableClass="alignRight";
    }
    let renderHtml=`
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
    document.getElementById(id)?document.getElementById(id).innerHTML = renderHtml:"";
  }

}
