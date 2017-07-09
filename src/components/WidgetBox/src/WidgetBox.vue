<template>
  <div>
      <v-container fluid class="widgetBox">
        <v-layout row wrap>
          <v-flex xs12 sm4 md3 v-for="wg in widgets" :key="wg.id">
            <v-card :class="isSelected(wg.id)?'card-out-selected':'card-out'" >
              <v-card-text>
                <v-card class="white darken-4 card-int" >
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
                      <v-btn icon class="green--text"  v-tooltip:left="{ html: '选择' }" @click.native = "selectedWidget(wg.id)">
                        <v-icon>done</v-icon>
                      </v-btn>
                      <v-btn icon class="green--text"  v-tooltip:left="{ html: '编辑' }" @click.native = "editWidget(wg.id)">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn icon class="indigo--text" v-tooltip:left="{ html: '设计' }" @click.native  ="desiWidget(wg.id)">
                        <v-icon>launch</v-icon>
                      </v-btn>
                    </v-card-row>
                  </v-card-column>
                </v-card>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout >
      </v-container>
  </div>
</template>
<script>
  import {remove} from '@/utils'
  export default{
    props:{
      widgets:{
          type:Array,
          default:function () {return [];}
      },
      edittingID:String,
    },
    computed:{

   },
    watch:{

    },
    data(){
      return {
        selectedWidgets:[]
      }
    },
    methods: {
      editWidget(id){
          this.$emit('editWidget',id)
      },
      desiWidget(id){
        this.$emit('desiWidget',id)
      },
      selectedWidget(id){
        if(this.selectedWidgets.includes(id)){
          let index = this.selectedWidgets.indexOf(id)
          this.selectedWidgets.splice(index,1)
        }else{
          this.selectedWidgets.push(id)
        }
        this.$emit('updateSelected',this.selectedWidgets)
      },
      isSelected(id){
          return this.selectedWidgets.includes(id)
      }
    }
  }
</script>

