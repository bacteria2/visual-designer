import React from 'react';
import * as SimpleInput from './SimpleInput';


const input={
  ...SimpleInput
}


export function getPropertyInputByTagName(name){
  return name&&input[name]?input[name]:()=><div>{`type:${name} is not found,`} property is empty</div>;
}