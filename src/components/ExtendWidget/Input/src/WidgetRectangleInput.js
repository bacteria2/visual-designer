export default{
  functional: true,
  name: "WidgetRectangleInput",
  render(h, { props }){
    return (
    <div>
      <prop-color name="背景色:" model={props.styles} propName="backgroundColor" ></prop-color>
      <prop-slider name="透明度:" model={props.styles} propName="opacity" ></prop-slider>
    </div>)
  },
  props: {
    styles: Object,
    options: Object
  }
}
