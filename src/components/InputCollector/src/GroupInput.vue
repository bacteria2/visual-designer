<template>
  <div class="group">
    <v-layout row wrap justify-center>
      <v-flex xs11>
        <v-tabs grow dark >
          <v-tabs-bar slot="activators" class="blue-grey darken-1">
            <v-tabs-slider></v-tabs-slider>
            <v-tabs-item
              v-for="tag in inputTabs"
              :key="tag.name"
              :href="tag.name"
            >
              {{tag.label}}
          </v-tabs-item>
          </v-tabs-bar>

          <v-tabs-content
            v-for="tag in inputTabs"
            :key="tag.name"
            :id="tag.name"
          >
            <v-card flat>
              <v-card-text>
                <slot :name="tag.name"></slot>
              </v-card-text>
            </v-card>
          </v-tabs-content>
        </v-tabs>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default{
    name:"Group",
    props: {
      tabs:{
          type:Array,
          default(){return[{label:'页1',name:'page1'},{label:'页2',name:'page2'}]}
      }
    },
    data(){
      return {
        inputTabs: this.tabs
      }
    }
  }
</script>
