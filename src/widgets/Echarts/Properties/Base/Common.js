export default {
  name: 'EchartsBaseCommon',
  functional: true,
  render(h, {props}){
    return (
      <property-group>
        <subheader text="位置"/>
        <divider/>
        <subheader text="直角坐标系绘图区域位置（仅直角坐标系有效）"/>
        <property-switch label="左上角横坐标（x1）" option-key="grid.x"
                         ui={['number-px', 'number-%']} min={0} max={150} step={2}/>
        <property-switch label="左上角纵坐标（y1）" option-key="grid.y"
                         ui={['number-px', 'number-%']}/>
        <property-switch label="右上角横坐标（x2）" option-key="grid.x2"
                         ui={['number-px', 'number-%']} min={0} max={150} step={2}/>
        <property-switch label="右上角纵坐标（y2）" option-key="grid.y2"
                         ui={['number-px','number-%']}/>
        <property-switch label="宽度（启用此项x2失效）" option-key="grid.width"
                         ui={['number-px', 'number-%']} min={0} max={1200} step={20}/>
        <property-switch label="高度（启用此项y2失效）" option-key="grid.height"
                         ui={['number-px', 'number-%']} min={0} max={1000} step={10}/>
        <subheader text="外观"/>
        <divider/>
        <subheader text="直角坐标系绘图区域外观（仅直角坐标系有效）"/>
        <property-color label="绘图区域背景颜色" option-key="grid.backgroundColor"/>
        <property-number label="绘图区域边框线宽" option-key="grid.borderWidth" disabled={props.disabled}
                         unit="px" min={1} max={30}/>
        <property-color label="绘图区域边框颜色" option-key="grid.borderColor"/>
        <subheader text="通用颜色"/>
        <divider/>
        <property-color label="图整体背景颜色" option-key="backgroundColor"/>
        <property-color-list label="序列颜色列表" option-key="calculableColor"/>
      </property-group>
    )
  }
}
