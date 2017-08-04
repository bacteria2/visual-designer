import {getValueFromStore,updateOption,showProperty,isDisabled,updateDisable,isShowSetting} from '../InputCommon'
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
    seriesIndex:Number,
    componentType:String,
    options:{default(){return []}}
  },
  data(){
    return {
      inputValue: this.value,
      inputOptions: this.options,
      isDisabled:isDisabled(this.optionKey,this.seriesIndex,this.componentType),
      curUi:this.ui[0]
    }
  },
  watch:{
    isShow(val){
       this.isDisabled = val;
    }
  },
  computed:{
    isShow(){return isDisabled(this.optionKey,this.seriesIndex,this.componentType)}
  },
  methods:{
    change(){
      if(this.isDisabled) return;
      let ui = this.ui,
        max = ui.length-1,
        curIndex = ui.indexOf(this.curUi);
      if(curIndex < max){
        curIndex++
      }else{
        curIndex = 0;
      }
      this.curUi = ui[curIndex];
    },
    changeDisabled(){
      this.isDisabled=!this.isDisabled;
      updateDisable(this.optionKey,this.isDisabled,this.seriesIndex,this.componentType);
      //this.$emit('updateDisabled',this.isDisabled)
    }
  },
  render(h){
    if(showProperty(this.optionKey,this.componentType)){
    let Number,Number_pc,select,template,disabled = isDisabled(this.optionKey,this.seriesIndex,this.componentType);
    //this.disabled = isDisabled(this.optionKey,this.seriesIndex,this.componentType);
    Number =  <number disabled={disabled}  value={getValueFromStore(this.optionKey,this.seriesIndex,this.componentType)} unit={'px'}
                           onInput={debounce(value => updateOption(this.optionKey,value,this.seriesIndex,this.componentType), 1000)} min={this.min} max={this.max} step={this.step}></number>
    Number_pc =  <number disabled={disabled}  value={getValueFromStore(this.optionKey,this.seriesIndex,this.componentType)} unit={'%'}
                           onInput={debounce(value => updateOption(this.optionKey,value,this.seriesIndex,this.componentType), 1000)} ></number>
    select =    <check-group disabled={disabled}  value={getValueFromStore(this.optionKey,this.seriesIndex,this.componentType)} options={this.inputOptions}  onInput={value=>updateOption(this.optionKey,value,this.seriesIndex,this.componentType)} class="swith-select"></check-group>
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
   //if(showProperty(this.optionKey,this.componentType)){
     if(isShowSetting()){
       return (<div class="property">
         <el-row>
           <el-col span={24}>
           <div class="label caption">
              <span class={{'property-title__disabled':this.isDisabled}}>
      <i class={['property-used','iconfont',{'icon-unselect':this.isDisabled,'icon-select':!this.isDisabled}]} onClick={this.changeDisabled}></i>
      <span style='margin-left:15px'>{this.label}</span></span>
           </div>
           </el-col>
         </el-row>
       </div>)
     }else{
       return (<div class="property">
         <el-row>
           <el-col span={13}>
             <el-row>
                <el-col span={20}>
                  <div class="label caption">
                    <span class={{'property-title__disabled':this.isDisabled}}>
                    <i class={['property-used','iconfont',{'icon-unselect':this.isDisabled,'icon-select':!this.isDisabled}]} onClick={this.changeDisabled}></i>
                    <span style='margin-left:15px'>{this.label}</span></span>
                  </div>
                </el-col>
                <el-col span={4}>
                  <el-button nativeOnClick={this.change} class={!this.isDisabled?'changbtn':'changbtn-disable'} disabled={this.isDisabled}>转换</el-button>
                </el-col>
             </el-row>
           </el-col>
           <el-col span={10}>
             {template}
           </el-col>
         </el-row>
       </div>)
     }
   }

  }
}

