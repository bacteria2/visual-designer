import React from 'react';
import VmColorMapping from './index'

export default function VMDemo(){

    return (<div style={{width:400}}>
        <VmColorMapping data={[10,20,50]} onChange={(v)=>{console.log(v)}} vm={{
            type:'piecewise',
            min:0,
            max:100,
            splitNumber:5,
            inRange:{
                color:['#4575b4', '#abd9e9', '#ffffbf', '#fdae61',  '#a50026'],
                colorHue:[0,200],
                colorSaturation:[0,0.5],
                colorLightness:[0,0.5],
                opacity:[0,0.5],
            }}}/>
    </div>)
}