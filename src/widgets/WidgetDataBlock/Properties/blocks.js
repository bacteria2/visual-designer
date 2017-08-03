export default {
  name: 'Blocks',
  functional: true,
  render(h){
    return (
      <div class="widget-dataBlock-block">
        <subheader text="数据块样式"/>
        <property-switch label="数据块宽度" option-key="style.width" ui="['number-px','number-%']" min="0" max="1000" step="1"/>
        <property-number label="数据块高度" unit="px" option-key="style.height" />
        <property-number label="数据块行高" unit="px" option-key="style.line-height" />
        <property-color label="数据块字体颜色"   option-key="textBox.titleStyle.color" />
        <property-number label="数据块字体大小"  unit="px" option-key="style.font-size" min="10" />
        <property-number label="数据块字体间距"  unit="px" option-key="style.letter-spacing" min="10" />
        <property-text label="数据块字体系列"    option-key="style.font-family" />
        <property-select label="数据块字体样式"  option-key="style.font-style"
                         options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
        </property-select>
        <property-select label="数据块字体粗细"  option-key="style.font-weight"
                         options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]">
        </property-select>
        <property-number label="数据块边框粗细" unit="px" option-key="style.borderWidth" min="0" max="30" step="1"/>
        <property-color label="数据块边框颜色" option-key="style.borderColor"/>
        <property-select label="数据块线条类型" option-key="style.borderStyle"
                         options="[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text:'虚线',value:'dashed'}]">
        </property-select>
        <property-color label="数据块背景颜色"  option-key="style.background"/>
        <property-switch label="数据块圆角" option-key="style.border-radius" ui="['number-px','number-%']" min="0" max="30" step="1">
        </property-switch>
        <property-number label="数据块外边距(上)"  unit="px" option-key="style.margin-top" />
        <property-number label="数据块外边距(右)"  unit="px" option-key="style.margin-right" />
        <property-number label="数据块外边距(下)"  unit="px" option-key="style.margin-bottom" />
        <property-number label="数据块外边距(左)"  unit="px" option-key="style.margin-left" />
        <property-number label="数据块内边距(上)"  unit="px" option-key="style.padding-top" />
        <property-number label="数据块内边距(右)"  unit="px" option-key="style.padding-right" />
        <property-number label="数据块内边距(下)"  unit="px" option-key="style.padding-bottom" />
        <property-number label="数据块内边距(左)"  unit="px" option-key="style.padding-left" />
        <divider/>
        <subheader text="数据块标签"/>
        <property-text  label="标签内容" option-key="style.text"/>
        <property-switch label="标签宽度" option-key="style.width" ui="['number-px','number-%']" min="0" max="1000" step="1"/>
        <property-number label="标签高度" unit="px" option-key="style.height" />
        <property-number label="标签行高" unit="px" option-key="style.line-height" />
        <property-color label="标签字体颜色"   option-key="textBox.titleStyle.color" />
        <property-number label="标签字体大小"  unit="px" option-key="style.font-size" min="10" />
        <property-number label="标签字体间距"  unit="px" option-key="style.letter-spacing" min="10" />
        <property-text label="标签字体系列"    option-key="style.font-family" />
        <property-select label="标签字体样式"  option-key="style.font-style"
                         options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
        </property-select>
        <property-select label="标签字体粗细"  option-key="style.font-weight"
                         options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]">
        </property-select>
        <property-number label="标签边框粗细" unit="px" option-key="style.borderWidth" min="0" max="30" step="1"/>
        <property-color label="标签边框颜色" option-key="style.borderColor" />
        <property-select label="标签线条类型" option-key="style.borderStyle"
                         options="[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text:'虚线',value:'dashed'}]">
        </property-select>
        <property-color label="标签背景颜色"  option-key="style.background"/>
        <property-switch label="标签圆角" option-key="style.border-radius" ui="['number-px','number-%']" min="0" max="30" step="1">
        </property-switch>
        <property-number label="标签外边距(上)"  unit="px" option-key="style.margin-top" />
        <property-number label="标签外边距(右)"  unit="px" option-key="style.margin-right" />
        <property-number label="标签外边距(下)"  unit="px" option-key="style.margin-bottom" />
        <property-number label="标签外边距(左)"  unit="px" option-key="style.margin-left" />
        <property-number label="标签内边距(上)"  unit="px" option-key="style.padding-top" />
        <property-number label="标签内边距(右)"  unit="px" option-key="style.padding-right" />
        <property-number label="标签内边距(下)"  unit="px" option-key="style.padding-bottom" />
        <property-number label="标签内边距(左)"  unit="px" option-key="style.padding-left" />
        <property-select label="标签是否显示" option-key="style.display"
                         options="[{text:'是',value:'true'},{text:'否',value:'false'}">
        </property-select>
        <divider/>
        <subheader text="数据块数据"/>
        <property-switch label="数据宽度" option-key="style.width" ui="['number-px','number-%']" min="0" max="1000" step="1"/>
        <property-number label="数据高度" unit="px" option-key="style.height" />
        <property-number label="数据行高" unit="px" option-key="style.line-height" />
        <property-color label="数据字体颜色"   option-key="textBox.titleStyle.color" />
        <property-number label="数据字体大小"  unit="px" option-key="style.font-size" min="10" />
        <property-number label="数据字体间距"  unit="px" option-key="style.letter-spacing" min="10" />
        <property-text label="数据字体系列"    option-key="style.font-family" />
        <property-select label="数据字体样式"  option-key="style.font-style"
                         options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
        </property-select>
        <property-select label="数据字体粗细"  option-key="style.font-weight"
                         options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]">
        </property-select>
        <property-number label="数据边框粗细" unit="px" option-key="style.borderWidth" min="0" max="30" step="1"/>
        <property-color label="数据边框颜色" option-key="style.borderColor"/>
        <property-select label="数据线条类型" option-key="style.borderStyle"
                         options="[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text:'虚线',value:'dashed'}]">
        </property-select>
        <property-color label="数据背景颜色"  option-key="style.background"/>
        <property-switch label="数据圆角" option-key="style.border-radius" ui="['number-px','number-%']" min="0" max="30" step="1">
        </property-switch>
        <property-number label="数据外边距(上)"  unit="px" option-key="style.margin-top" />
        <property-number label="数据外边距(右)"  unit="px" option-key="style.margin-right" />
        <property-number label="数据外边距(下)"  unit="px" option-key="style.margin-bottom" />
        <property-number label="数据外边距(左)"  unit="px" option-key="style.margin-left" />
        <property-number label="数据内边距(上)"  unit="px" option-key="style.padding-top" />
        <property-number label="数据内边距(右)"  unit="px" option-key="style.padding-right" />
        <property-number label="数据内边距(下)"  unit="px" option-key="style.padding-bottom" />
        <property-number label="数据内边距(左)"  unit="px" option-key="style.padding-left" />
        <divider/>
        <subheader text="数据块单位"/>
        <property-text  label="单位内容" option-key="style.text"/>
        <property-switch label="单位宽度" option-key="style.width" ui="['number-px','number-%']" min="0" max="1000" step="1"/>
        <property-number label="单位高度" unit="px" option-key="style.height" />
        <property-number label="单位行高" unit="px" option-key="style.line-height" />
        <property-color label="单位字体颜色"   option-key="textBox.titleStyle.color" />
        <property-number label="单位字体大小"  unit="px" option-key="style.font-size" min="10" />
        <property-number label="单位字体间距"  unit="px" option-key="style.letter-spacing" min="10" />
        <property-text label="单位字体系列"    option-key="style.font-family" />
        <property-select label="单位字体样式"  option-key="style.font-style"
                         options="[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]">
        </property-select>
        <property-select label="单位字体粗细"  option-key="style.font-weight"
                         options="[{text:'普通',value:'normal'},{text:'加粗',value:'bold'}]">
        </property-select>
        <property-number label="单位边框粗细" unit="px" option-key="style.borderWidth" min="0" max="30" step="1"/>
        <property-color label="单位边框颜色" option-key="style.borderColor"/>
        <property-select label="单位线条类型" option-key="style.borderStyle"
                         options="[{text:'实线',value:'solid'},{text:'点状线',value:'dotted'},{text：'虚线',value：'dashed'}]">
        </property-select>
        <property-color label="单位背景颜色"  option-key="style.background"/>
        <property-switch label="单位圆角" option-key="style.border-radius" ui="['number-px','number-%']" min="0" max="30" step="1">
        </property-switch>
        <property-number label="单位外边距(上)"  unit="px" option-key="style.margin-top" />
        <property-number label="单位外边距(右)"  unit="px" option-key="style.margin-right" />
        <property-number label="单位外边距(下)"  unit="px" option-key="style.margin-bottom" />
        <property-number label="单位外边距(左)"  unit="px" option-key="style.margin-left" />
        <property-number label="单位内边距(上)"  unit="px" option-key="style.padding-top" />
        <property-number label="单位内边距(右)"  unit="px" option-key="style.padding-right" />
        <property-number label="单位内边距(下)"  unit="px" option-key="style.padding-bottom" />
        <property-number label="单位内边距(左)"  unit="px" option-key="style.padding-left" />
        <property-select label="单位是否显示" option-key="style.display"
                         options="[{text:'是',value:'true'},{text:'否',value:'false'}">
        </property-select>
      </div>)
  }
}

