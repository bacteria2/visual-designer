<template>
  <div>
      <v-container fluid class="widgetBoxSelect">
        <v-layout row wrap>
          <v-flex xs12 sm4 md3 v-for="wg in widgets" :key="wg.id">
            <li @dblclick="selectedWidget(wg.id,wg.code)">
              <a href="#">
                <v-card class="white darken-4 card-in" >
                  <v-card-text>
                    <img class="image" src="http://echarts.baidu.com/gallery/data/thumb/bubble-gradient.png" alt="lorem">
                  </v-card-text>
                  <v-divider light></v-divider>
                  <v-card-column class="black--text cardCol">
                    <v-card-row>
                      <v-spacer></v-spacer>
                      <v-card-text class="text-xs-left">
                        <div>
                          <span>名称:</span>
                          <span>{{wg.name}}</span>
                        </div>
                      </v-card-text>
                    </v-card-row>
                  </v-card-column>
                </v-card>
              </a>
            </li>
          </v-flex>
        </v-layout >
      </v-container>
  </div>
</template>
<script>

  export default{
    props:{
      widgets:{
          type:Array,
          default:function () {return [];}
      }
    },
    data(){
      return {
        selectedWidgets:''
      }
    },
    methods: {
      selectedWidget(id,code){
        this.selectedWidgets = id
        this.$emit('updateSelected',id,code)
      },
    }
  }
</script>

