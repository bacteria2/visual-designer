export default{
  functional: true,
  name: "WidgetTextInput",
  render(h, {props}){
    return (
      <div>
        <prop-textarea name="文本内容:" model={props.styles} propName="text"></prop-textarea>
        <prop-font-group name="字体样式:" model={props.styles}></prop-font-group>
        <prop-padding-group name="内边距:" model={props.styles}></prop-padding-group>
      </div>)
  },
  props: {
    styles: Object,
    options: Object
  }
}
