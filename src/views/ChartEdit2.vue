<template>
  <div style="height: 100%;color: #fff">
    <v-navigation-drawer persistent clipped v-model="drawer" light enable-resize-watcher class="blue-grey darken-4">
      <vue-tabs active-tab-color="#5b5d6b" active-text-color="white" type="pills" :start-index="1" direction="vertical">
        <vue-tab title="基础">
          <vue-tabs active-tab-color="#5b5d6b" active-text-color="white" type="pills" :start-index="1"
                    direction="vertical">
            <vue-tab title="通用" style="width: calc(660px - 59px*2)">
              <v-layout row wrap style="margin-top: 15px">
                <v-flex xs3 offset-xs1 style="line-height: 38px">
                  图的高度
                </v-flex>
                <v-flex xs7>
                  <el-slider  v-model="height" show-input :show-input-controls="false"> </el-slider>
                </v-flex>
                <!-- <v-flex xs2>
                   <el-input v-model="height"></el-input>
                 </v-flex>-->
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  系列的图形类型
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px" elevation-5>
                  折线转为平滑曲线
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <v-select  label="Select" :items="items" v-model="e3"  light item-value="text"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <color-picker @ok="ok"></color-picker>

                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </vue-tab>
            <vue-tab title="高级">
              22222
            </vue-tab>
          </vue-tabs>
        </vue-tab>
        <vue-tab title="标题">

        </vue-tab>
        <vue-tab title="视区">

        </vue-tab>
        <vue-tab title="X轴">

        </vue-tab>
        <vue-tab title="Y轴">

        </vue-tab>
        <vue-tab title="图例">

        </vue-tab>
        <vue-tab title="工具">

        </vue-tab>
        <vue-tab title="提示">

        </vue-tab>
        <vue-tab title="视区">
        </vue-tab>
      </vue-tabs>
    </v-navigation-drawer>
    <v-navigation-drawer persistent clipped v-model="drawer" light enable-resize-watcher class="blue-grey darken-4">
      <vue-tabs active-tab-color="#5b5d6b" active-text-color="white" type="pills" :start-index="1" direction="vertical">
        <vue-tab title="基础">
          <vue-tabs active-tab-color="#5b5d6b" active-text-color="white" type="pills" :start-index="1"
                    direction="vertical">
            <vue-tab title="通用" style="width: calc(660px - 59px*2)">
              <v-layout row wrap style="margin-top: 15px">
                <v-flex xs3 offset-xs1 style="line-height: 38px">
                  图的高度
                </v-flex>
                <v-flex xs7>
                  <el-slider  v-model="height" show-input :show-input-controls="false"> </el-slider>
                </v-flex>
                <!-- <v-flex xs2>
                   <el-input v-model="height"></el-input>
                 </v-flex>-->
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  系列的图形类型
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px" elevation-5>
                  折线转为平滑曲线
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <v-select  label="Select" :items="items" v-model="e3"  light item-value="text"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <color-picker @ok="ok"></color-picker>

                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </vue-tab>
            <vue-tab title="高级">
              22222
            </vue-tab>
          </vue-tabs>
        </vue-tab>
        <vue-tab title="标题">

        </vue-tab>
        <vue-tab title="视区">

        </vue-tab>
        <vue-tab title="X轴">

        </vue-tab>
        <vue-tab title="Y轴">

        </vue-tab>
        <vue-tab title="图例">

        </vue-tab>
        <vue-tab title="工具">

        </vue-tab>
        <vue-tab title="提示">

        </vue-tab>
        <vue-tab title="视区">
        </vue-tab>
      </vue-tabs>
    </v-navigation-drawer>
    <v-navigation-drawer persistent clipped v-model="drawer" light enable-resize-watcher class="blue-grey darken-4">
      <vue-tabs active-tab-color="#5b5d6b" active-text-color="white" type="pills" :start-index="1" direction="vertical">
        <vue-tab title="基础">
          <vue-tabs active-tab-color="#5b5d6b" active-text-color="white" type="pills" :start-index="1"
                    direction="vertical">
            <vue-tab title="通用" style="width: calc(660px - 59px*2)">
              <v-layout row wrap style="margin-top: 15px">
                <v-flex xs3 offset-xs1 style="line-height: 38px">
                  图的高度
                </v-flex>
                <v-flex xs7>
                  <el-slider  v-model="height" show-input :show-input-controls="false"> </el-slider>
                </v-flex>
               <!-- <v-flex xs2>
                  <el-input v-model="height"></el-input>
                </v-flex>-->
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  系列的图形类型
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px" elevation-5>
                  折线转为平滑曲线
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <v-select  label="Select" :items="items" v-model="e3"  light item-value="text"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <color-picker @ok="ok"></color-picker>

                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs3 offset-xs1 style="line-height: 58px">
                  Focus
                </v-flex>
                <v-flex xs7>
                  <v-text-field light
                                name="input-1"
                                id="testing"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </vue-tab>
            <vue-tab title="高级">
              22222
            </vue-tab>
          </vue-tabs>
        </vue-tab>
        <vue-tab title="标题">

        </vue-tab>
        <vue-tab title="视区">

        </vue-tab>
        <vue-tab title="X轴">

        </vue-tab>
        <vue-tab title="Y轴">

        </vue-tab>
        <vue-tab title="图例">

        </vue-tab>
        <vue-tab title="工具">

        </vue-tab>
        <vue-tab title="提示">

        </vue-tab>
        <vue-tab title="视区">
        </vue-tab>
      </vue-tabs>
    </v-navigation-drawer>
    <v-toolbar class="blue-grey" light>
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
    <main style="height: calc(100% - 56px)" class="blue-grey darken-1">
      <v-container fluid>
        <v-select  label="Select" :items="items" v-model="e3"  light item-value="text"></v-select>
      </v-container>
    </main>
  </div>
</template>
<style lang="stylus">

</style>
<script>
  import ColorPicker from "@/components/ColorPicker"
  export default {
    components:{ColorPicker},
    data () {
      return {
        height:10,
        drawer: true,
        drawerRight: true,
        right: null,
        left: null,
        loader: null,
        loading: null,
        colors:null,
        e3: null,
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' }
        ],
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
    methods:{
      ok(a){
        console.log(a)
      }
    }
  }
</script>
