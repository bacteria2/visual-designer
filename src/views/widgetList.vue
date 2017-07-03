<template>
  <v-app id="example-2">
    <v-navigation-drawer persistent dark :mini-variant.sync="mini" v-model="drawer" >
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="./../assets/logo.png" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>ydp-visual</v-list-tile-title>
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
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="cyan" light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>

    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md3 v-for="i in 4" :key="i">
            <v-card class="blue darken-4 cardH" >
              <v-card-text>
                <v-card class="white darken-4 cardH" >
                  <v-card-text>
                    <img class="image" v-bind:src="`http://echarts.baidu.com/gallery/data/thumb/bubble-gradient.png`" alt="lorem">
                  </v-card-text>
                  <v-divider light></v-divider>
                  <v-card-column class="black--text cardCol">
                    <v-card-row>
                      <v-spacer></v-spacer>
                      <v-card-text class="text-xs-left">
                        <div>
                          <span>名称：</span>
                          <span>你你你差</span>
                        </div>
                      </v-card-text>
                      <v-btn icon class="green--text"  v-tooltip:left="{ html: '编辑' }" @click.native="doThis">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn icon class="indigo--text" v-tooltip:left="{ html: '设计' }">
                        <v-icon>launch</v-icon>
                      </v-btn>
                    </v-card-row>
                  </v-card-column>
                </v-card>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout >
      </v-container>
    </main>
  </v-app>
</template>
<script>

  import {compact,set,clone} from '@/utils'
  import store from '@/store'

  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: false,
        right: null,
        page:1
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
