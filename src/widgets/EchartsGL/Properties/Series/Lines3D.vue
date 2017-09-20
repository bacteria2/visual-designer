<template>
  <div>
    <property-select label="坐标系"  :component-type="type" :series-index="index"
                     option-key="coordinateSystem"  :options="[{text:'3维地理坐标系',value:'geo3D'},{text:'地球坐标系',value:'globe'}]"></property-select>

    <property-select label="是否多段线"  :component-type="type" :series-index="index"
                     option-key="polyline" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>


    <subheader text="效果"/>
    <property-select label="显示效果"  :component-type="type" :series-index="index"
                     option-key="effect.show" :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    <property-number label="尾迹特效周期"  :component-type="type" :series-index="index"
                     option-key="effect.period"></property-number>

    <property-number label="特效速度"  :component-type="type" :series-index="index"
                     option-key="effect.constantSpeed"></property-number>

    <property-number label="尾迹宽度"  :component-type="type" :series-index="index"
                     option-key="effect.trailWidth"></property-number>

    <property-number label="尾迹长度"  :component-type="type" :series-index="index"
                     option-key="effect.trailLength"></property-number>

    <property-color label="尾迹颜色" :component-type="type" :series-index="index"
                    option-key="effect.trailColor"></property-color>

    <property-number label="尾迹透明度"  :component-type="type" :series-index="index"
                     option-key="effect.trailOpacity"></property-number>

    <property-select label="模式"  :component-type="type" :series-index="index"
                     option-key="blendMode" :options="[{text:'混合模式',value:'source-over'},{text:'叠加模式',value:'lighter'}]"></property-select>


    <subheader text="线条"/>
        <property-color label="线条颜色" :component-type="type" :series-index="index"
                         option-key="lineStyle.color"></property-color>

        <property-number label="线条宽度" unit="px" :component-type="type" :series-index="index"
                         option-key="lineStyle.width"></property-number>

        <property-number label="线条透明度"  :component-type="type" :series-index="index"
                     option-key="lineStyle.opacity"></property-number>

  </div>
</template>
<script>
  export default {
    name:'Series-lines3D',
    props:{
      index:Number
    },
    data(){return{type:'series-lines3D'}},
  }
</script>
