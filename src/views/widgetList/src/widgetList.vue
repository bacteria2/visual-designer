<template>
  <div class="option-adjust full-height">
    <widget-base :show.sync="showWidgetBase" :widgetTypes="widgetTypes"></widget-base>
    <view-header title="组件管理" :showMenus="true">
      <v-btn light class="blue-grey" @click.native="showWidgetBase = true">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey">删除<v-icon right light>save</v-icon></v-btn>
    </view-header>
    <main class="brace-charts__container blue-grey darken-1">
<v-layout row wrap style="height: 100%">
  <v-flex xs12 class="flex-left">
    <v-card class="pink darken-4">
      <v-card-text>
        <v-card class="pink darken-4" >
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
    </main>
  </div>
</template>
<script>

  import {compact,set,clone} from '@/utils'
  import WidgetBase from './WidgetBase.vue'
  import store from '@/store'
  import {loadWidgetTypes} from '@/services/WidgetService'
  export default{
    components: {WidgetBase},
    mounted(){
      loadWidgetTypes().then((resp) => {
        if (resp.success) {
          this.widgetTypes = resp.rows.map((item)=>{
              return {id:item.fID,type:item.fType,name:item.fName,code:''}
          })
        }
        else console.log(resp.message, resp.data)
      })
    },
    computed:{

    },
    data(){
      return {
        showWidgetBase:false,
        widgetTypes:[]
      }
    },
    methods: {

    }
  }
</script>
<style scoped>

</style>
