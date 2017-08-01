export default {
  functional: true,
    name: 'WidgetText',
    render(h, {props}){
    return (<div style={props.styles}  class="widget-text" ><p>{props.options.text}</p></div>);
  }
}
