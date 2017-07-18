<template>
  <div>
      <v-container fluid class="dashboardBox">
        <v-layout row wrap>
          <v-flex xs12 sm4 md3 v-for="dbd in dashboards" :key="dbd.id">
            <v-card :class="isSelected(dbd.id)?'card-out-selected':'card-out'" >
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
                          <span>{{dbd.name}}</span>
                        </div>
                      </v-card-text>
                      <v-btn icon class="indigo--text"  v-tooltip:left="{ html: '选择' }" @click.native = "selectedDashboard(dbd.id)">
                        <v-icon>done</v-icon>
                      </v-btn>
                      <v-btn v-if="!isInstance" icon class="indigo--text"  v-tooltip:left="{ html: '编辑' }" @click.native = "editDashboard(dbd.id)">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn icon class="indigo--text" v-tooltip:left="{ html: '设计' }" @click.native  ="desiDashboard(dbd.id)">
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
  export default{
    props:{
      dashboards:{
          type:Array,
          default:function () {return [];}
      },
      edittingID:String,
      isInstance:{
          type:Boolean,
          default:false
      }
    },
    computed:{

   },
    watch:{

    },
    data(){
      return {
        selectedDashboards:[]
      }
    },
    methods: {
      editDashboard(id){
          this.$emit('editDashboard',id)
      },
      desiDashboard(id){
        this.$emit('desiDashboard',id)
      },
      selectedDashboard(id){
        if(this.selectedDashboards.includes(id)){
          let index = this.selectedDashboards.indexOf(id)
          this.selectedDashboards.splice(index,1)
        }else{
          this.selectedDashboards.push(id)
        }
        this.$emit('updateSelected',this.selectedDashboards)
      },
      isSelected(id){
          return this.selectedDashboards.includes(id)
      }
    }
  }
</script>

