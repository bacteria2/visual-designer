export default class ExtendContainer {
  constructor(id) {
    this.id = id;              //容器ID
    this.state = -1;           //图表的渲染状态，0：开始渲染，1：渲染完成
    this.style = {             //容器的样式
      count:0,
      borderRadius: 0,
      borderColor:'rgba(0,0,0,0)',
      backgroundColor: 'rgba(0,0,0,0.1)',
      opacity:1
    };
    this.title = {
      show: false,
      text: '',
      style: {
        count:0,
        color: '#000',
        fontSize: 14,
        height: 30,
        lineHeight: 30,
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign: 'center',

        zIndex:99
      }
    };
    this.footer = {
      show: false,
      text: '',
      style: {
        count:0,
        color: '#000',
        fontSize: 14,
        height: 30,
        lineHeight: 30,
        backgroundColor: 'rgba(0,0,0,0)',
        boxShadow:null,
        textAlign: 'center',
        zIndex:99
      }
    };
    this.extendWidget = {
      style:{
        count:0,
        backgroundColor:'rgba(0,0,0,0)',
        opacity:1
        /*backgroundImage:null,
        opacity:1,
        color:null,
        fontSize:14,
        fontFamily:null,
        fontWeight:null,
        fontStyle:null,
        textDecoration:null,
        textAlign:null,
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:0,
        paddingRight:0,*/
      },
      options:{count:0, text:""}
    }
  }

  isRender(){
    if(this.state == 0){
      return false;
    }else{
      return true;
    }
  }

  analysisObj(e) {
    if (e.id) this.id = e.id;
    if (e.style) this.style = e.style;
    if (e.title) this.title = e.title;
    if (e.footer) this.footer = e.footer;
    if (e.extendWidget) this.extendWidget = e.extendWidget;
  }
}

//resize of div

