export default {
  functional: true,
    name: 'WidgetRectangle',
    render(h, {props}){
    return <div style={props.styles}  class="char-container"></div>;
  }
}
