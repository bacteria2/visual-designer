<template>
  <div class="full-height data-definition">
    <view-header title="数据源配置"></view-header>
    <main class="main-container blue-grey darken-1">
      <v-container fluid style="padding: 54px;min-height: calc(100vh - 56px)">
        <v-layout row style="background-color: #f0f0f0;border-bottom: 1px solid gainsboro">
          <v-flex xs4>
            <v-btn style="margin-left: 0" @click.native="dialog=true">新增</v-btn>
            <v-btn @click.native="list.pop()">删除</v-btn>
          </v-flex>
        </v-layout>
        <v-layout style="min-height: calc(100vh - 215px);background-color: #f0f0f0">
          <v-flex xs2 style="overflow: auto;">
            <v-list>
              <v-list-item v-for="o in list" style="box-shadow: 2px 6px 12px 0 rgba(0,0,0,.15);border: solid 1px gainsboro;background-color: white;margin-bottom:-1px;" :key="o">
                <v-list-tile avatar>
                  <v-list-tile-action>
                    <v-icon class="pink--text">star</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>数据源{{o}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-flex>
          <v-flex xs10 style="overflow: auto;">
            <v-data-table
              :headers="headers"
              :items="items"
              :sortable="false"
              class="elevation-1" style="background-color: #fff;color: black;margin-top: 10px;margin-bottom: 10px"
            >
              <template slot="headers"  scope="props">
                <mu-checkbox :label="props.item.text"></mu-checkbox>
              </template>
              <template slot="items" scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.calories }}</td>
                <td class="text-xs-left">{{ props.item.fat }}</td>
                <td class="text-xs-left">{{ props.item.carbs }}</td>
                <td class="text-xs-left">{{ props.item.protein }}</td>
                <td class="text-xs-left">{{ props.item.sodium }}</td>
                <!-- <td class="text-xs-right">{{ props.item.calcium }}</td>
                 <td class="text-xs-right">{{ props.item.iron }}</td>-->
              </template>
              <!--   <template slot="pageText" scope="{ pageStart, pageStop }">
                   From {{ pageStart }} to {{ pageStop }}
                 </template>-->
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <mu-dialog :open="dialog" title="数据源新增" dialogClass="data-definition-dialog">
      <v-stepper non-linear v-model="e1" style="height:100%;background: gainsboro">
        <v-stepper-header>
          <v-stepper-step :step="1" :complete="e1 > 1" editable>设置数据源基础属性</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :step="2" :complete="e1 > 2" editable>元数据定义</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :step="3" :complete="e1 > 3" editable>数据添加</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :step="4" :complete="e1 > 4" editable>完成数据源添加</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1" style="height: calc(100% - 72px)">
          <v-container fluid>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>数据源名称</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field  name="input-1"  label="数据源名称" ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>描述</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field dark name="input-7-1" label="数据源描述"  multi-line></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="2" style="position: relative;background: transparent;height: calc(100% - 72px);">
          <data-table></data-table>
        </v-stepper-content>
        <v-stepper-content step="3" style="position: relative;background: transparent;height: calc(100% - 72px);">
          <data-table></data-table>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card class="grey lighten-1 z-depth-1 mb-5" >
            完成数据源添加,请记得保存
          </v-card>
        </v-stepper-content>
      </v-stepper>
     <!--<v-btn slot="actions" @click.native="dialog=false" primary style="color: white">取消</v-btn>-->
      <v-btn slot="actions" primary @click.native="nextStep" light>下一步</v-btn>
      <v-btn slot="actions" primary @click.native="dialog=false" style="color: white">关闭</v-btn>
    </mu-dialog>
  </div>
</template>
<style>

</style>
<script>
  export default{

    data(){
      return {
        e1: 1,
        dialog:false,
        menus: [{title: "数据源设定", icon: "settings_input_component", url: "/dataset_def"}, {
          title: "图表设定",
          icon: "poll",
          url: "/"
        }, {title: "原始图表新增", icon: "poll", url: "/brace"}],
        msg: 'hello vue',
        headers: [
          {
            text: 'Dessert (100g serving)',
            left: true,
            sortable: false,
            value: 'name'
          },
          { left: true,text: 'Calories', value: 'calories', sortable: false },
          {left: true,text: 'Fat (g)', value: 'fat', sortable: false },
          {left: true,text: 'Carbs (g)', value: 'carbs', sortable: false },
          {left: true,text: 'Protein (g)', value: 'protein', sortable: false },
          {left: true,text: 'Sodium (mg)', value: 'sodium', sortable: false},
        ],
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%',
            left: true,
          },{
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
          },  {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%'
          }
        ],
        list:[1,2,3,4,5]
      }
    },
    methods:{
      nextStep(){
        if(this.e1<4)
          this.e1+=1;
        else
          alert("save")
      }
    }
  }
</script>
