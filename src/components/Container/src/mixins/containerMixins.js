import {clone} from '@/utils'
export default {
  methods:{
    computeStyle(OriginalStyle){
      let style = clone(OriginalStyle);
      for(let key of Object.keys(style)) {
        let value = style[key];
        if (!isNaN(value)) { //值为数值
          if (key === 'opacity') continue;  //透明度为数字，不用加px
          style[key] = value + 'px';
        } else if (key === 'backgroundImage') {
          if (value) {
            style[key] = `url(${value})`;
          }
        }
      }
      return style;
    }
  }
}
