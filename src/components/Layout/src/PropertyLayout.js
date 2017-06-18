import {showProperty} from "../../InputCollector/InputCommon"

export default{
  functional: true,
  name:"PropertyLayout",
  render(h, {data,props,children}){
    return  ( <div class="property" v-show={showProperty(data.optionKey)}>
      <v-layout row wrap>
        <v-flex xs5 offset-xs1 class="label caption">
          {data.label}
        </v-flex>
        <v-flex xs6 class={props.className?props.className:""} >
          {children}
        </v-flex>
      </v-layout>
    </div> );
  },
}
