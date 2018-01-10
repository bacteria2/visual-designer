import React from 'react';
import {TextAreaInput,TextInput,NumberInput,SliderInput} from '../../components/PropertyInput/SimpleInput';
import {Card,Button,notification} from 'antd';
import Debounce from 'lodash-decorators/debounce';
import set from 'lodash/set';
import get from 'lodash/get';

const optionRaw={
  'legend.text[0].size[1]':{value:100,enable:true},
  'obc.sswe':{value:10,enable:false}
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
    </Card>
    <Button onClick={noticeOption}>测试</Button>
  </React.Fragment>
}