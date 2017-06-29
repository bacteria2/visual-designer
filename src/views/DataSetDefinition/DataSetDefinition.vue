<template>
  <div class="full-height data-definition">
    <view-header title="数据源配置"></view-header>
    <main class="main-container blue-grey darken-1">
      <v-container fluid class="fluid_container">
        <v-layout class="layout">
          <v-flex xs2 class="source_menu">
            <v-card>
              <v-toolbar class="teal white--text" light style="z-index: 111;">
                <v-toolbar-title>数据源</v-toolbar-title>
                <v-menu bottom right :nudge-right="20">
                  <v-icon right light slot="activator">add</v-icon>
                  <v-list class="menu">
                    <v-list-item class="menu-item"  @click="addMockSource">
                       <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>内置数据</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      <v-divider class="menu-divider"></v-divider>
                    </v-list-item>
                    <v-list-item  class="menu-item">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>接口数据</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
              <v-list>
                <v-list-item v-for="(s,index) in dataSources"
                             style="box-shadow: 2px 6px 12px 0 rgba(0,0,0,.15);border: solid 1px gainsboro;background-color: white;margin-bottom:-1px;"
                             :key="index" @click="switchSource(s)">
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-icon class="pink--text">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{s.name}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon dark>chat</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs10 class="source_table" >
            <v-card v-if="sourceDisplay" class="card">
              <v-toolbar class="white--text" light>
                <v-toolbar-title>{{source.name}}
                  <v-btn light @click.native="editSource">数据源编辑
                    <v-icon right light>cloud_upload</v-icon>
                  </v-btn>
                  <v-btn light>维度配置
                    <v-icon right light>cloud_upload</v-icon>
                  </v-btn>
                  <v-btn light @click.native="deleteSource">删除数据源
                    <v-icon right light>cloud_upload</v-icon>
                  </v-btn>
                </v-toolbar-title>
              </v-toolbar>
              <div class="table_wrapper">
                <data-table :rows="source.data" :columns="tableColumns"></data-table>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
   <!-- <component :is="dialogType" :show.sync="mockDialog" :cdata.sync="source"></component>-->
    <mock-data :show.sync="mockDialog" :source-info.sync='source==null?{name:"",description:"",columns:[]}:source'></mock-data>
  </div>
</template>
<style>

</style>
<script>
  import MockData from './MockData.vue'
  import DataTable from '../../components/DataTable/src/Table'

  export default{
    components: {
      DataTable,
      MockData
    },
    computed:{
      tableColumns(){
        let header=[];
        this.source.columns.forEach(el=>{
          let col=new Array(parseInt(el.mergeNumber));
          col[0]=el.name;
          header=header.concat(col)
        })
        return header;
      }
    },
    data(){
      return {
        mockDialog: false,
        interfaceDialog:false,
        //数据源列表
        dataSources: [],
        dialogType:"mock-data",
        //目前编辑状态的数据源
        source:null,
        sourceDisplay:false,
      }
    },
    methods: {
      addMockSource(){
        let row={name:"内置数据源"+(this.dataSources.length+1),description:"",columns:[{name:"列1",type:"string",alias:"",mergeNumber:1}],data:[]}
        this.dataSources.push(row)
        this.source=row;
        this.mockDialog=true
      },
      switchSource(source){
        this.source=source;
        this.sourceDisplay=true;
      },
      editSource(){
        this.mockDialog=true
      },
      deleteSource(){
        this.dataSources=this.dataSources.filter(el=>el!==this.source)
        this.sourceDisplay=false
      },
    }
  }
</script>
