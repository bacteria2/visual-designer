<template>
  <div class="option-adjust full-height">
    <view-header title="组件管理" :showMenus="true">
      <v-btn light class="blue-grey" @click.native="">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey">删除<v-icon right light>save</v-icon></v-btn>
    </view-header>
    <main class="brace-charts__container blue-grey darken-1">
<v-layout row wrap style="height: 100%">
  <v-flex xs12 class="flex-left">
    <v-card class="pink darken-4">
      <v-card-text>
        <v-card class="pink darken-4">
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
  import store from '@/store'
  export default{
    mounted(){

    },
    computed:{

    },
    data(){
      return {
      }
    },
    methods: {

    }
  }
</script>
<style scoped>

</style>
