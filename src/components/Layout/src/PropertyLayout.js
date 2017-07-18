import {showProperty,isShowSetting} from "../../InputCollector/InputCommon"

export default{
  functional: true,
  name: "PropertyLayout",
  render(h, {data, props, children, listeners}){
    if (showProperty(data.optionKey, data.componentType)){
      if(isShowSetting()){
        return ( <div class="property">
          <v-layout row wrap>
            <v-flex xs10 offset-xs1 class="label caption">
              <property-title seriesIndex={data.seriesIndex} componentType={data.componentType} optionKey={data.optionKey} label={data.label} onUpdateDisabled={listeners.disabled}></property-title>
            </v-flex>
          </v-layout>
        </div> );
      }else{
        return ( <div class="property">
          <v-layout row wrap>
            <v-flex xs5 offset-xs1 class="label caption">
              <property-title seriesIndex={data.seriesIndex} componentType={data.componentType} optionKey={data.optionKey} label={data.label} onUpdateDisabled={listeners.disabled}></property-title>
            </v-flex>
            <v-flex xs6 class={props.className ? props.className : ""}>
              {children}
            </v-flex>
          </v-layout>
        </div> );
      }
    }
  }
}
