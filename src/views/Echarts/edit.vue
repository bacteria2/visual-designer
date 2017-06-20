<template>
  <div class="option-adjust">
    <v-navigation-drawer persistent clipped v-model="drawer" class="side-drawer blue-grey darken-4" light
                         enable-resize-watcher>
      <vertical-tab-panel :isIndicator="false" isSelectColor v-model="EditConfig.active">
        <vertical-tab v-for="page in EditConfig.pages" :title="page.title" :name="page.name" :key="page.name">
          <vertical-tab-panel v-model="page.active" content-classes="vertical-tab__content__no-padding blue-grey darken-1">
            <vertical-tab v-for="subPage in page.pages" :title="subPage.title" :name="subPage.name" :key="subPage.name">
              <v-app-bar class="serieToolBar">

                <v-menu  transition="v-slide-x-transition"
                         bottom
                         right>
                  <v-btn small light slot="activator" class="light-blue darken-4">追加序列</v-btn>
                  <v-list class="light-blue darken-4">
                    <v-list-item v-for="serie in series" :key="serie">
                      <v-list-tile>
                        <v-list-tile-title>{{serie}}</v-list-tile-title>
                      </v-list-tile>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn small light class="pink darken-4">删除序列</v-btn>

              </v-app-bar>
              <component :is="subPage.name"></component>
            </vertical-tab>
          </vertical-tab-panel>
        </vertical-tab>
      </vertical-tab-panel>
    </v-navigation-drawer>
    <v-toolbar class="blue-grey" right light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="blue-grey "
        >
          保存
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
        <v-btn
          light
          :loading="loading"
          @click.native="loader = 'loading'"
          :disabled="loading"
          class="blue-grey "
        >
          Save
          <v-icon right light>cloud_upload</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main class="main-container blue-grey darken-1">
      <v-container fluid class="fluid-container">
        <v-card height="100%" class="card blue-grey lighter-1">
          <div>
            <echarts-panel></echarts-panel>
          </div>
        </v-card>
      </v-container>
    </main>
  </div>
</template>
<script>
import {edits} from './common/config'
import store from '@/store'
import {forOwn} from '@/utils'
  export default {
    name:'EchartsEdit',
    store,
    mounted: function (){
        let series = this.$store.getters.getSeries;
        series.forEach((value)=>{
          forOwn(value,(v,k)=>{
            console.log(k,v);
          });
      })
    },
    data () {
      return {
          drawer: true,
          loading: null,
          loader: null,
        series:['bar','line'],
        EditConfig:edits.EchartBar()
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      }
    },
    methods: {
      ok(a){
        console.log(a)
      }
      ,
      click(a){
        console.log(a);
      }

    }
  }
</script>
