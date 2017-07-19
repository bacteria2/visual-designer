export default class ExtendContainer {
  constructor(id) {
    this.id = id;              //容器ID
    this.state = -1;           //图表的渲染状态，0：开始渲染，1：渲染完成
    this.style = {             //容器的样式
      borderRadius: 0,
      borderColor: null,
      borderWidth: null,
      borderStyle: null,
      paddingTop: null,
      paddingBottom: null,
      paddingLeft: null,
      paddingRight: null,
      backgroundColor: '#fff',
      opacity:1
    };
    this.title = {
      show: false,
      text: '',
      style: {
        color: '#000',
        fontSize: 14,
        fontFamily: null,
        height: 30,
        lineHeight: 30,
        backgroundColor: null,
        textAlign: 'center',
        paddingLeft: null,
        paddingRight: null,
        zIndex:99
      }
    };
    this.footer = {
      show: false,
      text: '',
      style: {
        color: '#000',
        fontSize: 14,
        fontFamily: null,
        height: 30,
        lineHeight: 30,
        backgroundColor: null,
        textAlign: 'center',
        paddingLeft: null,
        paddingRight: null,
        zIndex:99
      }
    };
    this.extendWidget = {
      style:{
        backgroundColor:null,
        opacity:1
      },
      options:{}
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

