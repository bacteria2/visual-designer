<template>
  <div>
    <property-select label="投影方式" option-key="globe.viewControl.projection"
                     :options="[{text:'透视投影',value:'perspective'},{text:'正交投影',value:'orthographic'}]"></property-select>

    <subheader text="旋转控制"/>
    <property-select label="自动旋转" option-key="globe.viewControl.autoRotate"
                     :options="[{text:'开启',value:true},{text:'关闭',value:false}]"></property-select>
    <property-select label="自转方向" option-key="globe.viewControl.autoRotateDirection"
                     :options="[{text:'顺时针方向',value:'cw'},{text:'逆时针方向',value:'ccw'}]"></property-select>
    <property-number label="自转速度" option-key="globe.viewControl.autoRotateSpeed"/>

    <divider/>
    <property-select label="缩放" option-key="globe.viewControl.zoomSensitivity"
                     :options="[{text:'开启',value:1},{text:'关闭',value:0}]"></property-select>

    <property-select label="平移" option-key="globe.viewControl.panSensitivity"
                     :options="[{text:'开启',value:1},{text:'关闭',value:0}]"></property-select>
  </div>
</template>
<script>
  export default {
     name:'EchartsGlGlobeViewControl',
  }
</script>
