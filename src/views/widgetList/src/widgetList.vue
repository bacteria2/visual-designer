<template>
  <v-app>
    <widget-base :show.sync="showWidgetBase" :widgetTyped="widgetTyped" :edittingObj="edittingWidget"></widget-base>
    <v-navigation-drawer persistent dark :mini-variant.sync="mini" v-model="drawer" >
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <!--<img src="../../../assets/logo.png" />-->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>组件管理</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-list-group v-for="item in widgetTyped" :value="item.active" :key="item.label">
          <v-list-tile slot="item">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.label }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-item v-for="subItem in item.child" :key="subItem.name">
            <v-list-tile @click.native="getWidgetsByTypeId(subItem.id)">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <!--<v-icon>{{ subItem.action }}</v-icon>-->
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="grey darken-3" light>
      <!--<v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>-->
      <v-toolbar-title></v-toolbar-title>
      <v-btn light class="blue-grey" @click.native="addWidget">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey">删除<v-icon right light>delete</v-icon></v-btn>
    </v-toolbar>
    <main>
      <widget-box :widgets="widgets" @editWidget="editWidget" @desiWidget="desiWidget"></widget-box>
    </main>
  </v-app>
</template>
<script>
  import {compact,set,clone} from '@/utils'
  import WidgetBase from './WidgetBase.vue'
  import WidgetBox  from '@/components/WidgetBox'
  import store from '@/store'
  import {loadWidgetTypes,loadWidgetsByType,addWidget,getWidgetByID} from '@/services/WidgetService'
  import Router from '@/router'
  export default{
    components: {WidgetBase,WidgetBox},
    mounted(){
      //加载远程数据组件分类
      loadWidgetTypes().then((resp) => {
        if (resp.success) {
          console.log(resp.rows)
          this.widgetTypes = resp.rows.map((item)=>{
            return {id:item.fID,type:item.fType,name:item.fName,code:item.fImageCode}
          })
        }
        else console.log(resp.message, resp.data)
      });
      loadWidgetsByType().then((resp) => {
        if (resp.success) {
          this.widgets = resp.rows.map((wg)=>{
             return { id:wg.fID,name:wg.fPluginName,tPath:wg.fThumbnailPath}
          })
        }
        else console.log(resp.message, resp.data)
      });
    },
    watch:{

    },
    computed:{
      widgetTyped(){
        return [{active:true,label:'图形分类',
          icon:'',
          child:this.widgetTypes.filter((item)=>{return item.type == 0})},
          {label:'应用分类',
            icon:'',
            child:this.widgetTypes.filter((item) => {return item.type == 1})}
        ]
    },
    },
    data(){
      return {
        //左导航
        drawer:true,
        mini:false,
        page:'',//分页
        showWidgetBase:false,
        widgetTypes:[],//组件分类
        widgets:[],
        edittingWidget:''
      }
    },
    methods: {
      addWidget(){
        this.showWidgetBase = true,
          this.edittingWidget={}
      },
      editWidget(id){
          let that = this;
          this.loadWidgetById(id,function () {
            that.showWidgetBase = true;
          })
      },
      desiWidget(id){
        let that = this;
        this.loadWidgetById(id,function () {
          let codeID =  that.edittingWidget.impageCategory,
              code   =  that.getWidgetCode(codeID)
          Router.push({ name: 'widgetDesigner', params: { widget: that.edittingWidget,widgetCode:code}})
        })
      },
      loadWidgetById(id,fun){
        getWidgetByID({key:id}).then((resp) => {
          if (resp.success) {
            this.edittingWidget = resp.widget;
            fun();
          }
          else{
            console.log(resp.success)
          }
        });
      },
      getWidgetCode(codeID){ //获取分类代码如：EchartBar
          let code, typeObj = this.widgetTypes.filter((type)=>{return type.id == codeID})[0];
          if(typeObj){
              code = typeObj.code
          }
          return code;
      }
    }
  }
</script>
<style scoped>
 .cardH{
    height: 300px !important;
    margin-bottom: 30px;
    border-radius: 5px;
  }
  .image{
    display: block;
    margin:0 auto;
    width: 100%;
    height: 100%;
    max-width: 100% !important;
    max-height: 240px !important;
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
    height: 260px !important;
  }
  .cardCol{
    height: 40px;
  }
  .content_box{
    overflow: auto;
  }
  #navigation-1 a {
    text-decoration: none;
  }
  .navigation-drawer{
    max-width:220px;
  }
 .navigation-drawer--persistent.navigation-drawer--open:not(.navigation-drawer--is-mobile):not(.navigation-drawer--right) ~ main, .navigation-drawer--persistent.navigation-drawer--open:not(.navigation-drawer--is-mobile):not(.navigation-drawer--right) ~ .footer:not(.footer--fixed):not(.footer--absolute){
   padding-left: 220px;
 }
 .navigation-drawer--persistent.navigation-drawer--open:not(.navigation-drawer--is-mobile):not(.navigation-drawer--right):not(.navigation-drawer--clipped) ~ .toolbar{
   padding-left: 220px;
 }
</style>
