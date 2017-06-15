import {getValueFromStore, updateOption,showProperty} from '../InputCommon'
import debounce from "lodash/debounce"

export default{
  name: 'PropertySwitch',
  props: {
    label:String,
    ui: {
      type: Array,
      default(){return[]}
    },
    value: {},
    optionKey:String,
    options:{default(){return []}}
  },
  data(){
    return {
      inputValue: this.value,
      inputOptions: this.options,
      curUi:this.ui[0]
    }
  },
  methods:{
    change(){
      let ui = this.ui,
        max = ui.length-1,
        curIndex = ui.indexOf(this.curUi);
      if(curIndex < max){
        curIndex++
      }else{
        curIndex = 0;
      }
      this.curUi = ui[curIndex];
      console.info(this.curUi);
    }
  },
  render(h){
    return (<div class="property" v-show={showProperty(this.optionKey)}>
      <v-layout row wrap>
        <v-flex xs4 offset-xs1 class="label caption">
          <v-layout row wrap>
            <v-flex xs8>
              {this.label}
            </v-flex>
            <v-flex xs2>
          <v-btn flat light nativeOnClick={this.change} class="changbtn purple darken-1">转换</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs7>
          <number v-show={this.curUi == 'number-px'} value={getValueFromStore(this.optionKey)} unit={'px'}
                  onInput={debounce(value => updateOption(this.optionKey, value), 1000)}></number>
          <number v-show={this.curUi == 'number-%'} value={getValueFromStore(this.optionKey)} unit={'%'}
                  onInput={debounce(value => updateOption(this.optionKey, value), 1000)}></number>
          <check-group  v-show={this.curUi == 'select'} value={getValueFromStore(this.optionKey)} options={this.inputOptions}  onInput={value=>updateOption(this.optionKey,value)} class="swith-select"></check-group>
        </v-flex>
      </v-layout>
    </div>)
  }
}

