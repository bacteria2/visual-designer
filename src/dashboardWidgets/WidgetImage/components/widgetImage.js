export default {
  functional: true,
    name: 'WidgetImage',
    render(h, {props}){
      props.styles.width = '100%';
      props.styles.height = '100%';
    return (<div style={props.styles} class={props.styles.backgroundImage?'':'extend-widget-image-default-bg'}></div>);
  }
}