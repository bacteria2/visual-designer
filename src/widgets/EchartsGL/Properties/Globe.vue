<template>
  <div>
    <property-select label="是否显示地球" option-key="globe.show"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    <subheader text="纹理贴图"/>
    <property-text label="地球纹理" option-key="globe.baseTexture"></property-text>
    <property-text label="地球高度的纹理" option-key="globe.heightTexture"></property-text>
    <property-text label="顶点置换的纹理" option-key="globe.displacementTexture"></property-text>
    <property-text label="环境" option-key="globe.environment"></property-text>

    <subheader text="大小"/>
    <property-number label="地球半径" option-key="globe.globeRadius"/>
    <property-number label="地球外半径" option-key="globe.globeOuterRadius"/>
    <property-switch    label="宽"     :ui="['number-px','number-%']"
                        option-key="globe.width"></property-switch>
    <property-switch    label="高"     :ui="['number-px','number-%']"
                        option-key="globe.height"></property-switch>
    <divider/>

    <subheader text="位置"/>
    <property-switch    label="水平位置"     :ui="['select','number-px','number-%']"
                        option-key="globe.left"
                        :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
    <property-switch    label="垂直位置"     :ui="['select','number-px','number-%']"
                        option-key="globe.top"
                        :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>
    <divider/>

    <property-number label="地球顶点位移" option-key="globe.displacementScale"/>
    <property-select label="顶点位移质量" option-key="globe.displacementQuality"
                     :options="[{text:'低',value:'low'},{text:'中',value:'medium'},{text:'高',value:'high'},{text:'超高',value:'ultra'}]"></property-select>
    <property-select label="着色效果" option-key="globe.shading"
                     :options="[{text:'颜色',value:'color'},{text:'lambert',value:'lambert'},{text:'真实感',value:'realistic'}]"></property-select>

    <subheader text="颜色材质配置"/>
    <property-text   label="材质细节贴图" option-key="globe.colorMaterial.detailTexture"></property-text>
    <property-number label="细节纹理平铺" option-key="globe.colorMaterial.textureTiling"/>
    <property-number label="细节纹理位移" option-key="globe.colorMaterial.textureOffset"/>

    <subheader text="lambert材质配置"/>
    <property-text   label="材质细节贴图" option-key="globe.lambertMaterial.detailTexture"></property-text>
    <property-number label="细节纹理平铺" option-key="globe.lambertMaterial.textureTiling"/>
    <property-number label="细节纹理位移" option-key="globe.lambertMaterial.textureOffset"/>

    <subheader text="真实感材质配置"/>
    <property-text   label="材质细节贴图" option-key="globe.realisticMaterial.detailTexture"></property-text>
    <property-text   label="细节法线贴图" option-key="globe.realisticMaterial.normalTexture"></property-text>
    <property-number label="细节纹理平铺" option-key="globe.realisticMaterial.textureTiling"/>
    <property-number label="细节纹理位移" option-key="globe.realisticMaterial.textureOffset"/>
    <property-number label="材质的粗糙度" option-key="globe.realisticMaterial.roughness"/>
    <property-select label="是否金属质感" option-key="globe.realisticMaterial.metalness" :options="[{text:'是',value:true},{text:'否',value:false}]"/>
    <property-number label="细节纹理平铺" option-key="globe.realisticMaterial.textureTiling"/>

    <subheader text="光照配置"/>
    <property-color  label="主光源颜色"    option-key="globe.light.main.color"></property-color>
    <property-number label="主光源的强度" option-key="globe.light.main.intensity"/>
    <property-select label="是否投射阴影" option-key="globe.light.main.shadow" :options="[{text:'是',value:true},{text:'否',value:false}]"/>
    <property-select label="阴影的质量" option-key="globe.light.main.shadowQuality"
                     :options="[{text:'低',value:'low'},{text:'中',value:'medium'},{text:'高',value:'high'},{text:'超高',value:'ultra'}]"></property-select>
    <property-number label="主光源的上下旋转角度" option-key="globe.light.main.alpha"/>
    <property-number label="主光源的左右旋转角度" option-key="globe.light.main.beta"/>
    <divider/>
    <property-color  label="环境光颜色"    option-key="globe.light.ambient.color"></property-color>
    <property-number label="环境光的强度"  option-key="globe.light.ambient.intensity"/>
    <property-text   lable="环境光纹理"    option-key="globe.light.ambientCubemap.texture"></property-text>
    <property-number label="漫反射强度"    option-key="globe.light.ambientCubemap.diffuseIntensity"/>
    <property-number label="高光反射强度"  option-key="globe.light.ambientCubemap.specularIntensity"/>
    <divider/>

  </div>
</template>
<script>
  export default {
     name:'EchartsGlGlobe',
  }
</script>
