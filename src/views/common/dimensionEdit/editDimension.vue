<template>
  <v-layout row >

      <v-card class="itemDataTable">
        <v-card-title class="light-blue darken-4">
          <span class="white--text title dimTile">维度配置</span>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="demensions"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" scope="props" >

            <td class="text-xs-left myTdStyle">
              {{ props.item.label }}
              <v-chip class="green white--text myChip" v-if="props.item.measured">度量</v-chip>
              <v-chip v-if="props.item.required && !props.item.dataItem"  class="pink white--text myChip">必填</v-chip>
            </td>
            <td class="text-xs-left">{{ props.item.key }}</td>
            <td class="text-xs-left">
              <div class="serieToolBar dataItem">
                <v-menu transition="v-slide-x-transition">

                  <v-btn   flat  light slot="activator" @click.native="changeKey(props.item)" :class="{'selectedDataItem':true, 'actived':isSelected(props.item.id)}">
                    <v-icon light v-show="isSelected(props.item.id)" >edit</v-icon>
                    &nbsp;&nbsp;{{props.item.dataItem}}
                  </v-btn>
                </v-menu>
                <v-btn v-if="props.item.dataItem"  icon flat small light class="deleteBtn " @click.native.stop="deleteItem(props.item.id)">
                  <v-icon light class="pink--text">delete</v-icon>
                </v-btn>
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card>

      <v-card v-show="curDemension.id" class="item_list_card" :title="item_title">
        <v-card-title class="light-blue darken-4">
          <span class="white--text title dimTile" >数据项选择--{{item_title}}</span>
        </v-card-title>
          <v-list  class="date_item_list" >
            <v-list-item class="v-list-item" v-for="item in items" v-bind:key="item"  @click="editDataItem(item)">
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-icon v-show="itemBeused(item)" light class="green--text">star</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="white--text" v-text="item"></v-list-tile-title>
                  <v-list-tile-sub-title >name</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </v-list>
      </v-card>
  </v-layout>
</template>

<script>
  import store from "@/store"

  export default {
    name:'editDimension',
    data () {
      return {
        headers: [
          {
            text: '名称',
            left: true,
            sortable: false,
            value: 'key'
          },
          { text: 'key', value: 'label',sortable: false,left: true },
          { text: '数据项', value: 'fat',sortable: false,left: true }
        ],
        dialog: false,
        items:['名称','销量1','销量2','销量3','销量4','销量5','销量6','销量7','销量8','销量9','销量10'],
        curDemension:{},
      }
    },
    mounted:function(){
      store.commit('addDemensionIds');
    },
    computed:{
      demensions(){
        return store.getters.getDemension;
      },
      item_title(){
          return this.curDemension.label;
      }
    },
    methods:{
      editDataItem(value){
        let key = this.curDemension.id;
        store.dispatch('updateDemension',{key,value});
      },
      changeKey(e){
        this.curDemension = e;
      },
      deleteItem(id){
        store.dispatch('deleteDemension',id);
      },
      isSelected(id){
        if(this.curDemension){
          if(this.curDemension.id==id) return true;
        }
        return false;
      },
      itemBeused(itemName){
        let usedDemensions = store.getters.getDemension.filter((item)=>{return item.dataItem == itemName});

        return (usedDemensions&&usedDemensions.length>0);
      }
    }
  }
</script>

<style >
  .dimTile{height: 36px;display: flex; align-items: inherit;}
  .itemDataTable { float:left;width: 700px; background-color: #607d8b !important;}
  .myChip {font-size: 12px;height: 20px;}
  table.table thead th { font-weight: 600}
  table.table thead th:last-of-type { text-align: center !important; width: 230px}
  table.table thead tr {border-bottom: 1px solid rgba(0,0,0,0.1);
    height:46px;font-family: "Microsoft YaHei UI"; color: #263238;}
  .myTdStyle {width:300px;}

  .itemSelect{background-color: #607d8b !important;}
  .dataItem {justify-content:flex-start}
  .dataItemChoice { color:#222; padding: 0 20px; font-size: 13px;font-family: "Microsoft YaHei UI";}
  .selectedDataItem { font-size: 13px; font-family: "Microsoft YaHei UI"; color: #fff}
  .deleteBtn { margin-top: 9px}
  .item_list_card { margin-left: 15px; width: 300px; background-color: #607d8b !important;}
  .date_item_list {padding:0;font-family: "Microsoft YaHei UI";}
  .v-list-item .list__tile--avatar {  height: 48px}
  .menu .menu__activator .actived {  color: greenyellow}
  .list__tile__title { font-size: 13px;font-family: "Microsoft YaHei UI";}
  .list__tile__sub-title{font-size: 13px; color: #d0cfcf; font-style: italic; font-family: "Microsoft YaHei UI";}
</style>
