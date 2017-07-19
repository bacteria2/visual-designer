export default {
  functional: true,
    name: 'WidgetImage',
    render(h, {props}){
    props.styles.backgroundSize="100% 100%";
    return <div style={props.styles}  class="widget-image"></div>;
  }
}
