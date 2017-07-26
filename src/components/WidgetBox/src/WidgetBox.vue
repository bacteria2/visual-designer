<template>
  <div class="widget-list">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="widget-box">
          <div class="header"><h2 class="title">普通图表</h2></div>
          <div class="wg-body">
sdf
          </div>
       </div>
      </el-col>
      <el-col :span="4" v-for="wg in widgets" :key="wg.id">
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
            <v-btn icon class="indigo--text"  v-tooltip:left="{ html: '选择' }" @click.native = "selectedWidget(wg.id)">
              <v-icon>done</v-icon>
            </v-btn>
            <v-btn v-if="!isInstance" icon class="indigo--text"  v-tooltip:left="{ html: '编辑' }" @click.native = "editWidget(wg.id)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon class="indigo--text" v-tooltip:left="{ html: '设计' }" @click.native  ="desiWidget(wg.id)">
              <v-icon>launch</v-icon>
            </v-btn>
          </v-card-row>
        </v-card-column>
      </v-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    props:{
      widgets:{
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

