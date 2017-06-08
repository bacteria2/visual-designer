<template>
  <div style="height: 100%;color: #fff">
    <v-navigation-drawer persistent clipped v-model="drawer" class="blue-grey darken-4" light enable-resize-watcher>
      <ul class="m-tab" >
        <li class="m-tab--item">标题 </li>
        <li class="m-tab--item">标题</li>
        <li class="m-tab--item">标题</li>
        <li class="m-tab--item">标题</li>
        <li class="m-tab--item">标题</li>
      </ul>
      <div style="position: absolute;left: 80px;top: 10px;bottom: 10px;right: 10px" class="blue-grey ">
        <ul class="m-tab">
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
          <li class="m-tab--item">标题2</li>
        </ul>
        <div style="position: absolute;left: 80px;top: 0;bottom: 0;right: 0" class="blue-grey darken-1">
          <!--
          <v-layout row wrap style="margin-top: 15px">
            <v-flex xs3 offset-xs1 style="line-height: 30px" class="caption">
              图的高度
            </v-flex>
            <v-flex xs7>
              <el-slider  v-model="height" show-input :show-input-controls="false"> </el-slider>
            </v-flex>
          </v-layout>
          -->
          <Property label="图的宽带" :value="width"></Property>
          <v-layout row wrap>
            <v-flex xs3 offset-xs1 style="line-height: 30px">
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
        </div>
      </div>
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
        <v-select label="Select" :items="items" v-model="e3" light item-value="text"></v-select>
      </v-container>
    </main>
  </div>
</template>
<style lang="scss">
  .m-tab {
    position: absolute;
    width: 80px;
    top: 10px;
    bottom: 10px;
    overflow: hidden;
    padding-right: 4px;
    .m-tab--item{
      display: block;
      text-align: center;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      font-size: 12px;
      margin: 5px 2px 5px 0;
      padding-left: 2px;
    }
  }
</style>
<style lang="stylus">

</style>
<script>
  import ColorPicker from "@/components/ColorPicker"
  import Property from "@/components/property.vue"
  export default {
    components: {ColorPicker,Property},
    data () {
      return {
        height: 10,
        width:20,
        drawer: true,
        drawer2: true,
        drawer3: true,
        drawer4: false,
        right: null,
        left: null,
        loader: null,
        loading: null,
        colors: null,
        e3: null,
        items: [
          {text: 'State 1'},
          {text: 'State 2'},
          {text: 'State 3'},
          {text: 'State 4'},
          {text: 'State 5'},
          {text: 'State 6'},
          {text: 'State 7'}
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
    methods: {
      ok(a){
        console.log(a)
      }
    }
  }
</script>
