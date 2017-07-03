<template>
  <div class="option-adjust full-height">
    <widget-base :show.sync="showWidgetBase" :widgetTypes="widgetTypes"></widget-base>
    <view-header title="组件管理" :showMenus="true">
      <v-btn light class="blue-grey" @click.native="showWidgetBase = true">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey">删除<v-icon right light>save</v-icon></v-btn>
    </view-header>
    <main class="brace-charts__container blue-grey darken-1 content_box">
      <v-container fluid class="brace-charts__container blue-grey darken-1">
        <v-layout row wrap>
          <v-flex xs12 sm4 md2 v-for="i in 5" :key="i">
            <v-card class="pink darken-4 cardH" >
              <v-card-text>
                <v-card class="white darken-4 cardH" >
                  <v-card-text>
                    <img class="image" src="http://echarts.baidu.com/gallery/data/thumb/bubble-gradient.png">
                  </v-card-text>
                  <v-divider light></v-divider>
                  <v-card-column class="black--text cardCol">
                    <v-card-row>
                      <v-spacer></v-spacer>
                      <v-card-text class="text-xs-left">
                        <div>
                          <span>名称：</span>
                          <span>好图</span>
                        </div>
                      </v-card-text>
                      <v-btn icon class="green--text" @click.native="showWidgetBase = true" v-tooltip:left="{ html: '编辑' }">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <router-link to='/brace'>
                      <v-btn icon class="indigo--text" v-tooltip:left="{ html: '设计' }">
                        <v-icon>launch</v-icon>
                      </v-btn>
                      </router-link>
                    </v-card-row>
                  </v-card-column>
                </v-card>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout >

        <v-layout row wrap style="margin:10px 0 15px">
          <v-flex xs12>
            <div class="text-xs-center">
              <!--<v-pagination v-bind:length.number="15" v-model="page"></v-pagination>-->
            </div>
          </v-flex>
        </v-layout >
      </v-container>
    </main>
  </div>
</template>
<script>

  import {compact,set,clone} from '@/utils'
  import WidgetBase from './WidgetBase.vue'
  import store from '@/store'
  import {loadWidgetTypes,loadWidgetsByType} from '@/services/WidgetService'
  export default{
    components: {WidgetBase},
    mounted(){
      //加载远程数据组件分类
      loadWidgetTypes().then((resp) => {
        if (resp.success) {
          this.widgetTypes = resp.rows.map((item)=>{
              return {id:item.fID,type:item.fType,name:item.fName,code:''}
          })
        }
        else console.log(resp.message, resp.data)
      });
      loadWidgetsByType().then((resp) => {
        if (resp.success) {
          this.widgets = resp
        }
        else console.log(resp.message, resp.data)
      });
    },
    computed:{

    },
    data(){
      return {
        page:'',//分页
        showWidgetBase:false,
        widgetTypes:[],//组件分类
        widgets:[]
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
  .cardH{
    height: 200px !important;
    margin-bottom: 30px;
    border-radius: 5px;
  }
  .image{
    display: block;
    margin:0 auto;
    max-width: 100% !important;
    max-height: 100% !important;
  }
  .card__text{
    padding:16px;
  }
  .card__text>div{
    min-width: 60px;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .card>.card__text{
    height: 160px !important;
  }
  .cardCol{
    height: 40px;
  }
  .content_box{
    overflow: auto;
  }
</style>
