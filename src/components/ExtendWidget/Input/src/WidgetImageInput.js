export default{
  functional: true,
  name: "WidgetImageInput",
  render(h, {props}){
    return (
      <div>
        <prop-background-img name="背景图片:" model={props.styles} id={props.id}></prop-background-img>
        <prop-color name="背景色:" model={props.styles} propName="backgroundColor" ></prop-color>
        <prop-slider name="透明度:" model={props.styles} propName="opacity" ></prop-slider>
      </div>)
  },
  props: {
    styles: Object,
    options: Object,
    id:[String,Number]
  }
}
