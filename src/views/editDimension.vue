<template>
  <div>
    <div  class="series">

    </div>
  <div class="itemDataTable">
  <v-toolbar  class="deep-orange" light>
    <v-toolbar-title>编辑数据项</v-toolbar-title>
    <v-spacer>
    </v-spacer>
    <!--<v-btn light icon>-->
    <!--<v-icon>add</v-icon>-->
    <!--</v-btn>-->
  </v-toolbar>
<v-data-table
    v-bind:headers="headers"
    :items="demensions"
    hide-actions
    class="elevation-1 "
  >
    <template slot="items" scope="props">
      <td class="text-xs-left myTdStyle">
        {{ props.item.label }}
        <v-chip class="green white--text myChip" v-if="props.item.measured">度量</v-chip>
        <v-chip v-if="props.item.required && !props.item.item" style="background-color: orangered" class=" white--text myChip">必填</v-chip>
      </td>
      <td class="text-xs-left">{{ props.item.key }}</td>
      <td class="text-xs-left">
          <v-dialog v-model="dialog"  hide-overlay >

            <v-btn icon  slot="activator" @click.native="changeKey(props.item.key,props.item.item)" >
              <v-icon light >edit</v-icon>
              <span >
                 {{props.item.item}}
              </span>
            </v-btn>

            <v-card>
              <v-card-title>选择数据项</v-card-title>
              <v-divider></v-divider>
              <v-card-row >
                <v-card-text >
                  <v-radio :label="type"  @click.native="updateItem"  v-model="dialogm1"  v-for="type in items" :key="type" :value="type"></v-radio>
                </v-card-text>
              </v-card-row>
              <v-divider></v-divider>
              <v-card-row actions>
                <v-btn class="blue--text darken-1" flat @click.native="clean">清空</v-btn>
              </v-card-row>
            </v-card>
          </v-dialog>
      </td>
    </template>

  </v-data-table>

  </div>
  </div>
</template>

<script>
  import store from "@/store"

  const demension = [{
      label:'名称',
      key:'name',
      required:false,
      type:'common',
      measured:true
    },
    {
      label:'序列1data',
      key:'data',
      required:true,
      type:'bar',
      index:0,
      measured:true
    },
    {
      label:'序列1data',
      key:'gggg',
      required:true,
      type:'bar',
      index:0,
      measured:true
    }
  ];
  export default {
    data () {
      return {
        headers: [
          {
            text: '别名',
            left: true,
            sortable: false,
            value: 'key'
          },
          { text: 'key', value: 'label',sortable: false,left: true },
          { text: '数据项', value: 'fat',sortable: false,left: true }
        ],
        demensions: demension,
        dialogm1: '',
        dialog: false,
        items:['名称','销量'],
        key:''
      }
    },
      mounted:function(){

      }
    ,
    methods:{
        updateItem:function(){
            let key = this.key;
            let self = this;
            let value = {
                item:self.dialogm1,
                measured:false
            };

            store.dispatch('updateDemension',{key,value});

            self.demensions.forEach(function(value){
                if(value['key']&&value['key']==key){
                  value.item = self.dialogm1;
                }
            });
        },
        changeKey(key,value){

          this.key = key;
          this.dialogm1 = value;
        },
        clean:function(){
          let key = this.key;
          this.dialogm1 ='';
          let self = this;
          store.dispatch('deleteDemension',key);
          self.demensions.forEach(function(value){
            if(value['key']&&value['key']==key){
              value.item = '';
            }
          });
        }
    }
  }
</script>

<style >
  .series{width:300px; float:left;height:auto;}
  .itemDataTable {width:700px; padding: 20px; float:left}
  .myChip {    font-size: 12px;height: 20px;}
  table.table thead th {font-size: 14px; color:orangered}
  table.table thead tr {border-bottom: 1px solid rgba(0,0,0,0.12);
    height:50px;}
  .myTdStyle {width:300px;}

</style>
