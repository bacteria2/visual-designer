export default {
  name: 'TableBasic',
  functional: true,
  render(h){
    return (
      <div class="widget-table">
        <subheader text="表格样式"/>
        <property-number label="表格宽度"  unit="%" option-key="tableStyle.width" />
        <property-number label="表格高度"  unit="px" option-key="tableStyle.height" min={0} step={1} max={1000} />
        <property-color label="文本颜色"   option-key="tableStyle.color" />
        <property-number label="字体大小"  unit="px" option-key="tableStyle.font-size" />
        <property-text label="字体系列"    option-key="tableStyle.font-family" />
        <property-select label="字体样式"  option-key="tableStyle.font-style"
                         options={[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'}]}>
        </property-select>
        <property-select label="字体粗细"  option-key="tableStyle.font-weight"
                         options={[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]}>
        </property-select>
        <property-select label="文本水平对齐方式"   option-key="tableStyle.align"
                         options={[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]}>
        </property-select>
        <property-color label="背景颜色"  option-key="tableStyle.background-color" />
        <property-number label="边框粗细" unit="px" option-key="tableStyle.border-width" min={0} step={1} max={30} />
        <property-color label="边框颜色" option-key="tableStyle.border-color" />
        <property-select label="线条类型" option-key="tableStyle.border-style" options={[
              {text:'实线',value:'solid'},
              {text:'点状线',value:'dotted'},
              {text:'虚线',value:'dashed'}]}>
        </property-select>
        <property-select label="显示表格边框" option-key="tableStyle.border" options={[{text:'是',value:true},{text:'否',value:false}]}>
        </property-select>
        <divider/>

        <subheader text="表头样式"/>
        <property-number label="表头行高度" unit="px" option-key="thStyle.height" min={0} step={1} max={300} />
        <property-color label="文本颜色"   option-key="thStyle.color" />
        <property-number label="字体大小"  unit="px" option-key="thStyle.font-size" />
        <property-text label="字体系列"   option-key="thStyle.font-family" />
        <property-select label="字体样式"  option-key="thStyle.font-style"
                         options={[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]}>
        </property-select>
        <property-select label="字体粗细"  option-key="thStyle.font-weight"
                         options={[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]}>
        </property-select>
        <property-color label="背景颜色"  option-key="thStyle.background-color" />
        <divider/>

        <subheader text="行样式"/>
        <property-select label="显示行边框" option-key="rowStyle.borderRow" options={[{text:'是',value:true},{text:'否',value:false}]}>
        </property-select>
        <property-select label="显示列边框" option-key="rowStyle.borderCol" options={[{text:'是',value:true},{text:'否',value:false}]}>
        </property-select>
        <property-number label="边框粗细" unit="px" option-key="rowStyle.border-width" min={0} step={1} max={30}>
        </property-number>
        <property-color label="边框颜色" option-key="rowStyle.border-color">
        </property-color>
        <property-select label="线条类型" option-key="rowStyle.border-style" options={[
          {text:'实线',value:'solid'},
          {text:'点状线',value:'dotted'},
          {text:'虚线',value:'dashed'}
          ]}>
        </property-select>
        <property-number label="行高度"  unit="px"  option-key="rowStyle.height" min={0} step={1} max={300} />
        <property-color label="文本颜色"   option-key="rowStyle.color" />
        <property-number label="字体大小"  unit="px" option-key="rowStyle.font-size"/>
        <property-text label="字体系列"    option-key="rowStyle.font-family" />
        <property-select label="字体样式"  option-key="rowStyle.font-style"
                         options={[{text:'普通',value:'normal'},{text:'斜体（italic）',value:'italic'},{text:'倾斜文字（oblique）',value:'oblique'}]}>
        </property-select>
        <property-select label="字体粗细"  option-key="rowStyle.font-weight"
                         options={[{text:'普通',value:'normal'},{text:'加粗',value:'bold'},{text:'更粗',value:'bolder'},{text:'更细',value:'lighter'}]}>
        </property-select>
        <property-color label="背景颜色"  option-key="rowStyle.background-color" />
        <property-color label="奇行背景色"  option-key="rowStyle.oddColor" />
        <property-color label="偶行背景色"  option-key="rowStyle.evenColor" />
        <divider/>
      </div>)
  }
}
