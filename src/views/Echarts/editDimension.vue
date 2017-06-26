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
    :total-items="demensionSize"

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
        dialogm1: '',
        dialog: false,
        items:['名称','销量'],
        key:''
      }
    },
      mounted:function(){

      }
    ,
    computed:{
      demensions(){
          return this.$store.getters.getDemension;
      },
      demensionSize(){
          return this.$store.getters.getDemension.length;
      }
    },
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
  .dimTile{height: 36px;display: flex; align-items: inherit}
  .itemDataTable { float:left;width: 700px}
  .myChip {    font-size: 12px;height: 20px;}
  table.table thead th {font-size: 14px;}
  table.table thead tr {border-bottom: 1px solid rgba(0,0,0,0.12);
    height:50px;}
  .myTdStyle {width:300px;}

</style>
