<template>
  <div class="option-adjust full-height">
    <view-header title="组件管理" :showMenus="true">
      <v-btn light class="blue-grey" @click.native="">新增<v-icon right light>subject</v-icon></v-btn>
      <v-btn light class="blue-grey">删除<v-icon right light>save</v-icon></v-btn>
    </view-header>
    <main class="brace-charts__container blue-grey darken-1 content_box">
        <v-container fluid class="brace-charts__container blue-grey darken-1">
          <v-layout row wrap>
            <v-flex xs12 sm4 md2 v-for="i in 6" :key="i">
              <v-card class="deep-purple darken-4 cardH" >
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
                        <v-btn icon class="green--text">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon class="indigo--text">
                          <v-icon>launch</v-icon>
                        </v-btn>
                      </v-card-row>
                    </v-card-column>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout >
          <v-layout row wrap>
            <v-flex xs12 sm4 md2 v-for="i in 6" :key="i">
              <v-card class="deep-purple darken-4 cardH" >
                <v-card-text>
                  <v-card class="white darken-4 cardH" >
                    <v-card-text>
                      <img class="image" v-bind:src="`http://echarts.baidu.com/gallery/data/thumb/line-aqi.png`" alt="lorem">
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
                        <v-btn icon class="green--text">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon class="indigo--text">
                          <v-icon>launch</v-icon>
                        </v-btn>
                      </v-card-row>
                    </v-card-column>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout >
          <v-layout row wrap>
            <v-flex xs12 sm4 md2 v-for="i in 6" :key="i">
              <v-card class="deep-purple darken-4 cardH" >
                <v-card-text>
                  <v-card class="white darken-4 cardH" >
                    <v-card-text>
                      <img class="image" v-bind:src="`http://echarts.baidu.com/gallery/data/thumb/custom-ohlc.png`" alt="lorem">
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
                        <v-btn icon class="green--text">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon class="indigo--text">
                          <v-icon>launch</v-icon>
                        </v-btn>
                      </v-card-row>
                    </v-card-column>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout >
          <v-layout row wrap>
            <v-flex xs12 sm4 md2 v-for="i in 6" :key="i">
              <v-card class="deep-purple darken-4 cardH" >
                <v-card-text>
                  <v-card class="white darken-4 cardH" >
                    <v-card-text>
                      <img class="image" v-bind:src="`http://echarts.baidu.com/gallery/data/thumb/bar-brush.png`" alt="lorem">
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
                        <v-btn icon class="green--text">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon class="indigo--text">
                          <v-icon>launch</v-icon>
                        </v-btn>
                      </v-card-row>
                    </v-card-column>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout >
          <v-layout row wrap>
            <v-flex xs12 sm4 md2 v-for="i in 6" :key="i">
              <v-card class="deep-purple darken-4 cardH" >
                <v-card-text>
                  <v-card class="white darken-4 cardH" >
                    <v-card-text>
                      <img class="image" v-bind:src="`http://echarts.baidu.com/gallery/data/thumb/scatter-aqi-color.png`" alt="lorem">
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
                        <v-btn icon class="green--text">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon class="indigo--text">
                          <v-icon>launch</v-icon>
                        </v-btn>
                      </v-card-row>
                    </v-card-column>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout >
          <v-layout row wrap style="margin:10px 0 15px">
            <v-flex xs12>
              <div class="text-xs-center">
                <v-pagination v-bind:length.number="15" v-model="page"></v-pagination>
              </div>
            </v-flex>
          </v-layout >
        </v-container>
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
        page: 1
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
  #app{
    overflow: auto;
  }
  .cardH{
    height: 200px !important;
    margin-bottom: 30px;
  }
  .image{
    display: block;
    margin:0 auto;
    max-width: 100% !important;
    max-height: 100% !important;
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
    height: 160px !important;
  }
  .cardCol{
    height: 40px;
  }
  .content_box{
    overflow: auto;
  }
</style>
