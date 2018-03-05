import React from 'react';
import VmColorMapping from './index'

export default function VMDemo(){

    return (<div style={{width:400}}>
        <VmColorMapping data={[10,20,50]} onChange={(v)=>{console.log(v)}} vm={{
            type:'piecewise',
            min:0,
            max:100,
            splitNumber:5,
            inRange:[{
                color:[],
            }]}}/>
    </div>)
}