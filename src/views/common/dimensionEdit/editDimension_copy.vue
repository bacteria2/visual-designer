<template>
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
            <v-btn v-if="!props.item.dataItem" slot="activator" dark flat @click.native="changeKey(props.item.id)" >
              <v-icon light >edit</v-icon>
            </v-btn>
            <v-btn v-else flat light slot="activator" @click.native="changeKey(props.item.id)" >
              <span class="selectedDataItem">{{props.item.dataItem}}</span>
            </v-btn>

            <v-list  style="padding:0">
              <v-list-item v-for="item in items" :key="item"  @click="editDataItem(item)">
                 <v-list-tile>
                  <v-list-tile-title  class="dataItemChoice" >{{item}}</v-list-tile-title>
              </v-list-tile>
              </v-list-item>
            </v-list>

          </v-menu>
          <v-btn v-if="props.item.dataItem"  icon flat small light class="deleteBtn" @click.native.stop="deleteItem(props.item.id)">
            <v-icon light class="pink--text">delete</v-icon>
          </v-btn>
        </div>

      </td>
    </template>

  </v-data-table>

  </v-card>

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
        items:['名称','销量'],
        key:''
      }
    },
    mounted:function(){
        store.commit('addDemensionIds');
    },
    computed:{
      demensions(){
          return store.getters.getDemension;
      }
    },
    methods:{
        editDataItem(value){
          let key = this.key;
          store.dispatch('updateDemension',{key,value});
        },
        changeKey(key){
          this.key = key;
        },
        deleteItem(id){
          store.dispatch('deleteDemension',id);
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
</style>
