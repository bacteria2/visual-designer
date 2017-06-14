<template>
  <div>
    <subheader text="位置"/>
    <divider/>
    <subheader text="直角坐标系绘图区域位置（仅直角坐标系有效）"/>
    <Property label="左上角横坐标（x1）" ui="number-px" option-key="option.grid.x"></Property>
    <Property label="左上角纵坐标（y1）" ui="number-px" option-key="option.grid.y"></Property>
    <Property label="右上角横坐标（x2）" ui="number-px" option-key="option.grid.x2"></Property>
    <Property label="右上角纵坐标（y2）" ui="number-px" option-key="option.grid.y2"></Property>
    <Property label="宽度（启用此项x2失效）" ui="number-px" option-key="option.grid.width"></Property>
    <Property label="高度（启用此项y2失效）" ui="number-px" option-key="option.grid.height"></Property>
    <subheader text="外观"/>
    <divider/>
    <subheader text="直角坐标系绘图区域外观（仅直角坐标系有效）"/>
    <Property label="绘图区域背景颜色"  ui="color" option-key="option.grid.backgroundColor"></Property>
    <Property label="绘图区域边框线宽" ui="number-px" option-key="option.grid.borderWidth"></Property>
    <Property label="绘图区域边框颜色"  ui="color" option-key="option.grid.borderColor"></Property>
    <subheader text="通用颜色"/>
    <divider/>
    <Property label="图整体背景颜色"  ui="color" option-key="option.backgroundColor"></Property>
  </div>
</template>

