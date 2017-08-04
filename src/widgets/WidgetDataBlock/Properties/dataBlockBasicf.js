export default {
  name: 'DataBlockBasic',
  functional: true,
  render(h){
    return (
      <div class="widget-dataBlock">
        <subheader text="数据块公共样式"/>
        <property-switch label="数据块宽度" option-key="style.width" ui={['number-px','number-%']} min={0} max={1000} step={1}/>
        <property-number label="数据块高度" unit="px" option-key="style.height" />
        <property-number label="数据块行高" unit="px" option-key="style.line-height" />
        <property-color label="字体颜色"   option-key="style.color" />
        <property-number label="字体大小"  unit="px" option-key="style.font-size" min={10} step={1} />
        <property-number label="字体间距"  unit="px" option-key="style.letter-spacing" min={0} step={1} />
        <property-text label="字体系列"    option-key="style.font-family" />
        <property-select label="字体样式"  option-key="style.font-style"
                         options={[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]}>
        </property-select>
        <property-select label="字体粗细"  option-key="style.font-weight"
                         options={[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]}>
        </property-select>
        <property-number label="边框粗细" unit="px" option-key="style.border-width" min={0} step={1} max={30}/>
        <property-color label="边框颜色" option-key="style.border-color"/>
        <property-select label="线条类型" option-key="style.border-style"
                         options={[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text:'虚线',value:'dashed'}]}>
        </property-select>
        <property-color label="背景颜色"  option-key="style.background"/>
        <property-switch label="圆角" option-key="style.border-radius" ui={['number-px','number-%']} min={10} step={1} max={30}>
        </property-switch>
        <property-number label="外边距(上)"  unit="px" option-key="style.margin-top" />
        <property-number label="外边距(右)"  unit="px" option-key="style.margin-right" />
        <property-number label="外边距(下)"  unit="px" option-key="style.margin-bottom" />
        <property-number label="外边距(左)"  unit="px" option-key="style.margin-left" />
        <property-number label="内边距(上)"  unit="px" option-key="style.padding-top" />
        <property-number label="内边距(右)"  unit="px" option-key="style.padding-right" />
        <property-number label="内边距(下)"  unit="px" option-key="style.padding-bottom" />
        <property-number label="内边距(左)"  unit="px" option-key="style.padding-left" />
        <divider/>
      </div>)
  }
}

