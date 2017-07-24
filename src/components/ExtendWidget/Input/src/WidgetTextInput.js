export default{
  functional: true,
  name: "WidgetTextInput",
  render(h, {props}){
    return (
      <div>
        <prop-textarea name="文本内容:" model={props.options} propName="text"></prop-textarea>
        <prop-font-group name="字体样式:" model={props.styles}></prop-font-group>
        <prop-box-shadow name="边框阴影:" model={props.styles} propName="boxShadow"></prop-box-shadow>
      </div>)
  },
  props: {
    styles: Object,
    options: Object
  }
}

