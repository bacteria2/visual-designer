import React from 'react';
import {TextAreaInput,TextInput,NumberInput,SliderInput,ColorInput,ColorListInput,RangeColorListInput,SelectInput} from '../../components/PropertyInput/SimpleInput';
import {Card,Button,notification} from 'antd';
import Debounce from 'lodash-decorators/debounce';
import set from 'lodash/set';


const optionRaw={
  'legend.text[0].size[1]':{value:100,enable:true},
  'obc.sswe':{value:10,enable:false},
  'option.color':{value:'rgba(189, 16, 224, 1)',enable:true},
  'option.colors':{value:['#234ccc','rgba(123,220,45,0.9)','#ccffcc'],enable:true},
    'option.range.colors':{value:[[0.1,'#234ccc'],[0.5,'rgba(123,220,45,0.9)'],[1,'#ccffcc']],enable:true},
    'option.select':{value:['USA','CHINA'],enable:true},
    'option.show':{value:true,enable:true}
}


const inputProp={
  @Debounce(1000)
  checkChangeHandler(value,optionKey){
    console.log(value,optionKey);
    if(!optionRaw[optionKey])
      optionRaw[optionKey]={value:null,enable:false}
    optionRaw[optionKey].enable=value;
  },
  size:'small',
  optionRaw,
  @Debounce(1000)
  inputChangeHandler(value,optionKey){
    console.log(value,optionKey)
    if(!optionRaw[optionKey])
      optionRaw[optionKey]={value:null,enable:false}
    optionRaw[optionKey].value=value;
  },
}

function rawToOption () {
  let option={}
  Object.keys(optionRaw).forEach(key=>{
    if(optionRaw[key].enable)
      set(option,key,optionRaw[key].value)
  })
  return option;
}

function noticeOption () {
  notification.info({
    message:'optionInfo',
    description:JSON.stringify(optionRaw),
  })
  console.log(rawToOption())
}



export default  function Test(props){
  return <React.Fragment>
    <Card style={{width:320}} bodyStyle={{padding:0}}>
      <TextInput title='文本输入' optionKey='text.font.fontStyle' {...inputProp}  />
      <TextAreaInput title='文本输入2' optionKey='legend.text[0].size[0]' {...inputProp} />
      <NumberInput title='数字输入' optionKey='legend.text[0].size[1]' {...inputProp} />
      <SliderInput  title='数字输入' optionKey='obc.sswe' {...inputProp} />

      <ColorInput title="颜色输入" optionKey='option.color' {...inputProp}/>
      <ColorListInput title="颜色列表" optionKey='option.colors' {...inputProp}/>
      <RangeColorListInput title="范围颜色列表" optionKey='option.range.colors' {...inputProp}/>
      <SelectInput title="范围" optionKey='option.select' multiple={true} options = {[{text:'中国',value:'CHINA'},{text:'美国',value:'USA'},{text:'英国人民共和国',value:'English'}]} {...inputProp}/>
      <SelectInput title="显示" optionKey='option.show'  options = {[{text:'是',value:true},{text:'否',value:false}]} {...inputProp}/>
    </Card>
    <ToolTest/>
    <Button onClick={noticeOption}>测试</Button>
  </React.Fragment>
}

class ToolTest extends React.Component{
  componentDidMount(){
    let {Toolkit}=window;
    console.log('test mounted')

    let rollingNumber=Toolkit.RollingNumber(document.getElementById('rolling'),{
      length: 7,
      value: '10000.01',
      fixed: 2
    });
    setInterval(function(){
      rollingNumber.update(Math.random()*1000)
    },5000)


    Toolkit.Charts().then(charts=>charts.init(document.getElementById('charts')))
      .then(instance=>instance.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }))
  }

  render(){
    return    <Card>
      <div id='rolling'/>
      <div id='charts' style={{height:400}}/>
    </Card>
  }
}

