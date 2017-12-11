<template>
  <div>
    <property-select label="坐标系"  :component-type="type" :series-index="index"
                     option-key="coordinateSystem"  :options="[{text:'三维直角坐标',value:'cartesian3D'},{text:'三维地理坐标',value:'geo3D'},{text:'地球坐标',value:'globe'}]"></property-select>

    <property-number label="柱子的倒角尺寸"  :component-type="type" :series-index="index"
                     option-key="bevelSize" ></property-number>

    <property-number label="柱子的倒角光滑程度"  :component-type="type" :series-index="index"
                     option-key="bevelSmoothness" ></property-number>

    <property-number label="柱子最小高度"  :component-type="type" :series-index="index"
                     option-key="minHeight" ></property-number>

    <property-number label="柱子大小"  :component-type="type" :series-index="index"
                     option-key="barSize" ></property-number>

    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <subheader text="标签"/>
        <property-select label="是否显示" :component-type="type" :series-index="index" option-key="label.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-number label="标签与图形的距离" :component-type="type" :series-index="index"
                         option-key="label.distance" ></property-number>

        <property-text   label="格式化" :component-type="type" :series-index="index"
                         option-key="label.formatter"></property-text>

        <property-color  label="文字颜色" :component-type="type" :series-index="index"
                         option-key="label.textStyle.color"></property-color>

        <property-number label="文字边框宽度" :component-type="type" :series-index="index"
                         option-key="label.textStyle.borderWidth" ></property-number>

        <property-color  label="文字边框颜色" :component-type="type" :series-index="index"
                         option-key="label.textStyle.borderColor"></property-color>

        <property-number label="字体大小" :component-type="type" :series-index="index"
                         option-key="label.textStyle.fontSize" ></property-number>

        <property-number label="字体粗细" :component-type="type" :series-index="index"
                         option-key="label.textStyle.fontWeight" ></property-number>
        <subheader text="视觉属性"/>

        <property-color label="区域颜色" :component-type="type" :series-index="index"
                        option-key="itemStyle.color"></property-color>

        <property-number label="透明度" :component-type="type" :series-index="index"
                         option-key="itemStyle.opacity" :min="0" :max="1"></property-number>

        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index"
                         option-key="itemStyle.borderWidth" :min="0" :max="30"></property-number>
        <property-color  label="边框颜色" :component-type="type" :series-index="index"
                         option-key="itemStyle.borderColor"></property-color>
      </div>
      <div  class="content" slot="emphasis">
        <subheader text="标签"/>
        <property-select label="是否显示" option-key="emphasis.label.show" :component-type="type" :series-index="index"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

        <property-number label="标签与图形的距离" :component-type="type" :series-index="index"
                         option-key="label.distance" ></property-number>

        <property-text   label="格式化" :component-type="type" :series-index="index"
                         option-key="emphasis.label.formatter"></property-text>

        <property-color  label="文字颜色" :component-type="type" :series-index="index"
                         option-key="emphasis.label.textStyle.color"></property-color>

        <property-number label="文字边框宽度" :component-type="type" :series-index="index"
                         option-key="emphasis.label.textStyle.borderWidth" ></property-number>

        <property-color  label="文字边框颜色" :component-type="type" :series-index="index"
                         option-key="emphasis.label.textStyle.borderColor"></property-color>

        <property-number label="字体大小" :component-type="type" :series-index="index"
                         option-key="emphasis.label.textStyle.fontSize" ></property-number>

        <property-number label="字体粗细" :component-type="type" :series-index="index"
                         option-key="emphasis.label.textStyle.fontWeight" ></property-number>

        <subheader text="视觉属性"/>
        <property-color label="地图区域颜色" :component-type="type" :series-index="index"
                        option-key="emphasis.itemStyle.color"></property-color>

        <property-number label="透明度" :component-type="type" :series-index="index"
                         option-key="emphasis.itemStyle.opacity" :min="0" :max="1"></property-number>

        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px" :component-type="type" :series-index="index"
                         option-key="emphasis.itemStyle.borderWidth" :min="0" :max="30"></property-number>

        <property-color  label="边框颜色" :component-type="type" :series-index="index"
                         option-key="emphasis.itemStyle.borderColor"></property-color>
      </div>
    </Group>

    <property-select label="着色效果" option-key="shading" :component-type="type" :series-index="index"
                     :options="[{text:'颜色',value:'color'},{text:'光照',value:'lambert'},{text:'真实感',value:'realistic'}]"></property-select>

    <subheader text="颜色材质配置"/>
    <property-text   label="材质细节贴图" :component-type="type" :series-index="index" option-key="colorMaterial.detailTexture"></property-text>
    <property-number label="细节纹理平铺" :component-type="type" :series-index="index" option-key="colorMaterial.textureTiling"/>
    <property-number label="细节纹理位移" :component-type="type" :series-index="index" option-key="colorMaterial.textureOffset"/>

    <subheader text="lambert材质配置"/>
    <property-text   label="材质细节贴图" :component-type="type" :series-index="index" option-key="lambertMaterial.detailTexture"></property-text>
    <property-number label="细节纹理平铺" :component-type="type" :series-index="index" option-key="lambertMaterial.textureTiling"/>
    <property-number label="细节纹理位移" :component-type="type" :series-index="index" option-key="lambertMaterial.textureOffset"/>

    <subheader text="真实感材质配置"/>
    <property-text   label="材质细节贴图" :component-type="type" :series-index="index" option-key="realisticMaterial.detailTexture"></property-text>
    <property-text   label="法线贴图"     :component-type="type" :series-index="index" option-key="realisticMaterial.normalTexture"></property-text>
    <property-number label="细节纹理平铺" :component-type="type" :series-index="index" option-key="realisticMaterial.textureTiling"/>
    <property-number label="细节纹理位移" :component-type="type" :series-index="index" option-key="realisticMaterial.textureOffset"/>
    <property-number label="材质的粗糙度" :component-type="type" :series-index="index" option-key="realisticMaterial.roughness"/>
    <property-select label="是否金属质感" :component-type="type" :series-index="index" option-key="realisticMaterial.metalness"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"/>
    <property-number label="粗糙度调整" :component-type="type" :series-index="index" option-key="realisticMaterial.roughnessAdjust"/>
    <property-number label="金属度调整" :component-type="type" :series-index="index" option-key="realisticMaterial.metalnessAdjust"/>

    <subheader text="光照配置"/>
    <property-color  label="主光源颜色"  :component-type="type" :series-index="index"  option-key="light.main.color"></property-color>
    <property-number label="主光源的强度" :component-type="type" :series-index="index" option-key="light.main.intensity"/>
    <property-select label="是否投射阴影" :component-type="type" :series-index="index" option-key="light.main.shadow" :options="[{text:'是',value:true},{text:'否',value:false}]"/>
    <property-select label="阴影的质量" :component-type="type" :series-index="index"  option-key="light.main.shadowQuality"
                     :options="[{text:'低',value:'low'},{text:'中',value:'medium'},{text:'高',value:'high'},{text:'超高',value:'ultra'}]"></property-select>
    <property-number label="主光源的上下旋转角度" :component-type="type" :series-index="index" option-key="light.main.alpha"/>
    <property-number label="主光源的左右旋转角度" :component-type="type" :series-index="index" option-key="light.main.beta"/>
    <divider/>

    <property-color  label="环境光颜色" :component-type="type" :series-index="index"   option-key="light.ambient.color"></property-color>
    <property-number label="环境光的强度" :component-type="type" :series-index="index"  option-key="light.ambient.intensity"/>
    <property-text   lable="环境光纹理"  :component-type="type" :series-index="index"  option-key="light.ambientCubemap.texture"></property-text>
    <property-number label="漫反射强度"  :component-type="type" :series-index="index"  option-key="light.ambientCubemap.diffuseIntensity"/>
    <property-number label="高光反射强度" :component-type="type" :series-index="index"  option-key="light.ambientCubemap.specularIntensity"/>
    <divider/>
  </div>
</template>
<script>
  export default {
    name:'Series-bar3D',
    props:{
        index:Number
    },
    data(){return{type:'series-bar3D'}},
  }
</script>
