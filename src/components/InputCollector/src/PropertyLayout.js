import {showProperty} from "../InputCommon"


export default{
  functional: true,
  name:"PropertyLayout",
  render(h, {data,props,children}){
    return  ( <div class="property" v-show={showProperty(data.optionKey)}>
      <v-layout row wrap>
        <v-flex xs3 offset-xs1 class="label caption">
          {data.label}
        </v-flex>
        <v-flex xs8 class="property-color__picker">
          {children}
        </v-flex>
      </v-layout>
    </div> );
  },
}
