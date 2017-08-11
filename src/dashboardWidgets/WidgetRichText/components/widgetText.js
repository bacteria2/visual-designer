export default {
  functional: true,
    name: 'WidgetText',
render(h, {props}){
  props.styles.width = '100%';
  props.styles.height = '100%';
  return (<div style={props.styles}  class={props.options.text?'':'extend-widget-text-default-bg'} ><p>{props.options.text}</p></div>);
}
}
