import {clone} from '@/utils'
import debounce from 'lodash/debounce'
export default {
  props:{
    id: [String,Number],
    dashBord:Object
  },
  methods:{
    computeStyle(OriginalStyle){
      let style = clone(OriginalStyle);
      for(let key of Object.keys(style)) {
        let value = style[key];
        if (value!=null&&value!=undefined&&!isNaN(value)) { //值为数值
          if (key === 'opacity'||key === 'zIndex'||key==='count') continue;  //透明度为数字，不用加px
          style[key] = value + 'px';
        } else if (key === 'backgroundImage') {
          if (value) {
            style[key] = `url(${value})`;
          }
        }
      }
      return style;
    },
    /**
     * 延迟渲染组件
     */
    debounceRender:debounce((container)=>{container.resize();},1000,{leading: true}),
    /**
     * 渲染组件
     */
    render(){
      this.container.perRender();
    }
  },
  computed: {
    containerStyle() {
      let containerStyle = this.computeStyle(this.container.style);
      delete containerStyle.paddingTop;
      delete containerStyle.paddingBottom;
      delete containerStyle.paddingLeft;
      delete containerStyle.paddingRight;
      // delete containerStyle.backgroundColor;
      delete  containerStyle.backgroundPosition;
      delete  containerStyle.backgroundRepeat;
      delete  containerStyle.backgroundImage;
      delete  containerStyle.backgroundSize;
      delete  containerStyle.opacity;
      return containerStyle;
    },
    backgroundPannelStyle(){
      this.computeStyle(this.container.style);
      let backgroundPannelStyle ={};
      if(this.container.style.backgroundColor) backgroundPannelStyle.backgroundColor = this.container.style.backgroundColor ;
      if(this.container.style.backgroundPosition) backgroundPannelStyle.backgroundPosition = this.container.style.backgroundPosition ;
      if(this.container.style.backgroundRepeat) backgroundPannelStyle.backgroundRepeat = this.container.style.backgroundRepeat ;
      if(this.container.style.backgroundImage) backgroundPannelStyle.backgroundImage = `url(${this.container.style.backgroundImage})` ;
      if(this.container.style.backgroundSize) backgroundPannelStyle.backgroundSize = this.container.style.backgroundSize ;
      if(this.container.style.opacity) backgroundPannelStyle.opacity = this.container.style.opacity ;
      return backgroundPannelStyle;
    },
    titleStyle(){
      let titleStyle = this.computeStyle(this.container.title.style);
      if(this.container.style.borderRadius){ //
        titleStyle.borderRadius =  this.container.style.borderRadius +'px' +" " + this.container.style.borderRadius +'px' +" 0px 0px";
      }
      return titleStyle;
    },
    footerStyle(){
      let footerStyle = this.computeStyle(this.container.footer.style);
      if(this.container.style.borderRadius){ //
        footerStyle.borderRadius ="0px 0px " + this.container.style.borderRadius +'px' +" " + this.container.style.borderRadius +'px';
      }
      return footerStyle;
    },
    charStyle(){
      this.computeStyle(this.container.style);
      let charStyle ={};
      if(this.container.style.paddingTop) charStyle.paddingTop = this.container.style.paddingTop + "px";
      if(this.container.style.paddingBottom) charStyle.paddingBottom = this.container.style.paddingBottom + "px";
      if(this.container.style.paddingLeft) charStyle.paddingLeft = this.container.style.paddingLeft + "px";
      if(this.container.style.paddingRight) charStyle.paddingRight = this.container.style.paddingRight + "px";
      return charStyle;
    }
  }
}
