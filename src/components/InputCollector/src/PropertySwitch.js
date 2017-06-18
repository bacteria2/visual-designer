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
    min:Number,
    max:Number,
    step:Number,
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
    }
  },
  render(h){
    let Number,Number_pc,select,template;
    Number =  <number  value={getValueFromStore(this.optionKey)} unit={'px'}
                           onInput={debounce(value => updateOption(this.optionKey, value), 1000)} min={this.min} max={this.max} step={this.step}></number>
    Number_pc =  <number  value={getValueFromStore(this.optionKey)} unit={'%'}
                           onInput={debounce(value => updateOption(this.optionKey, value), 1000)} ></number>
    select =    <check-group   value={getValueFromStore(this.optionKey)} options={this.inputOptions}  onInput={value=>updateOption(this.optionKey,value)} class="swith-select"></check-group>
   switch (this.curUi){
     case 'number-px':
       template = Number
       break;
     case 'number-%':
       template = Number_pc
       break;
     case 'select':
       template = select
         break;
   }
    return (<div class="property" v-show={showProperty(this.optionKey)}>
      <v-layout row wrap>
        <v-flex xs5 offset-xs1 class="label caption">
          <v-layout row wrap>
            <v-flex xs9>
              {this.label}
            </v-flex>
            <v-flex xs1>
          <v-btn flat light nativeOnClick={this.change} class="changbtn purple darken-1">转换</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
           {template}
        </v-flex>
      </v-layout>
    </div>)
  }
}

