import {showProperty,disabledProperty} from "../../InputCollector/InputCommon"

export default{
  functional: true,
  name:"PropertyLayout",
  render(h, {data,props,children,listeners}){
    return  ( <div class="property" v-show={showProperty(data.optionKey,data.componentType)}>
      <v-layout row wrap>
        <v-flex xs5 offset-xs1 class="label caption">
          <property-title label={data.label} onUpdateDisabled={listeners.disabled}></property-title>
        </v-flex>
        <v-flex xs6 class={props.className?props.className:""} >
          {children}
        </v-flex>
      </v-layout>
    </div> );
  }
}
