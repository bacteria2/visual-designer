export default {
  name: 'Series-tableColumn',
  functional:true,
  render(h, {props}){
    return ( <div class="widget-table-column">
      <subheader text="列文本与样式"/>
      <property-text label="列表头内容" component-type="series-tableColumn" series-index={props.index} option-key="text"/>
      <property-number label="列宽度" component-type="series-tableColumn" series-index={props.index} unit="px"
                       option-key="width" min={0} step={1} max={1000}/>
      <property-select label="列文本水平对齐方式" option-key="align" component-type="series-tableColumn"
                       series-index={props.index}
                       options={[{text: '左', value: 'left'}, {text: '中', value: 'center'}, {
                         text: '右',
                         value: 'right'
                       }]}>
      </property-select>
      <property-text label="列其他样式" component-type="series-tableColumn" series-index={props.index} option-key="style"/>
    </div>)
  },
  props: {
    index: Number
  },
}


