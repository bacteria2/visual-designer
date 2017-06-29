<template>
  <div style="position: absolute;left: 60px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
    <property-select label="底盘形状" option-key="radar.shape"   :options="[{text:'棱角型',value:'polygon'},{text:'圆环型',value:'circle'}]"></property-select>
    <divider/>
    <subheader text="圆心位置"/>
    <property-switch label="x:"  :ui="['number-px','number-%']"  option-key="radar.center.x"
                     :min="0" :max="1400" :step="1">
    </property-switch>
    <property-switch label="y:"  :ui="['number-px','number-%']"  option-key="radar.center.y"
                     :min="0" :max="1400" :step="1">
    </property-switch>
    <divider/>
    <property-switch label="半径长度"  :ui="['number-px','number-%']"  option-key="radar.radius"
                     :min="0" :max="400" :step="1">
    </property-switch>
    <divider/>
    <property-number label="起始角度" unit="°" option-key="radar.startAngle" :min="-180" :max="180" :step="1"></property-number>
    <divider/>
    <property-number label="环形分割数" unit="px" option-key=radar.splitNumber" :min="1" :max="30" :step="1"></property-number>

    <subheader text="其他"/>
    <property-number label="所有图形的 zlevel 值" unit="px" option-key="radar.zlevel" ></property-number>
    <property-number label="组件的所有图形的z值" unit="px" option-key="radar.z" ></property-number>
    <property-number label="指示器名称和指示器轴的距离" unit="px" option-key="radar.nameGap" ></property-number>
    <property-select label="是否是脱离 0 值比例" option-key="radar.scale"   :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
    <property-select label="坐标轴是否是静态无法交互" option-key="radar.silent"   :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
    <property-select label="坐标轴的标签是否响应和触发鼠标事件" option-key="radar.triggerEvent"   :options="[{text:'是',value:'true'},{text:'否',value:'false'}]"></property-select>
  </div>
</template>

