<template>
  <div>
    <property-select label="是否显示地图" option-key="geo3D.show"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
    <divider/>
    <property-list-select label="地图类型"
                          option-key="geo3D.map"  :listObject="mapConfig"></property-list-select>
    <subheader text="场景设置"/>
    <property-number label="场景宽度" option-key="geo3D.boxWidth"/>
    <property-number label="场景高度" option-key="geo3D.boxHeight"/>
    <property-number label="场景深度" option-key="geo3D.boxDepth"/>
    <property-number label="区域高度" option-key="geo3D.regionHeight"/>
    <divider/>
    <property-text label="环境" option-key="geo3D.environment"></property-text>


    <subheader text="地面设置"/>

    <property-select label="是否显示" option-key="geo3D.groundPlane.show"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    <property-color  label="颜色"    option-key="geo3D.groundPlane.color"></property-color>

    <divider/>

    <property-select label="合并geometry" option-key="geo3D.instancing"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>

    <property-select label="着色效果" option-key="geo3D.shading"
                     :options="[{text:'颜色',value:'color'},{text:'光照',value:'lambert'},{text:'真实感',value:'realistic'}]"></property-select>

    <subheader text="组件大小"/>
    <property-switch    label="组件宽"     :ui="['number-px','number-%']"
                        option-key="geo3D.width"></property-switch>
    <property-switch    label="组件高"     :ui="['number-px','number-%']"
                        option-key="geo3D.height"></property-switch>
    <divider/>

    <subheader text="位置"/>
    <property-switch    label="水平位置"     :ui="['select','number-px','number-%']"
                        option-key="geo3D.left"
                        :options="[{text:'左',value:'left'},{text:'中',value:'center'},{text:'右',value:'right'}]"></property-switch>
    <property-switch    label="垂直位置"     :ui="['select','number-px','number-%']"
                        option-key="geo3D.top"
                        :options="[{text:'上',value:'top'},{text:'中',value:'middle'},{text:'下',value:'bottom'}]"></property-switch>
    <divider/>

    <Group :tabs="[{label:'普通状态',name:'normal'},{label:'高亮状态',name:'emphasis'}]">
      <div  class="content" slot="normal">
        <subheader text="标签"/>
        <property-select label="是否显示" option-key="geo3D.label.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-number label="标签与图形的距离"
                         option-key="geo3D.label.distance" ></property-number>
        <property-text   label="格式化" option-key="geo3D.label.formatter"></property-text>

        <property-color  label="文字颜色"
                         option-key="geo3D.label.textStyle.color"></property-color>
        <property-number label="文字边框宽度"
                         option-key="geo3D.label.textStyle.borderWidth" ></property-number>
        <property-color  label="文字边框颜色"
                         option-key="geo3D.label.textStyle.borderColor"></property-color>
        <property-number label="字体大小"
                         option-key="geo3D.label.textStyle.fontSize" ></property-number>
        <property-number label="字体粗细"
                         option-key="geo3D.label.textStyle.fontWeight" ></property-number>
        <subheader text="视觉属性"/>
        <property-color label="地图区域颜色"
                        option-key="geo3D.itemStyle.areaColor"></property-color>

        <property-number label="透明度"
                         option-key="geo3D.itemStyle.opacity" :min="0" :max="1"></property-number>

        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px"
                         option-key="geo3D.itemStyle.borderWidth" :min="0" :max="30"></property-number>
        <property-color  label="边框颜色"
                         option-key="geo3D.itemStyle.borderColor"></property-color>
      </div>
      <div  class="content" slot="emphasis">
        <subheader text="标签"/>
        <property-select label="是否显示" option-key="geo3D.emphasis.label.show"
                         :options="[{text:'是',value:true},{text:'否',value:false}]"></property-select>
        <property-number label="标签与图形的距离"
                         option-key="geo3D.label.distance" ></property-number>
        <property-text   label="格式化" option-key="geo3D.emphasis.label.formatter"></property-text>

        <property-color  label="文字颜色"
                         option-key="geo3D.emphasis.label.textStyle.color"></property-color>
        <property-number label="文字边框宽度"
                         option-key="geo3D.emphasis.label.textStyle.borderWidth" ></property-number>
        <property-color  label="文字边框颜色"
                         option-key="geo3D.emphasis.label.textStyle.borderColor"></property-color>
        <property-number label="字体大小"
                         option-key="geo3D.emphasis.label.textStyle.fontSize" ></property-number>
        <property-number label="字体粗细"
                         option-key="geo3D.emphasis.label.textStyle.fontWeight" ></property-number>
        <subheader text="视觉属性"/>
        <property-color label="地图区域颜色"
                        option-key="geo3D.emphasis.itemStyle.areaColor"></property-color>

        <property-number label="透明度"
                         option-key="geo3D.emphasis.itemStyle.opacity" :min="0" :max="1"></property-number>

        <subheader text="边框属性"/>
        <property-number label="边框线宽"  unit="px"
                         option-key="geo3D.emphasis.itemStyle.borderWidth" :min="0" :max="30"></property-number>
        <property-color  label="边框颜色"
                         option-key="geo3D.emphasis.itemStyle.borderColor"></property-color>
      </div>
    </Group>

    <subheader text="颜色材质配置"/>
    <property-text   label="材质细节贴图" option-key="geo3D.colorMaterial.detailTexture"></property-text>
    <property-number label="细节纹理平铺" option-key="geo3D.colorMaterial.textureTiling"/>
    <property-number label="细节纹理位移" option-key="geo3D.colorMaterial.textureOffset"/>

    <subheader text="lambert材质配置"/>
    <property-text   label="材质细节贴图" option-key="geo3D.lambertMaterial.detailTexture"></property-text>
    <property-number label="细节纹理平铺" option-key="geo3D.lambertMaterial.textureTiling"/>
    <property-number label="细节纹理位移" option-key="geo3D.lambertMaterial.textureOffset"/>

    <subheader text="真实感材质配置"/>
    <property-text   label="材质细节贴图" option-key="geo3D.realisticMaterial.detailTexture"></property-text>
    <property-text   label="法线贴图"     option-key="geo3D.realisticMaterial.normalTexture"></property-text>
    <property-number label="细节纹理平铺" option-key="geo3D.realisticMaterial.textureTiling"/>
    <property-number label="细节纹理位移" option-key="geo3D.realisticMaterial.textureOffset"/>
    <property-number label="材质的粗糙度" option-key="geo3D.realisticMaterial.roughness"/>
    <property-select label="是否金属质感" option-key="geo3D.realisticMaterial.metalness"
                     :options="[{text:'是',value:true},{text:'否',value:false}]"/>
    <property-number label="粗糙度调整" option-key="geo3D.realisticMaterial.roughnessAdjust"/>
    <property-number label="金属度调整" option-key="geo3D.realisticMaterial.metalnessAdjust"/>

    <subheader text="光照配置"/>
    <property-color  label="主光源颜色"   option-key="geo3D.light.main.color"></property-color>
    <property-number label="主光源的强度" option-key="geo3D.light.main.intensity"/>
    <property-select label="是否投射阴影" option-key="geo3D.light.main.shadow" :options="[{text:'是',value:true},{text:'否',value:false}]"/>
    <property-select label="阴影的质量"   option-key="geo3D.light.main.shadowQuality"
                     :options="[{text:'低',value:'low'},{text:'中',value:'medium'},{text:'高',value:'high'},{text:'超高',value:'ultra'}]"></property-select>
    <property-number label="主光源的上下旋转角度" option-key="geo3D.light.main.alpha"/>
    <property-number label="主光源的左右旋转角度" option-key="geo3D.light.main.beta"/>
    <divider/>

    <property-color  label="环境光颜色"    option-key="geo3D.light.ambient.color"></property-color>
    <property-number label="环境光的强度"  option-key="geo3D.light.ambient.intensity"/>
    <property-text   label="环境光纹理"    option-key="geo3D.light.ambientCubemap.texture"></property-text>
    <property-number label="漫反射强度"    option-key="geo3D.light.ambientCubemap.diffuseIntensity"/>
    <property-number label="高光反射强度"  option-key="geo3D.light.ambientCubemap.specularIntensity"/>
    <divider/>

  </div>
</template>
<script>
  import { getGeoMaps } from '@/services/WidgetService'
  export default {
     name:'EchartsGlGeo3D',
    async mounted(){
      let response = await getGeoMaps()
      if(response.success){
        this.mapConfig = response.data.map(m=>{
          return {label:m.fName,value:m.fId}
        })
      }
    },
    data(){return{
      mapConfig:[]
    }}
  }
</script>
