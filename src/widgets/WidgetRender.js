/**
 * Created by lenovo on 2017/7/26.
 */
import { getOption } from '@/utils/widgetDataHandler.js'
import {forOwn,set,mergeWith} from '@/utils'


export default class WidgetRender {
  constructor (el) {
    this.widget=null;
    this.el=el;
  }

  load() {
    // console.log('beforeLoad')
  }

  beforeLoad () {
    // console.log('beforeLoad')
  }

  afterLoad () {
    // console.log('afterLoad')
  }

  async init(){
    // console.log('init')
  }

  beforeInit(){
    // console.log('beforeInit')
  }

  afterInit(){
    // console.log('afterInit')
  }


  beforeRender () {
    // console.log('beforeRender')
  }

  afterRender () {
    // console.log('afterRender')
  }

  render () {
    // console.log('render')
  }

  beforeDestroy(){
    // console.log('beforeDestroy')
  }

  destroy(){
    // console.log('destroy')
  }

  afterDestroy(){
    // console.log('afterDestroy')
  }

  async mergeAndRender(option,dOption,urlOption){
    let dataSet = dOption.dataSet,
    dimension = dOption.dimension,
    dataOption;
    if(Array.isArray(dataSet) && dataSet.length > 0){
      dataOption = await getOption(dataSet,dimension,urlOption);
      if(dataOption && dataOption.dynamicOption_0101){//动态序列
        option = mergeWith({},option,dataOption.dynamicOption_0101)
      }else{
        forOwn(dataOption, (v, k) =>{
          set(option,k,v)
        })
      }
    }
    this.render(option)
  }

  resize(){

  }



}
